import { gsap } from "gsap";

const ANIMATION_DURATION = 0.6;
const ANIMATION_STAGGER_EACH = 0.1;

const ANIMATION_DEFAULTS = {
  duration: ANIMATION_DURATION,
  ease: "power2.out",
  stagger: { each: ANIMATION_STAGGER_EACH },
} as const;

const EASE = {
  entrance: "power2.out",
  exit: "power2.in",
  micro: "power2.out",
  stateChange: "power3.inOut",
} as const;

/**
 * State-transition helper (gsap-react-patterns):
 * Always kill existing tweens before starting new ones.
 */
const killAndAnimate = (
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars,
): gsap.core.Tween => {
  gsap.killTweensOf(targets);
  return gsap.to(targets, vars);
};

/**
 * Create a timeline with kill-first safety.
 * Pass elements to kill before the timeline runs.
 */
const safeTimeline = (
  killTargets: gsap.TweenTarget[],
  timelineVars?: gsap.TimelineVars,
): gsap.core.Timeline => {
  killTargets.forEach((target) => { gsap.killTweensOf(target); });
  return gsap.timeline({
    defaults: { duration: ANIMATION_DEFAULTS.duration, ease: ANIMATION_DEFAULTS.ease },
    ...timelineVars,
  });
};

export { ANIMATION_DEFAULTS, EASE, killAndAnimate, safeTimeline };
