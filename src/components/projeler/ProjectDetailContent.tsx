"use client";

import { useState } from "react";
import { Calendar, CheckCircle2, ChevronLeft, ChevronRight, MapPin, Ruler, Search } from "lucide-react";
import Link from "next/link";
import ImageViewer from "@/components/ui/ImageViewer";
import VirtualTour from "@/components/ui/VirtualTour";
import FadeIn from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";

const PLACEHOLDER_IMAGE = "https://placehold.co/600x400/e2e8f0/1e293b?text=MCT+Insaat";

interface ProjectDetailContentProps {
    project: any; // Type this properly if possible, or use the imported type
    nextProject: any;
    prevProject: any;
}

export default function ProjectDetailContent({ project, nextProject, prevProject }: ProjectDetailContentProps) {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openLightbox = (index: number) => {
        if (!safeGallery || safeGallery.length === 0) return;
        setCurrentImageIndex(index);
        setIsLightboxOpen(true);
    };

    // Strict Normalization for Gallery
    const rawGallery = Array.isArray(project.gallery) ? project.gallery : [];

    // Filter out non-string or empty values, and normalize paths
    let safeGallery = rawGallery
        .filter((img: any) => typeof img === 'string' && img.trim().length > 0)
        .map((img: string) => {
            // 1. Force removing "public/" prefix logic (case-insensitive for safety)
            let clean = img.replace(/^public\//i, "");

            // 2. Ensure leading slash for local paths (not http/https)
            if (!clean.startsWith("http") && !clean.startsWith("/")) {
                clean = "/" + clean;
            }

            // 3. Lowercase everything for Vercel/Linux compatibility (images are physically lowercased by script)
            if (!clean.startsWith("http")) {
                clean = clean.toLowerCase();
            }

            // 4. Encode URI components
            try {
                return project.virtualTourUrl ? encodeURI(clean) : encodeURI(decodeURI(clean));
            } catch (e) {
                return encodeURI(clean);
            }
        });

    // Ensure at least coverImage is in gallery if it's empty
    if (safeGallery.length === 0) {
        const rawCover = project.coverImage;
        if (rawCover && typeof rawCover === 'string') {
            let cleanCover = rawCover.replace(/^public\//i, "");
            if (!cleanCover.startsWith("http") && !cleanCover.startsWith("/")) {
                cleanCover = "/" + cleanCover;
            }
            if (!cleanCover.startsWith("http")) {
                cleanCover = cleanCover.toLowerCase();
            }
            safeGallery = [encodeURI(cleanCover)];
        } else {
            safeGallery = [PLACEHOLDER_IMAGE];
        }
    }

    const safeFeatures = Array.isArray(project.features) ? project.features : [];

    return (
        <>
            <ImageViewer
                images={safeGallery}
                initialIndex={currentImageIndex}
                isOpen={isLightboxOpen}
                onClose={() => setIsLightboxOpen(false)}
            />

            <section className="section bg-white">
                <div className="container">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            <FadeIn delay={0.2}>
                                <div>
                                    <h2 className="font-heading text-3xl font-bold text-primary mb-6">
                                        Proje Hakkında
                                    </h2>
                                    <p className="text-neutral-600 text-lg leading-relaxed">
                                        {project.description || "Proje açıklaması bulunmamaktadır."}
                                    </p>
                                </div>
                            </FadeIn>

                            {/* Features */}
                            {safeFeatures.length > 0 && (
                                <FadeIn delay={0.3}>
                                    <div>
                                        <h3 className="font-heading text-xl font-bold text-primary mb-4">
                                            Proje Özellikleri
                                        </h3>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {safeFeatures.map((feature: string, index: number) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-3 p-4 bg-neutral-50 rounded-sm hover:bg-neutral-100 transition-colors"
                                                >
                                                    <CheckCircle2 className="text-accent" size={20} />
                                                    <span className="font-medium text-neutral-700">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </FadeIn>
                            )}

                            {/* Virtual Tour Section */}
                            {project.virtualTourUrl && (
                                <FadeIn delay={0.35}>
                                    <div className="mb-12">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-1 h-8 bg-accent" />
                                            <h2 className="font-heading text-2xl font-bold text-primary">
                                                Sanal Tur (360°)
                                            </h2>
                                        </div>
                                        <div className="aspect-[2/1] bg-neutral-100 rounded-sm overflow-hidden shadow-lg ring-1 ring-neutral-200">
                                            <VirtualTour image={project.virtualTourUrl} title={project.title} />
                                        </div>
                                    </div>
                                </FadeIn>
                            )}

                            {/* Gallery */}
                            {safeGallery.length > 0 && (
                                <FadeIn delay={0.1} viewport={{ once: true, margin: "0px" }}>
                                    <div>
                                        <h3 className="font-heading text-xl font-bold text-primary mb-6">
                                            Proje Galerisi
                                        </h3>
                                        <div className="grid gap-4">
                                            {/* Main Large Image */}
                                            <div
                                                className="aspect-video rounded-sm overflow-hidden shadow-md cursor-pointer group relative"
                                                onClick={() => openLightbox(0)}
                                            >
                                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                                                    <Search className="text-white drop-shadow-md" size={48} />
                                                </div>
                                                <img
                                                    src={safeGallery[0]}
                                                />
                                            </div>

                                            {/* Grid for others */}
                                            {safeGallery.length > 1 && (
                                                <StaggerContainer
                                                    className="grid grid-cols-2 md:grid-cols-3 gap-4"
                                                    staggerChildren={0.05}
                                                    viewport={{ once: true, margin: "0px" }}
                                                >
                                                    {safeGallery.slice(1).map((img: string, index: number) => (
                                                        <StaggerItem key={index}>
                                                            <div
                                                                className="aspect-[4/3] rounded-sm overflow-hidden shadow-sm cursor-pointer group relative"
                                                                onClick={() => openLightbox(index + 1)}
                                                            >
                                                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                                                                    <Search className="text-white drop-shadow-md" size={24} />
                                                                </div>
                                                                <img
                                                                    src={img}
                                                                />
                                                            </div>
                                                        </StaggerItem>
                                                    ))}
                                                </StaggerContainer>
                                            )}
                                        </div>
                                    </div>
                                </FadeIn>
                            )}
                        </div>

                        {/* Sidebar Info */}
                        <div className="lg:col-span-1">
                            <FadeIn delay={0.3} direction="left">
                                <div className="sticky top-24 bg-neutral-50 p-8 rounded-sm border border-neutral-100 shadow-sm">
                                    <h3 className="font-heading text-xl font-bold text-primary mb-6 pb-4 border-b border-neutral-200">
                                        Proje Bilgileri
                                    </h3>

                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-white border border-neutral-200 flex items-center justify-center text-accent shadow-sm rounded-full shrink-0">
                                                <MapPin size={20} />
                                            </div>
                                            <div>
                                                <span className="block text-sm text-neutral-500 mb-1">Lokasyon</span>
                                                <span className="block font-semibold text-primary">{project.location || "Belirtilmemiş"}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-white border border-neutral-200 flex items-center justify-center text-accent shadow-sm rounded-full shrink-0">
                                                <Calendar size={20} />
                                            </div>
                                            <div>
                                                <span className="block text-sm text-neutral-500 mb-1">Yıl</span>
                                                <span className="block font-semibold text-primary">{project.year || project.completionDate || "Belirtilmemiş"}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-white border border-neutral-200 flex items-center justify-center text-accent shadow-sm rounded-full shrink-0">
                                                <Ruler size={20} />
                                            </div>
                                            <div>
                                                <span className="block text-sm text-neutral-500 mb-1">Alan</span>
                                                <span className="block font-semibold text-primary">{project.size || project.area || "Belirtilmemiş"}</span>
                                            </div>
                                        </div>

                                        {project.client && (
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 bg-white border border-neutral-200 flex items-center justify-center text-accent shadow-sm rounded-full shrink-0">
                                                    <CheckCircle2 size={20} />
                                                </div>
                                                <div>
                                                    <span className="block text-sm text-neutral-500 mb-1">İşveren</span>
                                                    <span className="block font-semibold text-primary">{project.client}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-neutral-200">
                                        <Link href="/iletisim" className="btn btn-primary w-full text-center justify-center">
                                            Bu Proje İçin Teklif Al
                                        </Link>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>

                    {/* Navigation */}
                    {(nextProject || prevProject) && (
                        <FadeIn delay={0.5}>
                            <div className="mt-20 pt-10 border-t border-neutral-200 grid sm:grid-cols-2 gap-4">
                                {prevProject && (
                                    <Link
                                        href={`/projeler/${prevProject.id || prevProject._id}`}
                                        className="flex items-center gap-4 p-6 bg-neutral-50 hover:bg-white hover:shadow-lg transition-all group border border-transparent hover:border-neutral-100"
                                    >
                                        <div className="w-12 h-12 flex items-center justify-center bg-white text-primary group-hover:bg-accent group-hover:text-white transition-colors rounded-full shadow-sm">
                                            <ChevronLeft size={24} />
                                        </div>
                                        <div>
                                            <span className="block text-sm text-neutral-500 mb-1">Önceki Proje</span>
                                            <span className="block font-bold text-primary group-hover:text-accent transition-colors">
                                                {prevProject.title}
                                            </span>
                                        </div>
                                    </Link>
                                )}

                                {nextProject && (
                                    <Link
                                        href={`/projeler/${nextProject.id || nextProject._id}`}
                                        className="flex items-center justify-end gap-4 p-6 bg-neutral-50 hover:bg-white hover:shadow-lg transition-all group text-right border border-transparent hover:border-neutral-100"
                                    >
                                        <div>
                                            <span className="block text-sm text-neutral-500 mb-1">Sonraki Proje</span>
                                            <span className="block font-bold text-primary group-hover:text-accent transition-colors">
                                                {nextProject.title}
                                            </span>
                                        </div>
                                        <div className="w-12 h-12 flex items-center justify-center bg-white text-primary group-hover:bg-accent group-hover:text-white transition-colors rounded-full shadow-sm">
                                            <ChevronRight size={24} />
                                        </div>
                                    </Link>
                                )}
                            </div>
                        </FadeIn>
                    )}
                </div>
            </section>
        </>
    );
}
