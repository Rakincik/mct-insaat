import PageHeader from "@/components/layout/PageHeader";
import { projects as localProjects } from "@/data/projects";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProjectDetailContent from "@/components/projeler/ProjectDetailContent";

interface Props {
    params: {
        id: string;
    };
}

export const dynamic = "force-dynamic";

// Generate Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const project = localProjects.find((p: any) => p.id === params.id);
    if (!project) return { title: "Proje Bulunamadı" };

    return {
        title: `${project.title} | MCT İnşaat`,
        description: project.description,
    };
}

export default async function ProjectDetailPage({ params }: Props) {
    // Use local data as primary source
    const project = localProjects.find((p: any) => (p.id === params.id));

    if (!project) {
        notFound();
    }

    // Find next/prev projects for navigation
    const currentIndex = localProjects.findIndex((p: any) => (p.id === params.id || p._id === params.id));
    const nextProject = localProjects.length > 1 ? localProjects[(currentIndex + 1) % localProjects.length] : null;
    const prevProject = localProjects.length > 1 ? localProjects[(currentIndex - 1 + localProjects.length) % localProjects.length] : null;

    // --- Advanced Auto-Gallery Discovery (Manifest Based for Vercel) ---
    try {
        // 1. Better Slugify for matching
        const slugify = (text: string) => {
            return text
                .toLowerCase()
                .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
                .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
                .replace(/²/g, '2') // Handle m2
                .replace(/[^a-z0-9]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
        };

        const titleSlug = slugify(project.title);

        // 2. Load manifest safely
        let galleryManifest: Record<string, string[]> = {};
        try {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            galleryManifest = require("@/data/gallery-manifest.json");
        } catch (e) {
            console.error("Manifest not found, gallery may be empty.");
        }

        // 3. Find the best matching folder in manifest
        const manifestKeys = Object.keys(galleryManifest);
        let folderName = manifestKeys.find(key =>
            key === titleSlug ||
            titleSlug.includes(key) ||
            key.includes(titleSlug)
        );

        // Special manual overrides if still not found
        if (!folderName) {
            if (titleSlug.includes("195-m") || titleSlug.includes("195m")) folderName = "195m2-celik-villa";
            if (titleSlug.includes("240-m") || titleSlug.includes("240m")) folderName = "240m2-celik-villa";
        }

        const images = folderName ? galleryManifest[folderName] : [];

        if (images && images.length > 0) {
            const existingGallery = Array.isArray(project.gallery) ? project.gallery : [];
            const combined = Array.from(new Set([...(existingGallery ?? []), ...(images ?? [])]));
            project.gallery = combined;
        }
    } catch (e) {
        console.error("Auto-gallery discovery (manifest) failed:", e);
    }

    // Ultimate fallback
    if (!project.gallery || project.gallery.length === 0) {
        // Safe access to coverImage with fallback and normalization
        const rawCover = project.coverImage;
        const normalizedCover = rawCover?.startsWith("public/") ? rawCover.replace(/^public\//, "/") : rawCover;
        project.gallery = [normalizedCover || "https://placehold.co/600x400/e2e8f0/1e293b?text=MCT+Insaat"];
    }

    return (
        <>
            <PageHeader
                title={project.title}
                description={project.type}
                backgroundImage={project.coverImage}
                parentPage={{ label: "Projelerimiz", href: "/projeler" }}
            />

            <ProjectDetailContent
                project={project}
                nextProject={nextProject}
                prevProject={prevProject}
            />
        </>
    );
}
