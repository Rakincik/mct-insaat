"use client";

import { Building2, Home, Layers, Paintbrush, Check } from "lucide-react";
import Link from "next/link";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";

// Fallback static services if database is empty
const defaultServices = [
    {
        icon: Building2,
        title: "Çelik Yapı",
        shortDescription:
            "Modern çelik konstrüksiyon sistemleri ile hızlı, dayanıklı ve ekonomik yapılar inşa ediyoruz.",
        slug: "celik-yapi",
    },
    {
        icon: Home,
        title: "Betonarme Konut",
        shortDescription:
            "Depreme dayanıklı, kaliteli betonarme konut projeleri ile güvenli yaşam alanları oluşturuyoruz.",
        slug: "betonarme",
    },
    {
        icon: Layers,
        title: "Taş Kaplama",
        shortDescription:
            "Doğal taş ve modern kaplama çözümleri ile yapılarınıza estetik ve dayanıklılık katıyoruz.",
        slug: "tas-kaplama",
    },
    {
        icon: Paintbrush,
        title: "Dekorasyon",
        shortDescription:
            "İç ve dış mekan dekorasyonu ile yaşam alanlarınızı hayallerinizdeki gibi şekillendiriyoruz.",
        slug: "dekorasyon",
    },
];

// Icon mapping for dynamic services
const iconMap: Record<string, any> = {
    Building2,
    Home,
    Layers,
    Paintbrush,
    Check
};

interface ServicesProps {
    services?: any[];
}

export default function Services({ services }: ServicesProps) {
    // Use dynamic services if available, otherwise use defaults
    const displayServices = (services && services.length > 0) ? services : defaultServices;
    return (
        <section className="section bg-neutral-100">
            <div className="container">
                {/* Section Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-16">
                    <div className="max-w-xl">
                        <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-4 block">
                            Hizmetlerimiz
                        </span>
                        <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary">
                            Profesyonel
                            <br />
                            <span className="text-accent">İnşaat Hizmetleri</span>
                        </h2>
                    </div>
                    <p className="text-neutral-600 text-lg max-w-md">
                        Çelik yapı, betonarme konut, taş kaplama ve dekorasyon alanlarında
                        uzman ekibimizle hizmetinizdeyiz.
                    </p>
                </div>

                {/* Services Grid */}
                <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerChildren={0.1}>
                    {(displayServices ?? []).slice(0, 4).map((service: any, index: number) => {
                        // Get icon component - use iconMap for string names or direct component
                        const IconComponent = typeof service.icon === 'string'
                            ? (iconMap[service.icon] || iconMap[service.iconName] || Check)
                            : (service.icon || Check);

                        return (
                            <StaggerItem key={service.id || service._id || index}>
                                <Link
                                    href={`/hizmetler/${service.slug || service.id || service._id}`}
                                    className="group flex gap-6 p-8 bg-white hover:bg-primary transition-all duration-500"
                                >
                                    {/* Icon */}
                                    <div className="flex-shrink-0 w-16 h-16 bg-accent flex items-center justify-center group-hover:bg-white transition-colors duration-500">
                                        <IconComponent
                                            className="text-white group-hover:text-accent transition-colors duration-500"
                                            size={32}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <h3 className="font-heading text-xl font-bold text-primary group-hover:text-white mb-3 transition-colors duration-500">
                                            {service.title}
                                        </h3>
                                        <p className="text-neutral-600 group-hover:text-neutral-300 transition-colors duration-500">
                                            {service.shortDescription || service.description || ""}
                                        </p>
                                    </div>
                                </Link>
                            </StaggerItem>
                        );
                    })}
                </StaggerContainer>
            </div>
        </section>
    );
}
