import SlideForm from "@/components/admin/SlideForm";
import { getSlides } from "@/lib/db";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditSlidePage({ params }: { params: { id: string } }) {
    const slides = await getSlides();
    const slide = slides.find((s: any) => s.id === params.id);

    if (!slide) {
        notFound();
    }

    return (
        <div>
            <div className="flex items-center gap-4 mb-6">
                <Link href="/admin/slider" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ChevronLeft size={24} className="text-gray-500" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Slide Düzenle</h1>
                    <p className="text-gray-500 text-sm">Görsel veya metinleri güncelleyin.</p>
                </div>
            </div>

            <SlideForm initialData={slide} />
        </div>
    );
}
