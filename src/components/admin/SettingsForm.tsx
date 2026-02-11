"use client";

import { useState } from "react";
import { updateSettings } from "@/actions/admin";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import FileUpload from "@/components/admin/FileUpload";
import { useRouter } from "next/navigation";

export default function SettingsForm({ initialData }: { initialData: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await updateSettings(formData);
            if (result.success) {
                toast.success(result.message);
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
        <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">

            {/* General Settings (Logo) */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
                <h2 className="font-semibold text-lg text-gray-900 border-b pb-2">Genel Görünüm</h2>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Site Logosu</label>
                    <div className="flex gap-4 items-start">
                        <div className="flex-1">
                            <FileUpload
                                value={formData.logo}
                                onChange={(url) => setFormData((prev: any) => ({ ...prev, logo: url }))}
                                label="Logo Yükle"
                                className="h-40"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                Önerilen: PNG veya SVG formatı, şeffaf arka plan. PDF yüklemeyiniz.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
                <h2 className="font-semibold text-lg text-gray-900 border-b pb-2">İletişim Bilgileri</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Telefon Numarası</label>
                        <input name="phone" value={formData.phone || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md outline-none" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">E-Posta Adresi</label>
                        <input name="email" value={formData.email || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md outline-none" />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-gray-700">Adres</label>
                        <input name="address" value={formData.address || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md outline-none" />
                    </div>
                </div>
            </div>

            {/* Social Media */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
                <h2 className="font-semibold text-lg text-gray-900 border-b pb-2">Sosyal Medya</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Instagram URL</label>
                        <input name="instagram" value={formData.instagram || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md outline-none" placeholder="https://instagram.com/..." />
                    </div>
                </div>
            </div>

            {/* Developer Credits */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
                <h2 className="font-semibold text-lg text-gray-900 border-b pb-2">Geliştirici Bilgileri</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Geliştirici Logo</label>
                        <FileUpload
                            folder="settings"
                            onChange={(url: string | string[]) => setFormData((prev: any) => ({ ...prev, developerLogo: url as string }))}
                            value={formData.developerLogo}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Geliştirici Linki</label>
                        <input name="developerUrl" value={formData.developerUrl || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md outline-none" placeholder="https://..." />
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
                <h2 className="font-semibold text-lg text-gray-900 border-b pb-2">Ana Sayfa (Hero)</h2>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Büyük Başlık</label>
                    <input name="heroTitle" value={formData.heroTitle || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md outline-none" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Alt Açıklama</label>
                    <textarea rows={3} name="heroDescription" value={formData.heroDescription || ""} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md outline-none resize-none" />
                </div>
            </div>

            <div className="flex justify-end">
                <button type="submit" disabled={loading} className="btn btn-primary px-8 flex items-center gap-2">
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={18} />}
                    Ayarları Kaydet
                </button>
            </div>
        </form>
    );
}
