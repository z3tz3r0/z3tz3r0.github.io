import type { ReactElement } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const LAYER_SMALL = "small" as const;
const LAYER_MEDIUM = "medium" as const;
const LAYER_LARGE = "large" as const;

type StarLayer = typeof LAYER_LARGE | typeof LAYER_MEDIUM | typeof LAYER_SMALL;

interface LayerConfig {
  density: number;
  driftPx: number;
  opacity: number;
  radius: number;
}

interface Star {
  baseX: number;
  baseY: number;
  driftPhase: number;
  layer: StarLayer;
  radius: number;
}

const LAYER_CONFIGS: Readonly<Record<StarLayer, LayerConfig>> = {
  large: { density: 0.00004, driftPx: 2.0, opacity: 0.8, radius: 1.5 },
  medium: { density: 0.00012, driftPx: 1.2, opacity: 0.5, radius: 1.0 },
  small: { density: 0.00038, driftPx: 0.6, opacity: 0.2, radius: 0.5 },
};

const LAYER_ORDER: readonly StarLayer[] = [LAYER_SMALL, LAYER_MEDIUM, LAYER_LARGE];

const DRIFT_LOOP_SECONDS = 80;
const TURN_FRACTIONS = 2;
const FULL_TURN_RAD = Math.PI * TURN_FRACTIONS;
const FULL_DRIFT_CYCLES = 2;
const DPR_CAP = 2;
const MIN_STARS_PER_LAYER = 1;
const STAR_FILL = "rgb(186 230 253)";
const REPEAT_FOREVER = -1;
const ORIGIN = 0;
const FULL_OPACITY = 1;

const CANVAS_CLASS = "pointer-events-none fixed inset-0 z-0";

const layerCount = (area: number, density: number): number =>
  Math.max(MIN_STARS_PER_LAYER, Math.floor(area * density));

const generateStars = (width: number, height: number): Star[] => {
  const area = width * height;
  const stars: Star[] = [];
  for (const layer of LAYER_ORDER) {
    const config = LAYER_CONFIGS[layer];
    const count = layerCount(area, config.density);
    for (let index = 0; index < count; index += 1) {
      stars.push({
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        driftPhase: Math.random() * FULL_TURN_RAD,
        layer,
        radius: config.radius,
      });
    }
  }
  return stars;
};

interface DrawArgs {
  ctx: CanvasRenderingContext2D;
  driftProgress: number;
  height: number;
  stars: readonly Star[];
  width: number;
}

const paintStar = (
  ctx: CanvasRenderingContext2D,
  star: Star,
  driftAngle: number,
): void => {
  const config = LAYER_CONFIGS[star.layer];
  const offsetX = Math.sin(driftAngle + star.driftPhase) * config.driftPx;
  const offsetY = Math.cos(driftAngle + star.driftPhase) * config.driftPx;
  ctx.globalAlpha = config.opacity;
  ctx.fillStyle = STAR_FILL;
  ctx.beginPath();
  ctx.arc(star.baseX + offsetX, star.baseY + offsetY, star.radius, ORIGIN, FULL_TURN_RAD);
  ctx.fill();
};

const drawStars = (args: DrawArgs): void => {
  const { ctx, driftProgress, height, stars, width } = args;
  ctx.clearRect(ORIGIN, ORIGIN, width, height);
  const driftAngle = driftProgress * FULL_TURN_RAD * FULL_DRIFT_CYCLES;
  for (const star of stars) {
    paintStar(ctx, star, driftAngle);
  }
  ctx.globalAlpha = FULL_OPACITY;
};

interface CanvasDimensions {
  height: number;
  width: number;
}

const sizeCanvasToWindow = (canvas: HTMLCanvasElement): CanvasDimensions => {
  const dpr = Math.min(window.devicePixelRatio, DPR_CAP);
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${String(width)}px`;
  canvas.style.height = `${String(height)}px`;
  const ctx = canvas.getContext("2d");
  if (ctx) { ctx.setTransform(dpr, ORIGIN, ORIGIN, dpr, ORIGIN, ORIGIN); }
  return { height, width };
};

interface FieldState {
  dimensions: CanvasDimensions;
  driftProgress: number;
  stars: Star[];
}

const createFieldState = (canvas: HTMLCanvasElement): FieldState => {
  const dimensions = sizeCanvasToWindow(canvas);
  return {
    dimensions,
    driftProgress: 0,
    stars: generateStars(dimensions.width, dimensions.height),
  };
};

const buildRender = (
  ctx: CanvasRenderingContext2D,
  state: FieldState,
): (() => void) => () => {
  drawStars({
    ctx,
    driftProgress: state.driftProgress,
    height: state.dimensions.height,
    stars: state.stars,
    width: state.dimensions.width,
  });
};

const startDriftLoop = (
  state: FieldState,
  render: () => void,
): (() => void) => {
  const driftTarget = { progress: 0 };
  const tween = gsap.to(driftTarget, {
    duration: DRIFT_LOOP_SECONDS,
    ease: "none",
    onUpdate: () => {
      state.driftProgress = driftTarget.progress;
      render();
    },
    progress: 1,
    repeat: REPEAT_FOREVER,
  });
  return (): void => { tween.kill(); };
};

const buildResizeHandler = (
  canvas: HTMLCanvasElement,
  state: FieldState,
  render: () => void,
): (() => void) => (): void => {
  state.dimensions = sizeCanvasToWindow(canvas);
  state.stars = generateStars(state.dimensions.width, state.dimensions.height);
  render();
};

const registerMediaResponses = (
  state: FieldState,
  render: () => void,
): gsap.MatchMedia => {
  const mediaMatch = gsap.matchMedia();
  mediaMatch.add("(prefers-reduced-motion: no-preference)", () => {
    render();
    return startDriftLoop(state, render);
  });
  mediaMatch.add("(prefers-reduced-motion: reduce)", render);
  return mediaMatch;
};

const StarfieldCanvas = (): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) { return; }
    const ctx = canvas.getContext("2d");
    if (!ctx) { return; }

    const state = createFieldState(canvas);
    const render = buildRender(ctx, state);
    const handleResize = buildResizeHandler(canvas, state, render);
    window.addEventListener("resize", handleResize);
    const mediaMatch = registerMediaResponses(state, render);

    return (): void => {
      window.removeEventListener("resize", handleResize);
      mediaMatch.revert();
    };
  });

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={CANVAS_CLASS}
    />
  );
};

export { StarfieldCanvas };
