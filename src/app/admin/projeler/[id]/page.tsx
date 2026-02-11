import ProjectForm from "@/components/admin/ProjectForm";
import { getProjects } from "@/lib/db";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
    let project = null;
    try {
        const projects = await getProjects() || [];
        project = projects.find((p: any) => p.id === params.id);
    } catch (error) {
        console.error("Proje yüklenirken hata oluştu:", error);
    }

    if (!project) {
        notFound();
    }

    return (
        <div>
            <div className="flex items-center gap-4 mb-6">
                <Link href="/admin/projeler" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft size={24} className="text-gray-500" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Projeyi Düzenle</h1>
                    <p className="text-gray-500 text-sm">"{project.title}" projesini düzenliyorsunuz.</p>
                </div>
            </div>

            <ProjectForm initialData={project} isEdit />
        </div>
    );
}
