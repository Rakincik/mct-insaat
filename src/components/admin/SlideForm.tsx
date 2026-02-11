"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { addSlide, updateSlide } from "@/actions/admin";
import { Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { uploadFile } from "@/actions/upload";

export default function SlideForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState(initialData || {
        title: "",
        subtitle: "",
        description: "",
        image: "",
        video: ""
    });

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setUploading(true);
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);
        uploadFormData.append("folder", "slider"); // Organize in slider folder

        try {
            const result = await uploadFile(uploadFormData);
            if (result.success) {
                setFormData((prev: any) => ({ ...prev, image: result.url }));
                toast.success("Görsel yüklendi");
            } else {
                toast.error(result.message || "Yükleme başarısız");
            }
        } catch (error) {
            toast.error("Yükleme sırasında hata oluştu");
        } finally {
            setUploading(false);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp']
        },
        maxFiles: 1,
        multiple: false
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let result;
            if (initialData?.id) {
                result = await updateSlide(initialData.id, formData);
            } else {
                result = await addSlide(formData);
            }

            if (result.success) {
                toast.success(result.message);
                router.push("/admin/slider");
                router.refresh();
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Ana Başlık (Büyük)</label>
                    <input required name="title" value={formData.title} onChange={handleChange} placeholder="Örn: GÜVEN" className="w-full p-2 border border-gray-300 rounded-md outline-none" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Alt Başlık (Renkli)</label>
                    <input required name="subtitle" value={formData.subtitle} onChange={handleChange} placeholder="Örn: İNŞAA EDİYORUZ" className="w-full p-2 border border-gray-300 rounded-md outline-none" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Açıklama</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full p-2 border border-gray-300 rounded-md outline-none resize-none" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Görsel</label>

                    {!formData.image ? (
                        <div
                            {...getRootProps()}
                            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                                ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'}`}
                        >
                            <input {...getInputProps()} />
                            {uploading ? (
                                <div className="flex flex-col items-center gap-2 text-gray-500">
                                    <Loader2 className="animate-spin" />
                                    <span>Yükleniyor...</span>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-gray-500">
                                    <Upload size={32} />
                                    <p className="font-medium">Görseli buraya sürükleyin veya tıklayın</p>
                                    <p className="text-xs text-gray-400">Önerilen boyut: 1920x1080px</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="relative aspect-video bg-gray-100 rounded-md overflow-hidden group">
                            <img src={formData.image} className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => setFormData((prev: any) => ({ ...prev, image: "" }))}
                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Video URL (İsteğe bağlı mp4)</label>
                    <input name="video" value={formData.video} onChange={handleChange} placeholder="https://...mp4" className="w-full p-2 border border-gray-300 rounded-md outline-none" />
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <button type="button" onClick={() => router.back()} className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                    İptal
                </button>
                <button type="submit" disabled={loading || uploading} className="btn btn-primary px-8 flex items-center gap-2">
                    {loading && <Loader2 size={16} className="animate-spin" />}
                    {initialData ? "Güncelle" : "Ekle"}
                </button>
            </div>
        </form>
    );
}
