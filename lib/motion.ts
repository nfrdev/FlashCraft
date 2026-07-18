export const motionTransitions = {
  spring: {
    type: 'spring' as const,
    stiffness: 420,
    damping: 28,
    mass: 0.9,
  },
  smooth: {
    duration: 0.24,
    ease: [0.4, 0, 0.2, 1] as const,
  },
  snap: {
    duration: 0.14,
    ease: [0.16, 1, 0.3, 1] as const,
  },
  slow: {
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1] as const,
  },
} as const;

export const motionPresets = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: motionTransitions.smooth,
  },
  slideUp: {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: motionTransitions.spring,
  },
  slideDown: {
    initial: { opacity: 0, y: -14 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: motionTransitions.spring,
  },
  slideLeft: {
    initial: { opacity: 0, x: -18 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -18 },
    transition: motionTransitions.smooth,
  },
  slideRight: {
    initial: { opacity: 0, x: 18 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 18 },
    transition: motionTransitions.smooth,
  },
  scale: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.96 },
    transition: motionTransitions.spring,
  },
  zoom: {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.92 },
    transition: motionTransitions.smooth,
  },
  appear: {
    initial: { opacity: 0, y: 8, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: motionTransitions.slow,
  },
  loading: {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.2,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'easeInOut' as const,
      },
    },
  },
  skeleton: {
    initial: { opacity: 0.55 },
    animate: {
      opacity: [0.55, 0.85, 0.55],
      transition: {
        duration: 1.4,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'easeInOut' as const,
      },
    },
  },
  pageTransition: {
    initial: { opacity: 0, y: 12, scale: 0.995 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -12, scale: 0.995 },
    transition: motionTransitions.slow,
  },
} as const;

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
} as const;

export const staggerItem = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: motionTransitions.spring,
  },
} as const;

export const hoverScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.985 },
  transition: motionTransitions.snap,
} as const;

export const hoverLift = {
  whileHover: { y: -2 },
  whileTap: { y: 0 },
  transition: motionTransitions.snap,
} as const;

export const pressScale = {
  whileTap: { scale: 0.975 },
  transition: motionTransitions.snap,
} as const;

export const ripple = {
  initial: { scale: 0.7, opacity: 0.2 },
  animate: { scale: 2.2, opacity: 0 },
  transition: motionTransitions.slow,
} as const;
