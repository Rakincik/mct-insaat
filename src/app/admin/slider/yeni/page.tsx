import SlideForm from "@/components/admin/SlideForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewSlidePage() {
    return (
        <div>
            <div className="flex items-center gap-4 mb-6">
                <Link href="/admin/slider" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft size={24} className="text-gray-500" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Yeni Slide Ekle</h1>
                    <p className="text-gray-500 text-sm">Ana sayfaya yeni bir manşet ekleyin.</p>
                </div>
            </div>

            <SlideForm />
        </div>
    );
}
