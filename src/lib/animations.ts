import { Variants, Transition } from "framer-motion";

// ═══════ SPRING CONFIGS ═══════

export const springConfig = {
    gentle: { type: "spring" as const, stiffness: 120, damping: 20 },
    snappy: { type: "spring" as const, stiffness: 300, damping: 30 },
    bouncy: { type: "spring" as const, stiffness: 400, damping: 15 },
    slow: { type: "spring" as const, stiffness: 100, damping: 25 },
};

// ═══════ EASE CURVES ═══════

export const easings = {
    easeOutExpo: [0.22, 1, 0.36, 1] as [number, number, number, number],
    easeOutCubic: [0.33, 1, 0.68, 1] as [number, number, number, number],
    easeInOutCubic: [0.65, 0, 0.35, 1] as [number, number, number, number],
};

// ═══════ FADE IN UP ═══════

export const fadeInUp: Variants = {
    initial: { opacity: 0, y: 60 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: easings.easeOutExpo },
    },
};

export const fadeInDown: Variants = {
    initial: { opacity: 0, y: -30 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: easings.easeOutExpo },
    },
};

export const fadeIn: Variants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { duration: 0.5, ease: easings.easeOutCubic },
    },
};

export const fadeInLeft: Variants = {
    initial: { opacity: 0, x: -40 },
    animate: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: easings.easeOutExpo },
    },
};

export const fadeInRight: Variants = {
    initial: { opacity: 0, x: 40 },
    animate: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: easings.easeOutExpo },
    },
};

// ═══════ SCALE ═══════

export const scaleIn: Variants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, ease: easings.easeOutExpo },
    },
};

// ═══════ STAGGER CONTAINER ═══════

export const staggerContainer: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

export const staggerContainerSlow: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

// ═══════ WORD REVEAL ═══════

export const wordRevealContainer: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.3,
        },
    },
};

export const wordReveal: Variants = {
    initial: { y: "100%", opacity: 0 },
    animate: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: easings.easeOutExpo },
    },
};

// ═══════ CARD HOVER ═══════

export const cardHover = {
    rest: {
        y: 0,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        transition: { duration: 0.2, ease: "easeOut" },
    },
    hover: {
        y: -4,
        boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
        transition: { duration: 0.2, ease: "easeOut" },
    },
};

// ═══════ MODAL ═══════

export const modalOverlay: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
};

export const modalContent: Variants = {
    initial: { opacity: 0, scale: 0.95, y: 10 },
    animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: springConfig.snappy,
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 10,
        transition: { duration: 0.15 },
    },
};

// ═══════ NAVBAR ═══════

export const navbarVariants: Variants = {
    top: {
        backdropFilter: "blur(0px)",
        backgroundColor: "rgba(255,255,255,0)",
    },
    scrolled: {
        backdropFilter: "blur(20px)",
        backgroundColor: "var(--glass-bg)",
    },
};

// ═══════ SLIDE IN ═══════

export const slideInRight: Variants = {
    initial: { x: "100%" },
    animate: { x: 0, transition: springConfig.snappy },
    exit: { x: "100%", transition: { duration: 0.2 } },
};

export const slideInBottom: Variants = {
    initial: { y: "100%" },
    animate: { y: 0, transition: springConfig.snappy },
    exit: { y: "100%", transition: { duration: 0.2 } },
};
