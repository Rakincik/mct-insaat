"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

interface PageHeaderProps {
    title: string;
    description?: string;
    backgroundImage?: string;
    parentPage?: {
        label: string;
        href: string;
    };
}

export default function PageHeader({
    title,
    description,
    backgroundImage,
    images,
    parentPage,
}: PageHeaderProps & { images?: string[] }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const bgImages = images || (backgroundImage ? [backgroundImage] : ["https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80"]);

    useEffect(() => {
        if (bgImages.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % bgImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [bgImages]);

    return (
        <section className="relative h-[400px] flex items-center justify-center pt-32 md:pt-40 overflow-hidden">
            {/* Background Images Slider */}
            {bgImages.map((img, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${index === currentImageIndex ? "opacity-100" : "opacity-0"
                        }`}
                    style={{ backgroundImage: `url('${img}')` }}
                >
                    <div className="absolute inset-0 bg-primary/80 backdrop-blur-[2px]" />
                </div>
            ))}

            {/* Content */}
            <div className="relative z-10 container text-center">
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-slide-up">
                    {title}
                </h1>

                {description && (
                    <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8 animate-slide-up animation-delay-100">
                        {description}
                    </p>
                )}

                {/* Breadcrumb */}
                <div className="flex items-center justify-center gap-2 text-sm text-neutral-400 animate-slide-up animation-delay-200">
                    <Link href="/" className="hover:text-white transition-colors">
                        Ana Sayfa
                    </Link>
                    {parentPage && (
                        <>
                            <ChevronRight size={14} />
                            <Link
                                href={parentPage.href}
                                className="hover:text-white transition-colors"
                            >
                                {parentPage.label}
                            </Link>
                        </>
                    )}
                    <ChevronRight size={14} />
                    <span className="text-accent font-semibold">{title}</span>
                </div>
            </div>
        </section>
    );
}
