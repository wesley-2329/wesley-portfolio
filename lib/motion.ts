/** Shared easing curves & variants so motion feels like one system. */
export const ease = {
  expo: [0.16, 1, 0.3, 1] as const,
  quart: [0.76, 0, 0.24, 1] as const,
  soft: [0.22, 1, 0.36, 1] as const,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: ease.expo } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});
