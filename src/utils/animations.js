export const EASE_SMOOTH = [0.22, 1, 0.36, 1];
export const anim = (d = 0.8) => ({ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: d, ease: EASE_SMOOTH } } });
export const stagger = (s = 0.15, d = 0.1) => ({ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: s, delayChildren: d } } });
export const fadeInUp = anim();
export const elegantFadeIn = anim(1.2);
export const staggerContainer = stagger();
export const elegantStagger = stagger(0.3, 0.2);
export const scaleIn = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE_SMOOTH } } };
