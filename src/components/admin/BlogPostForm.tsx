"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import FileUpload from "@/components/admin/FileUpload";
import Link from "next/link";
import { addBlogPost, updateBlogPost } from "@/actions/admin";

interface BlogPostFormProps {
    initialData?: any;
}

export default function BlogPostForm({ initialData }: BlogPostFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        category: initialData?.category || "Genel",
        excerpt: initialData?.excerpt || "",
        content: initialData?.content || "",
        coverImage: initialData?.coverImage || "",
        videoUrl: initialData?.videoUrl || "",
        author: initialData?.author || "MCT İnşaat",
        keywords: initialData?.keywords || "",
        readTime: initialData?.readTime || "5 dk"
    });

    const categories = [
        "Haberler",
        "Rehberler",
        "Sektör Analizi",
        "Proje Duyuruları",
        "Teknoloji",
        "Genel"
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let res;
            if (initialData) {
                res = await updateBlogPost(initialData.id, formData);
            } else {
                res = await addBlogPost(formData);
            }

            if (res.success) {
                toast.success(res.message);
                router.push("/admin/mct-kosesi");
                router.refresh();
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Bir hata oluştu.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex items-center justify-between">
                <Link
                    href="/admin/mct-kosesi"
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span>Listeye Dön</span>
                </Link>
                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary min-w-[150px] flex justify-center"
                >
                    {loading ? <Loader2 className="animate-spin" /> : (
                        <div className="flex items-center gap-2">
                            <Save size={18} />
                            <span>{initialData ? "Güncelle" : "Yayınla"}</span>
                        </div>
                    )}
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Yazı Başlığı
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full h-12 px-4 rounded-lg border border-gray-200 focus:border-primary focus:ring-0 transition-colors text-lg font-medium"
                                placeholder="Örn: 2024 Konut İnşaat Maliyetleri"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Özet (Kısa Açıklama)
                            </label>
                            <textarea
                                required
                                value={formData.excerpt}
                                onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                className="w-full h-24 p-4 rounded-lg border border-gray-200 focus:border-primary focus:ring-0 transition-colors resize-none"
                                placeholder="Listeleme sayfasında görünecek kısa açıklama..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                İçerik
                            </label>
                            <div className="text-xs text-gray-500 mb-2">
                                İpucu: **Kalın**, ## Başlık 2, ### Başlık 3 formatlarını kullanabilirsiniz. HTML destekler.
                            </div>
                            <textarea
                                required
                                value={formData.content}
                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                                className="w-full min-h-[500px] p-4 rounded-lg border border-gray-200 focus:border-primary focus:ring-0 transition-colors font-mono text-sm leading-relaxed"
                                placeholder="Yazı içeriği buraya..."
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
                        <h3 className="font-semibold text-gray-900 border-b pb-4">Yazı Ayarları</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Video (Opsiyonel)
                            </label>
                            <FileUpload
                                folder="blog-videos"
                                accept="video/*"
                                value={formData.videoUrl}
                                onChange={(url) => setFormData({ ...formData, videoUrl: typeof url === 'string' ? url : url[0] })}
                                label="Video Yükle"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Desteklenen formatlar: MP4, WEBM. Maksimum 100MB.
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Kapak Görseli
                            </label>
                            <FileUpload
                                folder="blog"
                                value={formData.coverImage}
                                onChange={(url) => setFormData({ ...formData, coverImage: typeof url === 'string' ? url : url[0] })}
                                label="Görsel Yükle"
                            />
                            {formData.coverImage && (
                                <div className="mt-4 aspect-video rounded-lg overflow-hidden border border-gray-200">
                                    <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Kategori
                            </label>
                            <select
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-0 transition-colors"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Yazar
                            </label>
                            <input
                                type="text"
                                value={formData.author}
                                onChange={e => setFormData({ ...formData, author: e.target.value })}
                                className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-0 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tahmini Okuma Süresi
                            </label>
                            <input
                                type="text"
                                value={formData.readTime}
                                onChange={e => setFormData({ ...formData, readTime: e.target.value })}
                                className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-0 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Anahtar Kelimeler (SEO)
                            </label>
                            <textarea
                                value={formData.keywords}
                                onChange={e => setFormData({ ...formData, keywords: e.target.value })}
                                className="w-full h-24 p-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-0 transition-colors text-sm"
                                placeholder="Virgülle ayırarak yazın..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
