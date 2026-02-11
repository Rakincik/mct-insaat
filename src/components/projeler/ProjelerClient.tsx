"use client";

import PageHeader from "@/components/layout/PageHeader";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

import { projectCategories } from "@/lib/staticData";

const PLACEHOLDER_IMAGE = "https://placehold.co/600x400/e2e8f0/1e293b?text=MCT+Insaat";

// Convert string array to category objects
const categories = projectCategories.map(cat => ({
    id: cat === "Tümü" ? "all" : cat,
    label: cat
}));

export default function ProjelerClient({ initialProjects }: { initialProjects: any[] }) {
    const [activeCategory, setActiveCategory] = useState("all");

    // Defensive check: ensure initialProjects is an array
    const safeProjects = Array.isArray(initialProjects) ? initialProjects : [];

    const filteredProjects =
        activeCategory === "all"
            ? safeProjects
            : safeProjects.filter((p) => p && (p.category === activeCategory || p.type === activeCategory));

    return (
        <>
            <PageHeader
                title="Projelerimiz"
                description="Modern mimari ve kaliteli işçilikle hayata geçirdiğimiz referans projelerimiz."
                images={[
                    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
                    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80",
                    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80"
                ]}
            />

            <section className="section bg-neutral-50 px-0">
                <div className="container">
                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {(categories ?? []).map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-6 py-3 text-sm font-medium transition-all uppercase tracking-wider rounded-sm ${activeCategory === cat.id
                                    ? "bg-accent text-white"
                                    : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Projeler Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(filteredProjects ?? []).map((project) => {
                            if (!project) return null;
                            const projectId = project.id || project._id || Math.random().toString();

                            return (
                                <Link
                                    href={`/projeler/${projectId}`}
                                    key={projectId}
                                    className="group bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={(() => {
                                                const raw = project.coverImage || PLACEHOLDER_IMAGE;

                                                let clean = raw.replace(/^public\//i, "");
                                                if (!clean.startsWith("http") && !clean.startsWith("/")) {
                                                    clean = "/" + clean;
                                                }
                                                // Strict lowercase for Vercel/Linux except external URLs
                                                if (!clean.startsWith("http")) {
                                                    clean = clean.toLowerCase();
                                                }
                                                return encodeURI(clean);
                                            })()}
                                            alt={project.title || "Proje"}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors duration-300" />

                                        {/* Status Badge */}
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-primary text-xs font-bold px-3 py-1 uppercase tracking-wider">
                                            {project.status || "Tamamlandı"}
                                        </div>

                                        {/* Hover Overlay Icon */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                                                <ArrowUpRight className="text-white" size={32} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 text-sm text-accent font-semibold uppercase tracking-wider mb-2">
                                            {project.type || project.category || "Proje"}
                                        </div>
                                        <h3 className="font-heading text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-neutral-500 mb-6 line-clamp-2">
                                            {project.description}
                                        </p>

                                        <div className="mt-auto pt-6 border-t border-neutral-100 flex items-center justify-between text-sm text-neutral-500">
                                            <div className="flex items-center gap-2">
                                                <MapPin size={16} />
                                                <span>{project.location || "Konya"}</span>
                                            </div>
                                            <div>
                                                {project.size}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}
