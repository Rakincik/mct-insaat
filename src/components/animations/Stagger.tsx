"use client";

import React, { useRef } from "react";
import { motion, useInView, UseInViewOptions } from "framer-motion";

interface StaggerProps {
    children: React.ReactNode;
    delay?: number;
    staggerChildren?: number;
    className?: string;
    viewport?: UseInViewOptions;
}

export const StaggerContainer = ({
    children,
    delay = 0,
    staggerChildren = 0.1,
    className = "",
    viewport = { once: true, margin: "-100px" },
}: StaggerProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, viewport);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        delayChildren: delay,
                        staggerChildren: staggerChildren,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const StaggerItem = ({
    children,
    className = "",
    direction = "up",
}: {
    children: React.ReactNode;
    className?: string;
    direction?: "up" | "down" | "left" | "right" | "none";
}) => {
    const distance = 30;
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
    }

    return (
        <motion.div variants={variants} transition={{ duration: 0.5 }} className={className}>
            {children}
        </motion.div>
    );
};
