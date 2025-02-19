"use client";

import { motion, Variants, HTMLMotionProps } from "framer-motion";
import { cardAnimation, springTransition } from "@/lib/animations";

interface AnimatedWrapperProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    variants?: Variants;
    transition?: Record<string, unknown>;
    className?: string;
    layout?: boolean;
    layoutId?: string;
}

export function AnimatedWrapper({
    children,
    variants = cardAnimation,
    transition = springTransition,
    className = "",
    layout = true,
    layoutId,
    ...props
}: AnimatedWrapperProps) {
    return (
        <motion.div
            layout={layout}
            layoutId={layoutId}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={transition}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// Wrapper específico para tarjetas con hover
export function AnimatedCard({
    children,
    className = "",
    ...props
}: Omit<AnimatedWrapperProps, "variants" | "transition">) {
    return (
        <motion.div
            className={className}
            variants={cardAnimation}
            transition={springTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            layout
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// Wrapper para listas con AnimatePresence
export function AnimatedList({
    children,
    className = "",
    ...props
}: Omit<AnimatedWrapperProps, "variants" | "transition">) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}