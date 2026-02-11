import Link from "next/link";
import { getServices } from "@/lib/db";
import { Plus, Pencil, Layers, Trash2 } from "lucide-react";
import DeleteServiceButton from "@/components/admin/DeleteServiceButton";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
    const services = await getServices();

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Hizmetler</h1>
                    <p className="text-gray-500 mt-1">Toplam {services.length} hizmet listeleniyor.</p>
                </div>
                <Link href="/admin/hizmetler/yeni" className="btn btn-primary flex items-center gap-2">
                    <Plus size={18} />
                    Yeni Hizmet Ekle
                </Link>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Hizmet Adı</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Kısa Açıklama</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-sm text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {services.map((service: any) => (
                            <tr key={service.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center">
                                            {service.coverImage ? (
                                                <img src={service.coverImage} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <Layers className="text-gray-400" />
                                            )}
                                        </div>
                                        <div className="font-medium text-gray-900">{service.title}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600 text-sm max-w-sm truncate">
                                    {service.shortDescription}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/admin/hizmetler/${service.id || service._id}`} className="btn btn-secondary text-xs px-3 py-1.5 flex items-center gap-2">
                                            <Pencil size={14} />
                                            Düzenle
                                        </Link>
                                        <DeleteServiceButton id={service.id || service._id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
