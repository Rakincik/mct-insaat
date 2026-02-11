import { getProjects, getServices } from "@/lib/db";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://mctinsaat.com";

    // Static Routes
    const staticRoutes = [
        "",
        "/hakkimizda",
        "/projeler",
        "/hizmetler",
        "/iletisim",
        "/mct-kosesi",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    try {
        // Fetch dynamic content
        const projects = await getProjects();
        const services = await getServices();

        // Dynamic Project Routes
        const projectRoutes = projects.map((project: any) => ({
            url: `${baseUrl}/projeler/${project.id}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        }));

        // Dynamic Service Routes
        const serviceRoutes = services.map((service: any) => ({
            url: `${baseUrl}/hizmetler/${service.id}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        }));

        return [...staticRoutes, ...projectRoutes, ...serviceRoutes];
    } catch (error) {
        console.error("Sitemap generation error, returning static routes only:", error);
        return staticRoutes;
    }
}
