"use client";

import { useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import TiltCard from "@/components/ui/TiltCard";

const categories = [
    { id: "all", label: "Tümü" },
    { id: "celik-villa", label: "Çelik Villa" },
    { id: "betonarme", label: "Betonarme" },
    { id: "tas-kaplama", label: "Taş Kaplama" }, // Added category
    { id: "ticari", label: "Ticari" }, // Added category
];

interface ProjectsProps {
    projects: any[];
}

export default function Projects({ projects }: ProjectsProps) {
    const [activeCategory, setActiveCategory] = useState("all");

    // Defensive check: ensure projects is an array
    const safeProjects = Array.isArray(projects) ? projects : [];

    const filteredProjects =
        activeCategory === "all"
            ? safeProjects
            : safeProjects.filter((p) => p && p.category === activeCategory);

    return (
        <section className="section bg-neutral-50">
            <div className="container">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                    <div>
                        <span className="text-accent uppercase tracking-widest text-sm font-semibold mb-4 block">
                            Projelerimiz
                        </span>
                        <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary">
                            Tamamlanan
                            <br />
                            <span className="text-accent">Projeler</span>
                        </h2>
                    </div>

                    {/* Category Filter */}
                    <div className="flex gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-5 py-2 text-sm font-medium transition-all ${activeCategory === cat.id
                                    ? "bg-accent text-white"
                                    : "bg-white text-neutral-600 hover:bg-neutral-100"
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerChildren={0.1}>
                    {(filteredProjects ?? []).map((project) => (
                        <StaggerItem key={project.id}>
                            <Link
                                href={`/projeler/${project.id}`}
                                className="block h-full"
                            >
                                <TiltCard className="group bg-white h-full shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                    {/* Image */}
                                    <div className="relative aspect-[4/3] img-zoom-container overflow-hidden">
                                        <div
                                            style={{ transform: "translateZ(20px)" }}
                                            className="absolute inset-0 z-10"
                                        />
                                        <img
                                            src={project.coverImage || "/placeholder-project.jpg"}
                                            alt={project.title}
                                            className="w-full h-full object-cover img-zoom"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                        {/* Hover Arrow */}
                                        <div
                                            style={{ transform: "translateZ(30px)" }}
                                            className="absolute bottom-4 right-4 w-10 h-10 bg-accent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0"
                                        >
                                            <ArrowUpRight className="text-white" size={20} />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div
                                        style={{ transform: "translateZ(20px)" }}
                                        className="p-5 bg-white"
                                    >
                                        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
                                            <MapPin size={14} />
                                            <span>{project.location}</span>
                                        </div>
                                        <h3 className="font-heading text-lg font-bold text-primary mb-1 group-hover:text-accent transition-colors">
                                            {project.title} - {project.size}
                                        </h3>
                                        {project.client && (
                                            <p className="text-sm text-neutral-500">{project.client}</p>
                                        )}
                                    </div>
                                </TiltCard>
                            </Link>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Link href="/projeler" className="btn btn-outline-dark">
                        Tüm Projeleri Gör
                        <ArrowUpRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
