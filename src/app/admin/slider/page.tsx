import Link from "next/link";
import { getSlides } from "@/lib/db";
import { Plus, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import DeleteSlideButton from "@/components/admin/DeleteSlideButton";

export const dynamic = "force-dynamic";

export default async function AdminSlidersPage() {
    const slides = await getSlides();

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Slider Yönetimi</h1>
                    <p className="text-gray-500 mt-1">Ana sayfa manşet alanını yönetin.</p>
                </div>
                <Link href="/admin/slider/yeni" className="btn btn-primary flex items-center gap-2">
                    <Plus size={18} />
                    Yeni Slide Ekle
                </Link>
            </div>

            <div className="grid gap-6">
                {slides.map((slide: any) => (
                    <div key={slide.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center gap-6">
                        <div className="w-48 aspect-video bg-gray-100 rounded-md overflow-hidden relative shrink-0">
                            <img src={slide.image} alt="" className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-900">{slide.title}</h3>
                            <p className="text-accent text-sm font-medium mb-1">{slide.subtitle}</p>
                            <p className="text-gray-500 text-sm line-clamp-1">{slide.description}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <Link href={`/admin/slider/${slide.id}`} className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-md transition-colors">
                                <Pencil size={18} />
                            </Link>
                            <DeleteSlideButton id={slide.id} />
                        </div>
                    </div>
                ))}

                {slides.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-lg text-gray-400">
                        Henüz hiç slider eklenmemiş.
                    </div>
                )}
            </div>
        </div>
    );
}
