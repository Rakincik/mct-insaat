"use client";

import { useState } from "react";
import { Plus, Trash2, Video } from "lucide-react";
import { toast } from "sonner";
import { addReel, deleteReel } from "@/actions/admin";
import FileUpload from "@/components/admin/FileUpload";
import { getReels } from "@/lib/db";
import { useRouter } from "next/navigation";

export default function AdminReelsPage({ initialData }: { initialData?: any[] }) {
    const [reels, setReels] = useState<any[]>(initialData || []);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleAddReel = async (url: string | string[]) => {
        if (!url) return;

        // Handle both single and multiple uploads if necessary, though FileUpload usually returns string for single
        const videoUrl = Array.isArray(url) ? url[0] : url;

        setLoading(true);
        try {
            const res = await addReel({
                videoUrl,
                type: "video",
                title: "Reel Video"
            });

            if (res.success) {
                toast.success("Video eklendi");
                router.refresh(); // Refresh to get updated list
                // Optimistic update could go here but refresh is safer for ID sync
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Bir hata oluştu");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu videoyu silmek istediğinize emin misiniz?")) return;

        try {
            const res = await deleteReel(id);
            if (res.success) {
                toast.success("Video silindi");
                setReels(reels.filter(r => r.id !== id));
                router.refresh();
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Silme işlemi başarısız");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Reels / Videolar</h1>
            </div>

            {/* Upload Area */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Yeni Video Ekle</h2>
                <div className="max-w-xl">
                    <FileUpload
                        folder="reels"
                        accept="video/mp4,video/webm"
                        onChange={handleAddReel}
                        label="Video Yükle veya Sürükle (MP4)"
                    />
                </div>
            </div>

            {/* List Area */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {(reels ?? []).map((reel) => (
                    <div key={reel.id} className="group relative bg-black rounded-lg overflow-hidden aspect-[9/16] shadow-md hover:shadow-xl transition-all">
                        <video
                            src={reel.videoUrl}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            muted
                            loop
                            onMouseOver={e => (e.target as HTMLVideoElement).play()}
                            onMouseOut={e => (e.target as HTMLVideoElement).pause()}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                        <button
                            onClick={() => handleDelete(reel.id)}
                            className="absolute top-2 right-2 p-2 bg-red-500/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                            <Trash2 size={16} />
                        </button>

                        <div className="absolute bottom-3 left-3 text-white">
                            <Video size={16} className="mb-1" />
                            <span className="text-xs opacity-75">Reel Video</span>
                        </div>
                    </div>
                ))}
            </div>

            {reels.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    Henüz hiç video yüklenmemiş.
                </div>
            )}
        </div>
    );
}
