"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Show splash screen on every visit as requested (or we could use sessionStorage)
        // const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
        // if (hasSeenSplash) {
        //     setIsVisible(false);
        // } else {
        const timer = setTimeout(() => {
            setIsVisible(false);
            // sessionStorage.setItem("hasSeenSplash", "true");
        }, 2500); // 2.5 seconds total duration

        return () => clearTimeout(timer);
        // }
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                >
                    <div className="relative flex flex-col items-center">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative w-[80%] max-w-[600px] h-auto mb-12"
                        >
                            <img
                                src="/logo.jpg"
                                alt="MCT İnşaat"
                                className="w-full h-auto object-contain drop-shadow-2xl"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                            className="h-1 bg-primary rounded-full"
                        />

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="mt-4 text-xl font-heading font-bold text-primary tracking-widest uppercase"
                        >
                            Güven İnşaa Ediyoruz
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
