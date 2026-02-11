"use client";

import { useEffect, useRef, useState } from "react";

export default function About() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="section-full bg-primary relative overflow-hidden"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            <div className="container relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Experience Badge */}
                    <div
                        className={`inline-flex items-center gap-3 mb-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            }`}
                    >
                        <div className="h-[1px] w-12 bg-accent" />
                        <span className="text-accent uppercase tracking-widest text-sm font-semibold">
                            12 Yıllık Tecrübe
                        </span>
                        <div className="h-[1px] w-12 bg-accent" />
                    </div>

                    {/* Main Heading */}
                    <h2
                        className={`font-heading text-3xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            }`}
                    >
                        Geçmişten Geleceğe
                        <br />
                        <span className="text-accent italic">Güvenle</span>
                    </h2>

                    {/* Description */}
                    <p
                        className={`text-neutral-300 text-base md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            }`}
                    >
                        ILGIN MCT İnşaat olarak, güvenli, kaliteli, konforlu ve ekonomik binalar
                        inşa ediyoruz. Müşteri memnuniyeti odaklı yaklaşımımız ve en iyi malzeme
                        seçimimizle hayallerinizdeki yapıları gerçeğe dönüştürüyoruz.
                    </p>

                    {/* Stats */}
                    <div
                        className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            }`}
                    >
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-heading font-bold text-accent mb-2">
                                12+
                            </div>
                            <div className="text-neutral-400 text-sm uppercase tracking-wider">
                                Yıl Tecrübe
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">
                                50+
                            </div>
                            <div className="text-neutral-400 text-sm uppercase tracking-wider">
                                Tamamlanan Proje
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">
                                100%
                            </div>
                            <div className="text-neutral-400 text-sm uppercase tracking-wider">
                                Müşteri Memnuniyeti
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">
                                25+
                            </div>
                            <div className="text-neutral-400 text-sm uppercase tracking-wider">
                                Uzman Ekip
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
