"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

declare global {
    interface Window {
        pannellum: any;
    }
}

interface VirtualTourProps {
    image: string;
    autoLoad?: boolean;
    compass?: boolean;
    title?: string;
}

export default function VirtualTour({
    image,
    autoLoad = false,
    compass = true,
    title,
}: VirtualTourProps) {
    const viewerRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let viewer: any = null;

        // Only init if script is loaded, window.pannellum exists, and ref is attached
        if (isLoaded && window.pannellum && viewerRef.current) {
            try {
                // Destroy any existing instance on this element to be safe
                // (Though we usually rely on the cleanup function)
            } catch (e) { }

            try {
                // CRITICAL FIX: Pass the DOM element (viewerRef.current) directly.
                // Do NOT pass an ID string. This prevents "Cannot read properties of null" errors
                // if Pannellum tries to look up the ID before React has painted.
                viewer = window.pannellum.viewer(viewerRef.current, {
                    type: "equirectangular",
                    panorama: image,
                    autoLoad: autoLoad,
                    compass: compass,
                    title: title,
                    hfov: 110,
                    pitch: 10,
                    yaw: 180,
                });
            } catch (error) {
                console.error("Pannellum initialization failed:", error);
            }
        }

        return () => {
            // Cleanup
            if (viewer) {
                try {
                    viewer.destroy();
                } catch (e) {
                    // Ignore destruction errors
                }
            }
        };
    }, [isLoaded, image, autoLoad, compass, title]);

    return (
        <div className="w-full h-full min-h-[500px] relative rounded-sm overflow-hidden shadow-lg group bg-neutral-100">
            {/* Load CSS directly */}
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css"
            />
            {/* Load Script with Strategy */}
            <Script
                src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"
                onLoad={() => setIsLoaded(true)}
                strategy="afterInteractive"
            />

            {/* Container - No ID needed for Pannellum when passing ref directly, but good for debugging */}
            <div ref={viewerRef} className="w-full h-full absolute inset-0" />

            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 z-20">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-neutral-500 text-sm">360° Tur Yükleniyor...</span>
                    </div>
                </div>
            )}

            {isLoaded && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    Gezinmek için sürükleyin
                </div>
            )}
        </div>
    );
}
