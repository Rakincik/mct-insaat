"use client";

import React, { useRef } from "react";
import { motion, useInView, UseInViewOptions } from "framer-motion";

interface FadeInProps {
    children: React.ReactNode;
    direction?: "up" | "down" | "left" | "right" | "none";
    delay?: number;
    duration?: number;
    className?: string;
    fullWidth?: boolean;
    viewport?: UseInViewOptions;
}

export default function FadeIn({
    children,
    direction = "up",
    delay = 0,
    duration = 0.5,
    className = "",
    fullWidth = false,
    viewport = { once: true, margin: "-100px" },
}: FadeInProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, viewport);

    const getVariants = () => {
        const distance = 40;
        const variants = {
            hidden: { opacity: 0, x: 0, y: 0 },
            visible: { opacity: 1, x: 0, y: 0 },
        };

        switch (direction) {
            case "up":
                variants.hidden.y = distance;
                break;
            case "down":
                variants.hidden.y = -distance;
                break;
            case "left":
                variants.hidden.x = distance;
                break;
            case "right":
                variants.hidden.x = -distance;
                break;
            default:
                break;
        }

        return variants;
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={getVariants()}
            transition={{ duration, delay, ease: "easeOut" }}
            className={`${className} ${fullWidth ? "w-full" : ""}`}
        >
            {children}
        </motion.div>
    );
}
