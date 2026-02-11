"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
            if (!isVisible) setIsVisible(true);
        };

        const mouseEnter = () => setIsHovering(true);
        const mouseLeave = () => setIsHovering(false);

        window.addEventListener("mousemove", mouseMove);

        // Add event listeners to all clickable elements
        const clickables = document.querySelectorAll(
            'a, button, input, textarea, select, [role="button"]'
        );

        clickables.forEach((el) => {
            el.addEventListener("mouseenter", mouseEnter);
            el.addEventListener("mouseleave", mouseLeave);
        });

        // Mutation observer to handle dynamically added elements
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(() => {
                const newClickables = document.querySelectorAll(
                    'a, button, input, textarea, select, [role="button"]'
                );
                newClickables.forEach((el) => {
                    el.removeEventListener("mouseenter", mouseEnter);
                    el.removeEventListener("mouseleave", mouseLeave);
                    el.addEventListener("mouseenter", mouseEnter);
                    el.addEventListener("mouseleave", mouseLeave);
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", mouseMove);
            clickables.forEach((el) => {
                el.removeEventListener("mouseenter", mouseEnter);
                el.removeEventListener("mouseleave", mouseLeave);
            });
            observer.disconnect();
        };
    }, [isVisible]);

    // Don't render on mobile devices (simple check)
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches) {
        return null;
    }

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            height: 32,
            width: 32,
            backgroundColor: "transparent",
            border: "2px solid #FFC107", // Accent color (amber-500 approx)
            mixBlendMode: "normal" as const,
        },
        hover: {
            x: mousePosition.x - 32,
            y: mousePosition.y - 32,
            height: 64,
            width: 64,
            backgroundColor: "rgba(255, 193, 7, 0.2)",
            border: "2px solid #FFC107",
            mixBlendMode: "difference" as const,
        },
    };

    const dotVariants = {
        default: {
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            opacity: 1,
        },
        hover: {
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            opacity: 0,
        },
    };

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
            {/* Outer Circle */}
            <motion.div
                className="fixed top-0 left-0 rounded-full"
                variants={variants}
                animate={isHovering ? "hover" : "default"}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                }}
            />

            {/* Inner Dot */}
            <motion.div
                className="fixed top-0 left-0 h-2 w-2 bg-[#FFC107] rounded-full"
                variants={dotVariants}
                animate={isHovering ? "hover" : "default"}
                transition={{
                    type: "spring",
                    stiffness: 1000,
                    damping: 50,
                }}
            />
        </div>
    );
}
