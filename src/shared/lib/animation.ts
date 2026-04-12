import gsap from "gsap";

/** Shared GSAP defaults */
export const ANIMATION_DEFAULTS = {
  duration: 0.6,
  ease: "power2.out",
  stagger: { each: 0.1 },
} as const;

/** Easing presets per impeccable + gsap-core rules */
export const EASE = {
  entrance: "power2.out",
  exit: "power2.in",
  stateChange: "power3.inOut",
  micro: "power2.out",
} as const;

/**
 * State-transition helper (gsap-react-patterns):
 * Always kill existing tweens before starting new ones.
 */
export function killAndAnimate(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars,
): gsap.core.Tween {
  gsap.killTweensOf(targets);
  return gsap.to(targets, vars);
}

/**
 * Create a timeline with kill-first safety.
 * Pass elements to kill before the timeline runs.
 */
export function safeTimeline(
  killTargets: gsap.TweenTarget[],
  timelineVars?: gsap.TimelineVars,
): gsap.core.Timeline {
  killTargets.forEach((t) => gsap.killTweensOf(t));
  return gsap.timeline({
    defaults: { duration: ANIMATION_DEFAULTS.duration, ease: ANIMATION_DEFAULTS.ease },
    ...timelineVars,
  });
}
