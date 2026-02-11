import ProjectForm from "@/components/admin/ProjectForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewProjectPage() {
    return (
        <div>
            <div className="flex items-center gap-4 mb-6">
                <Link href="/admin/projeler" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft size={24} className="text-gray-500" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Yeni Proje Ekle</h1>
                    <p className="text-gray-500 text-sm">Portfolyoya yeni bir inşaat projesi ekleyin.</p>
                </div>
            </div>

            <ProjectForm />
        </div>
    );
}
