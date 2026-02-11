"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addService, updateService } from "@/actions/admin";
import { Loader2, X, Plus } from "lucide-react";
import { toast } from "sonner";

interface ServiceFormProps {
    initialData?: any;
}

const defaultFormData = {
    title: "",
    shortDescription: "",
    fullDescription: "",
    iconName: "Home",
    coverImage: "",
    gallery: [],
    features: [],
    seoTitle: "",
    seoDescription: "",
};

export default function ServiceForm({ initialData }: ServiceFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const isEditing = !!initialData;

    const [formData, setFormData] = useState(initialData || defaultFormData);
    const [featureInput, setFeatureInput] = useState("");
    const [galleryInput, setGalleryInput] = useState("");

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleAddFeature = () => {
        if (!featureInput.trim()) return;
        setFormData((prev: any) => ({ ...prev, features: [...(prev.features || []), featureInput] }));
        setFeatureInput("");
    };

    const removeFeature = (index: number) => {
        setFormData((prev: any) => ({
            ...prev,
            features: (prev.features || []).filter((_: any, i: number) => i !== index)
        }));
    };

    const handleAddGalleryImage = () => {
        if (!galleryInput.trim()) return;
        setFormData((prev: any) => ({ ...prev, gallery: [...(prev.gallery || []), galleryInput] }));
        setGalleryInput("");
    };

    const removeGalleryImage = (index: number) => {
        setFormData((prev: any) => ({
            ...prev,
            gallery: (prev.gallery || []).filter((_: any, i: number) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let result;
            if (isEditing) {
                result = await updateService(initialData.id || initialData._id, formData);
            } else {
                result = await addService(formData);
            }

            if (result.success) {
                toast.success(result.message);
                router.push("/admin/hizmetler");
                router.refresh();
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Bir hata oluştu.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">

            {/* Basic Info */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
                <h2 className="font-semibold text-lg text-gray-900 border-b pb-2">Hizmet Detayları</h2>

                <div className="grid md:grid-cols-1 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Hizmet Başlığı</label>
                        <input required name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent outline-none" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Kısa Açıklama (Listede görünür)</label>
                        <textarea rows={2} name="shortDescription" value={formData.shortDescription} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md outline-none resize-none" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Tam Açıklama (Detay sayfasında görünür)</label>
                        <textarea required rows={6} name="fullDescription" value={formData.fullDescription} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md outline-none resize-none" />
                    </div>
                </div>
            </div>

            {/* Media */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
                <h2 className="font-semibold text-lg text-gray-900 border-b pb-2">Görseller</h2>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Kapak Fotoğrafı URL</label>
                    <div className="flex gap-2">
                        <input required name="coverImage" value={formData.coverImage} onChange={handleChange} className="flex-1 p-2 border border-gray-300 rounded-md outline-none" placeholder="https://..." />
                    </div>
                    {formData.coverImage && (
                        <div className="mt-2 w-full h-48 bg-gray-100 rounded-md overflow-hidden relative">
                            <img src={formData.coverImage} alt="Kapak" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Galeri / Uygulama Örnekleri</label>
                    <div className="flex gap-2 mb-2">
                        <input value={galleryInput} onChange={(e) => setGalleryInput(e.target.value)} className="flex-1 p-2 border border-gray-300 rounded-md outline-none" placeholder="Görsel URL ekle..." />
                        <button type="button" onClick={handleAddGalleryImage} className="btn btn-secondary px-4">Ekle</button>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {(formData.gallery ?? []).map((img: string, i: number) => (
                            <div key={i} className="aspect-square relative group rounded-md overflow-hidden">
                                <img src={img} alt="" className="w-full h-full object-cover" />
                                <button type="button" onClick={() => removeGalleryImage(i)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    <X size={12} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
                <h2 className="font-semibold text-lg text-gray-900 border-b pb-2">Özellikler Listesi</h2>

                <div className="flex gap-2 mb-2">
                    <input value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} className="flex-1 p-2 border border-gray-300 rounded-md outline-none" placeholder="Özellik ekle..." />
                    <button type="button" onClick={handleAddFeature} className="btn btn-secondary px-4">Ekle</button>
                </div>
                <div className="flex flex-col gap-2">
                    {(formData.features ?? []).map((feature: string, i: number) => (
                        <div key={i} className="flex items-center justify-between bg-gray-50 text-gray-700 px-4 py-2 rounded-md border border-gray-100">
                            <span>{feature}</span>
                            <button type="button" onClick={() => removeFeature(i)} className="text-gray-400 hover:text-red-500">
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
                <h2 className="font-semibold text-lg text-gray-900 border-b pb-2">SEO Ayarları (Google)</h2>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">SEO Başlığı</label>
                    <input name="seoTitle" value={formData.seoTitle || ""} onChange={handleChange} placeholder="Google'da görünecek başlık" className="w-full p-2 border border-gray-300 rounded-md outline-none" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">SEO Açıklaması</label>
                    <textarea rows={3} name="seoDescription" value={formData.seoDescription || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md outline-none resize-none" />
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={() => router.back()} className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                    İptal
                </button>
                <button type="submit" disabled={loading} className="btn btn-primary px-8 flex items-center gap-2">
                    {loading && <Loader2 size={16} className="animate-spin" />}
                    {isEditing ? "Değişiklikleri Kaydet" : "Hizmet Ekle"}
                </button>
            </div>
        </form>
    );
}
