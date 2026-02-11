import Link from "next/link";
import { getProjects } from "@/lib/db";
import { Plus, Pencil, Trash2, MapPin, Calendar } from "lucide-react";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
    let projects = [];
    try {
        projects = await getProjects() || [];
    } catch (error) {
        console.error("Projeler yüklenirken hata oluştu:", error);
        projects = [];
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Projeler</h1>
                    <p className="text-gray-500 mt-1">Toplam {projects.length} proje listeleniyor.</p>
                </div>
                <Link href="/admin/projeler/yeni" className="btn btn-primary flex items-center gap-2">
                    <Plus size={18} />
                    Yeni Proje Ekle
                </Link>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Proje Adı</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Kategori</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Lokasyon</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Durum</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-sm text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {(projects ?? []).map((project: any) => (
                            <tr key={project.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 shrink-0">
                                            {(() => {
                                                const rawCover = project.coverImage;
                                                const normalizedCover = rawCover ? rawCover.replace(/^public\//i, "") : rawCover;
                                                const finalCover = normalizedCover && !normalizedCover.startsWith("http") && !normalizedCover.startsWith("/")
                                                    ? "/" + normalizedCover
                                                    : normalizedCover;
                                                return <img src={finalCover ? encodeURI(finalCover) : "https://placehold.co/600x400?text=No+Image"} alt="" className="w-full h-full object-cover" />;
                                            })()}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">{project.title}</div>
                                            <div className="text-xs text-gray-500">{project.year}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                        {project.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600 text-sm">
                                    <div className="flex items-center gap-1.5">
                                        <MapPin size={14} className="text-gray-400" />
                                        {project.location}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${project.status === "Tamamlandı"
                                        ? "bg-green-50 text-green-700"
                                        : "bg-yellow-50 text-yellow-700"
                                        }`}>
                                        {project.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/admin/projeler/${project.id}`} className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-md transition-colors">
                                            <Pencil size={18} />
                                        </Link>
                                        <DeleteProjectButton id={project.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {projects.length === 0 && (
                    <div className="p-12 text-center text-gray-500">
                        Henüz hiç proje eklenmemiş.
                    </div>
                )}
            </div>
        </div>
    );
}
