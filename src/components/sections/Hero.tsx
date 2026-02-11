"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useQuote } from "@/context/QuoteContext";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface HeroSlide {
    id: number;
    image: string;
    video?: string;
    title: string;
    subtitle: string;
    description: string;
}

const heroSlides: HeroSlide[] = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
        video: "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4",
        title: "GÜVEN",
        subtitle: "İNŞAA EDİYORUZ",
        description: "12 yıllık tecrübe ile güvenli, kaliteli ve ekonomik yapılar",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
        title: "ÇELİK",
        subtitle: "VİLLA PROJELERİ",
        description: "Modern tasarım ve dayanıklı çelik yapı sistemleri",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80",
        title: "BETONARME",
        subtitle: "KONUTLAR",
        description: "Konforlu ve güvenli yaşam alanları",
    },
];

export default function Hero({ settings, dbSlides }: { settings?: any, dbSlides?: any[] }) {
    const { openWizard } = useQuote();

    // Prioritize DB slides if they exist, otherwise use default static slides
    let activeSlides = Array.isArray(dbSlides) && dbSlides.length > 0 ? dbSlides : heroSlides;

    // Apply Settings overrides to the first slide ONLY if we are using the DEFAULT slides
    // If using DB slides, the user can edit them directly in the slider manager
    if (activeSlides === heroSlides && settings?.heroTitle) {
        activeSlides = [...heroSlides]; // Clone to avoid mutation
        activeSlides[0] = {
            ...activeSlides[0],
            title: settings.heroTitle,
            subtitle: "İNŞAA EDİYORUZ",
            description: settings.heroDescription || activeSlides[0].description
        };
    }

    return (
        <section className="relative h-screen min-h-[700px]">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect="fade"
                navigation={{
                    prevEl: ".hero-prev",
                    nextEl: ".hero-next",
                }}
                pagination={{
                    clickable: true,
                    el: ".hero-pagination",
                }}
                autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                }}
                loop={true}
                className="h-full w-full"
            >
                {(activeSlides ?? []).map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative h-full w-full">
                            {/* Background Media */}
                            <div className="absolute inset-0">
                                {slide.video ? (
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="absolute inset-0 w-full h-full object-cover"
                                        poster={slide.image}
                                    >
                                        <source src={slide.video} type="video/mp4" />
                                    </video>
                                ) : (
                                    <div
                                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                        style={{ backgroundImage: `url('${slide.image}')` }}
                                    />
                                )}
                                <div className="absolute inset-0 gradient-overlay" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 h-full flex items-center pt-20 md:pt-32">
                                <div className="container">
                                    <div className="max-w-3xl">
                                        <motion.h1
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: 0.2 }}
                                            className="font-heading text-4xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-none"
                                        >
                                            <span className="block text-accent">{slide.title}</span>
                                            <span className="block italic">{slide.subtitle}</span>
                                        </motion.h1>
                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: 0.4 }}
                                            className="text-base md:text-xl text-neutral-300 mb-8 max-w-xl"
                                        >
                                            {slide.description}
                                        </motion.p>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: 0.6 }}
                                            className="flex flex-col sm:flex-row gap-4"
                                        >
                                            <Link href="/projeler" className="btn btn-primary w-full sm:w-auto">
                                                Projelerimiz
                                                <ArrowRight size={18} />
                                            </Link>
                                            <button onClick={openWizard} className="btn btn-outline w-full sm:w-auto">
                                                İletişime Geç
                                            </button>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation - Hidden on mobile */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center gap-6">
                <button
                    className="hero-prev w-12 h-12 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-accent transition-colors group"
                    aria-label="Önceki"
                >
                    <ChevronLeft className="text-white group-hover:text-white" size={24} />
                </button>

                <div className="hero-pagination flex gap-2" />

                <button
                    className="hero-next w-12 h-12 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-accent transition-colors group"
                    aria-label="Sonraki"
                >
                    <ChevronRight className="text-white group-hover:text-white" size={24} />
                </button>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 right-8 z-20 hidden lg:flex flex-col items-center gap-2">
                <span className="text-white/60 text-xs tracking-widest uppercase">Kaydır</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-white/60 to-transparent" />
            </div>
        </section>
    );
}
