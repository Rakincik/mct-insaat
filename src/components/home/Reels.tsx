"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface Reel {
    id: string;
    videoUrl: string;
    title?: string;
    description?: string;
}

export default function Reels({ reels = [] }: { reels: Reel[] }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const [isMuted, setIsMuted] = useState(true);

    // Auto play/pause based on active slide
    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (video) {
                if (index === activeIndex) {
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(() => {
                            // Auto-play was prevented
                        });
                    }
                } else {
                    video.pause();
                    video.currentTime = 0;
                }
            }
        });
    }, [activeIndex]);

    if (!reels || reels.length === 0) return null;

    return (
        <section className="py-20 bg-neutral-900 overflow-hidden relative">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-accent rounded-full blur-[100px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500 rounded-full blur-[100px]" />
            </div>

            <div className="container relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-accent font-bold tracking-wider uppercase text-sm mb-2 block"
                        >
                            Sosyal Medya
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-4xl font-heading font-bold text-white"
                        >
                            İnşaat Süreçlerimiz
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 md:mt-0"
                    >
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors text-sm"
                        >
                            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                            {isMuted ? "Sesi Aç" : "Sessize Al"}
                        </button>
                    </motion.div>
                </div>

                <div className="reels-slider-container">
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                            slideShadows: true,
                        }}
                        pagination={{ clickable: true }}
                        modules={[EffectCoverflow, Pagination]}
                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                        className="w-full py-8"
                        breakpoints={{
                            320: {
                                slidesPerView: 1.2,
                                spaceBetween: 20
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 30
                            }
                        }}
                    >
                        {(reels ?? []).map((reel, index) => (
                            <SwiperSlide key={reel.id} className="w-[300px] md:w-[350px] aspect-[9/16] rounded-2xl overflow-hidden bg-black relative group shadow-2xl border border-white/5">
                                <video
                                    ref={(el) => { videoRefs.current[index] = el; }}
                                    src={reel.videoUrl}
                                    className="w-full h-full object-cover"
                                    loop
                                    muted={isMuted}
                                    playsInline
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />

                                <div className="absolute bottom-6 left-6 right-6 z-20">
                                    <div className="flex items-center gap-2 text-white/80 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                                            <Play size={12} fill="currentColor" />
                                        </div>
                                        <span className="text-xs font-medium uppercase tracking-wider">MCT İnşaat</span>
                                    </div>
                                    <p className="text-white text-sm line-clamp-2">
                                        {reel.title || "Proje detayları ve şantiye görüntülerimiz."}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
