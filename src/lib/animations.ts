import { Variants } from "framer-motion";

// Animaciones para elementos que aparecen/desaparecen con fade
export const fadeAnimation: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
};

// Animaciones para tarjetas
export const cardAnimation: Variants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
};

// Configuraciones de transición
export const springTransition = {
    type: "spring",
    stiffness: 300,
    damping: 25
};

export const defaultTransition = {
    duration: 0.3,
    ease: "easeInOut"
};

// Animaciones para hover
export const hoverAnimation = {
    scale: 1.02,
    transition: springTransition
};

// Animaciones para click
export const tapAnimation = {
    scale: 0.95,
    transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
    }
};

// Animaciones para listas
export const listAnimation: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
};