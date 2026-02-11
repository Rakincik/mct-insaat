import ServiceForm from "@/components/admin/ServiceForm";
import { getServices } from "@/lib/db";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditServicePage({ params }: { params: { id: string } }) {
    const services = await getServices();
    const service = services.find((s: any) => s.id === params.id);

    if (!service) {
        notFound();
    }

    return (
        <div>
            <div className="flex items-center gap-4 mb-6">
                <Link href="/admin/hizmetler" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft size={24} className="text-gray-500" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Hizmeti Düzenle</h1>
                    <p className="text-gray-500 text-sm">"{service.title}" hizmetini düzenliyorsunuz.</p>
                </div>
            </div>

            <ServiceForm initialData={service} />
        </div>
    );
}
