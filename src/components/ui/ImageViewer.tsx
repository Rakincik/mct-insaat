"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

interface ImageViewerProps {
    images: string[];
    initialIndex: number;
    isOpen: boolean;
    onClose: () => void;
}

export default function ImageViewer({
    images,
    initialIndex,
    isOpen,
    onClose,
}: ImageViewerProps) {
    // Safe Images Calculation
    const safeImages = React.useMemo(() => {
        if (!Array.isArray(images)) return [];

        return images
            .filter(img => typeof img === 'string' && img.trim().length > 0)
            .map(img => {
                let clean = img.replace(/^public\//i, "");
                if (!clean.startsWith("http") && !clean.startsWith("/")) {
                    clean = "/" + clean;
                }

                // Strict lowercase
                if (!clean.startsWith("http")) {
                    clean = clean.toLowerCase();
                }

                // Try to avoid double encoding if already encoded
                try {
                    return clean.includes('%') ? clean : encodeURI(clean);
                } catch {
                    return encodeURI(clean);
                }
            });
    }, [images]);

    // Internal index guard
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [scale, setScale] = useState(1);
    const [isDragging, setIsDragging] = useState(false);

    // Sync internal state with props and clamp index
    useEffect(() => {
        if (isOpen) {
            let safeIndex = initialIndex;
            if (safeImages.length > 0) {
                // Clamp index to valid range
                if (safeIndex < 0) safeIndex = 0;
                if (safeIndex >= safeImages.length) safeIndex = safeImages.length - 1;
            } else {
                safeIndex = 0;
            }
            setCurrentIndex(safeIndex);
            setScale(1);
        }
    }, [isOpen, initialIndex, safeImages.length]);

    const nextImage = useCallback(() => {
        if (safeImages.length === 0) return;
        setCurrentIndex((prev) => (prev + 1) % safeImages.length);
        setScale(1);
    }, [safeImages.length]);

    const prevImage = useCallback(() => {
        if (safeImages.length === 0) return;
        setCurrentIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
        setScale(1);
    }, [safeImages.length]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
        };

        window.addEventListener("keydown", handleKeyDown);
        // Lock scroll
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose, nextImage, prevImage]);

    if (!isOpen) return null;

    // Use placeholder if no images available even after filtering
    const displayImage = safeImages.length > 0 ? safeImages[currentIndex] : "/placeholder-project.jpg";

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center backdrop-blur-sm"
                    onClick={onClose}
                >
                    {/* Controls */}
                    <div
                        className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-[210] pointer-events-none"
                    >
                        <div className="text-white/80 pointer-events-auto bg-black/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium">
                            {safeImages.length > 0 ? currentIndex + 1 : 0} / {safeImages.length}
                        </div>

                        <div className="flex items-center gap-4 pointer-events-auto">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setScale((prev) => Math.min(prev + 0.5, 3));
                                }}
                                className="p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                                aria-label="Zoom In"
                            >
                                <ZoomIn size={24} />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setScale((prev) => Math.max(prev - 0.5, 1));
                                }}
                                className="p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                                aria-label="Zoom Out"
                            >
                                <ZoomOut size={24} />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClose();
                                }}
                                className="p-3 text-white hover:text-accent hover:bg-white/10 rounded-full transition-colors"
                                aria-label="Close"
                            >
                                <X size={32} />
                            </button>
                        </div>
                    </div>

                    {/* Previous Button */}
                    {safeImages.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                prevImage();
                            }}
                            className="absolute left-4 z-[210] p-4 text-white hover:text-accent hover:bg-white/10 rounded-full transition-all hidden md:block"
                            aria-label="Previous"
                        >
                            <ChevronLeft size={48} />
                        </button>
                    )}

                    {/* Next Button */}
                    {safeImages.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                nextImage();
                            }}
                            className="absolute right-4 z-[210] p-4 text-white hover:text-accent hover:bg-white/10 rounded-full transition-all hidden md:block"
                            aria-label="Next"
                        >
                            <ChevronRight size={48} />
                        </button>
                    )}

                    {/* Image Container */}
                    <div
                        className="relative w-full h-full flex items-center justify-center p-4 md:p-12 overflow-hidden"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image area
                    >
                        <motion.img
                            key={currentIndex}
                            src={displayImage}
                            alt={`Galeri Görseli ${currentIndex + 1}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: scale }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="max-w-full max-h-full object-contain shadow-2xl selectable-none"
                            drag
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            dragElastic={0.2}
                            onDragStart={() => setIsDragging(true)}
                            onDragEnd={(_, info) => {
                                setIsDragging(false);
                                if (info.offset.x > 100) prevImage();
                                else if (info.offset.x < -100) nextImage();
                                else if (Math.abs(info.offset.y) > 100) onClose();
                            }}
                            style={{ cursor: isDragging ? "grabbing" : "grab" }}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/placeholder-project.jpg";
                            }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
