"use client";

import { Shield, Award, Users, FileCheck } from "lucide-react";

const features = [
    {
        icon: FileCheck,
        title: "Analiz Raporları",
        description:
            "Her projeye başlamadan önce detaylı analiz ve fizibilite raporları hazırlıyoruz.",
    },
    {
        icon: Award,
        title: "En İyi Malzeme",
        description:
            "Kaliteden ödün vermeden, en iyi malzemeleri uygun fiyatlarla temin ediyoruz.",
    },
    {
        icon: Shield,
        title: "Güvenli Yapılar",
        description:
            "Depreme dayanıklı, güvenli ve uzun ömürlü yapılar inşa ediyoruz.",
    },
    {
        icon: Users,
        title: "Müşteri Memnuniyeti",
        description:
            "Müşterilerimizin beklentilerini aşan hizmet anlayışıyla çalışıyoruz.",
    },
];

export default function Features() {
    return (
        <section className="section bg-white">
            <div className="container">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-4 block">
                        Neden Biz?
                    </span>
                    <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary mb-6">
                        Neden <span className="text-accent">MCT İnşaat?</span>
                    </h2>
                    <p className="text-neutral-600 text-lg">
                        12 yıllık tecrübemiz ve uzman ekibimizle, hayallerinizdeki yapıları
                        güvenle inşa ediyoruz.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {(features ?? []).map((feature, index) => (
                        <div
                            key={index}
                            className="group text-center p-8 bg-neutral-50 hover:bg-primary transition-all duration-500"
                        >
                            {/* Icon */}
                            <div className="w-16 h-16 bg-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent transition-colors duration-500">
                                <feature.icon
                                    className="text-accent group-hover:text-white transition-colors duration-500"
                                    size={32}
                                />
                            </div>

                            {/* Title */}
                            <h3 className="font-heading text-xl font-bold text-primary group-hover:text-white mb-4 transition-colors duration-500">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-neutral-600 group-hover:text-neutral-300 transition-colors duration-500">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
