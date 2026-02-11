import ServiceForm from "@/components/admin/ServiceForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewServicePage() {
    return (
        <div>
            <div className="flex items-center gap-4 mb-6">
                <Link href="/admin/hizmetler" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft size={24} className="text-gray-500" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Yeni Hizmet Ekle</h1>
                    <p className="text-gray-500 text-sm">Sitede gösterilecek yeni bir hizmet ekleyin.</p>
                </div>
            </div>

            <ServiceForm />
        </div>
    );
}
