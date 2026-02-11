"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addProject, updateProject } from "@/actions/admin";
import { Loader2, Plus, X } from "lucide-react";
import { toast } from "sonner";
import FileUpload from "@/components/admin/FileUpload";

interface ProjectFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function ProjectForm({ initialData, isEdit = false }: ProjectFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Basic Form State (For a real production app, use react-hook-form + zod)
    const [formData, setFormData] = useState(() => {
        const defaults = {
            title: "",
            category: "celik-villa",
            type: "",
            location: "Konya",
            year: new Date().getFullYear().toString(),
            size: "",
            status: "Tamamlandı",
            client: "",
            coverImage: "",
            description: "",
            gallery: [],
            features: [],
            virtualTourUrl: "",
            seoTitle: "",
            seoDescription: "",
            keywords: ""
        };

        if (!initialData) return defaults;

        return {
            ...defaults,
            ...initialData,
            gallery: initialData.gallery ?? [],
            features: initialData.features ?? []
        };
    });

    const [featureInput, setFeatureInput] = useState("");

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleAddFeature = () => {
        if (!featureInput.trim()) return;
        setFormData((prev: any) => ({ ...prev, features: [...prev.features, featureInput] }));
        setFeatureInput("");
    };

    const removeFeature = (index: number) => {
        setFormData((prev: any) => ({
            ...prev,
            features: prev.features.filter((_: any, i: number) => i !== index)
        }));
    };

    const removeGalleryImage = (index: number) => {
        setFormData((prev: any) => ({
            ...prev,
            gallery: prev.gallery.filter((_: any, i: number) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let result;
            if (isEdit) {
                result = await updateProject(initialData.id, formData);
            } else {
                result = await addProject(formData);
            }

            if (result.success) {
                toast.success(result.message);
                router.push("/admin/projeler");
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
                <h2 className="font-semibold text-lg text-gray-900 border-b pb-2">Temel Bilgiler</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Proje Adı</label>
                        <input required name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent outline-none" placeholder="Örn: Yılmazlar Villası" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Kategori (URL Slug)</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent outline-none">
                            <option value="celik-villa">Çelik Villa</option>
                            <option value="betonarme">Betonarme</option>
                            <option value="ticari">Ticari</option>
                            <option value="tas-kaplama">Taş Kaplama</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Tip (Görünen Başlık)</label>
                        <input required name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md outline-none" placeholder="Örn: Çelik Villa" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Lokasyon</label>
                        <input required name="location" value={formData.location} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md outline-none" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Yıl</label>
                        <input required name="year" value={formData.year} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md outline-none" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Metrekare</label>
                        <input required name="size" value={formData.size} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md outline-none" placeholder="Örn: 150 m²" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Durum</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md outline-none">
                            <option value="Tamamlandı">Tamamlandı</option>
                            <option value="Devam Ediyor">Devam Ediyor</option>
                            <option value="Proje Aşamasında">Proje Aşamasında</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Müşteri (Opsiyonel)</label>
                        <input name="client" value={formData.client || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md outline-none" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Açıklama</label>
                    <textarea required rows={4} name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md outline-none resize-none" placeholder="Proje hakkında detaylı bilgi..." />
                </div>
            </div>

            {/* Media */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
                <h2 className="font-semibold text-lg text-gray-900 border-b pb-2">Görseller & Medya</h2>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Kapak Fotoğrafı</label>
                    <FileUpload
                        value={formData.coverImage}
                        onChange={(url) => setFormData((prev: any) => ({ ...prev, coverImage: url }))}
                        label="Kapak Fotoğrafı Yükle"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Sanal Tur URL (360° Fotoğraf Linki)</label>
                    <input name="virtualTourUrl" value={formData.virtualTourUrl || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md outline-none" placeholder="https://..." />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Galeri Görselleri</label>

                    {/* Existing Gallery Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {(formData.gallery ?? []).map((img: string, i: number) => (
                            <div key={i} className="relative group">
                                <FileUpload
                                    value={img}
                                    onChange={() => { }} // Read-only view for existing, or modify if needed. Ideally FileUpload handles replace but here we just want display/remove
                                    onRemove={() => removeGalleryImage(i)}
                                    className="h-full"
                                />
                            </div>
                        ))}

                        {/* New Upload Button */}
                        <FileUpload
                            onChange={(url) => setFormData((prev: any) => ({ ...prev, gallery: [...prev.gallery, url] }))}
                            label="Galeriye Ekle"
                            className="h-full min-h-[150px]"
                        />
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
                <h2 className="font-semibold text-lg text-gray-900 border-b pb-2">Özellikler</h2>

                <div className="flex gap-2 mb-2">
                    <input value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} className="flex-1 p-2 border border-gray-300 rounded-md outline-none" placeholder="Özellik ekle (Örn: Yerden Isıtma)..." />
                    <button type="button" onClick={handleAddFeature} className="btn btn-secondary px-4">Ekle</button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {(formData.features ?? []).map((feature: string, i: number) => (
                        <div key={i} className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                            {feature}
                            <button type="button" onClick={() => removeFeature(i)} className="text-gray-400 hover:text-red-500">
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
                <h2 className="font-semibold text-lg text-gray-900 border-b pb-2">SEO Ayarları (Google)</h2>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">SEO Başlığı (Meta Title)</label>
                    <div className="flex gap-2 text-xs text-gray-500 mb-1">
                        <span>Önerilen: 50-60 karakter</span>
                        <span className={formData.seoTitle?.length > 60 ? "text-red-500" : "text-green-600"}>{formData.seoTitle?.length || 0} / 60</span>
                    </div>
                    <input name="seoTitle" value={formData.seoTitle || ""} onChange={handleChange} placeholder="Örn: Modern Çelik Villa Projesi | MCT İnşaat" className="w-full p-2 border border-gray-300 rounded-md outline-none" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">SEO Açıklaması (Meta Description)</label>
                    <div className="flex gap-2 text-xs text-gray-500 mb-1">
                        <span>Önerilen: 150-160 karakter</span>
                        <span className={formData.seoDescription?.length > 160 ? "text-red-500" : "text-green-600"}>{formData.seoDescription?.length || 0} / 160</span>
                    </div>
                    <textarea rows={3} name="seoDescription" value={formData.seoDescription || ""} onChange={handleChange} placeholder="Bu proje Google sonuçlarında nasıl görünsün?" className="w-full p-2 border border-gray-300 rounded-md outline-none resize-none" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Anahtar Kelimeler (Keywords)</label>
                    <input name="keywords" value={formData.keywords || ""} onChange={handleChange} placeholder="çelik villa, ankara, inşaat..." className="w-full p-2 border border-gray-300 rounded-md outline-none" />
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={() => router.back()} className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                    İptal
                </button>
                <button type="submit" disabled={loading} className="btn btn-primary px-8 flex items-center gap-2">
                    {loading && <Loader2 size={16} className="animate-spin" />}
                    {isEdit ? "Değişiklikleri Kaydet" : "Projeyi Oluştur"}
                </button>
            </div>
        </form>
    );
}
