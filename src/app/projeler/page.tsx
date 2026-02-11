import { getProjects } from "@/lib/db";
import ProjelerClient from "@/components/projeler/ProjelerClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProjelerPage() {
    // Fetch from MongoDB
    const projects = await getProjects();

    return <ProjelerClient initialProjects={projects} />;
}
