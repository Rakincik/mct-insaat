import Link from "next/link";
import { getBlogPosts } from "@/lib/db";
import { Plus, Pencil, FileText, Trash2, Calendar } from "lucide-react";
import { deleteBlogPost } from "@/actions/admin";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
    const posts = await getBlogPosts();

    async function handleDelete(id: string) {
        "use server";
        if (id) {
            await deleteBlogPost(id);
            revalidatePath("/admin/mct-kosesi");
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">MCT Köşesi (Blog)</h1>
                    <p className="text-gray-500 mt-1">Haberleri, makaleleri ve duyuruları yönetin.</p>
                </div>
                <Link href="/admin/mct-kosesi/yeni" className="btn btn-primary flex items-center gap-2">
                    <Plus size={18} />
                    Yeni Yazı Ekle
                </Link>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Görsel</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Başlık</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Kategori</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Yayınlanma Tarihi</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-sm text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    Henüz hiç yazı eklenmemiş.
                                </td>
                            </tr>
                        ) : (
                            posts.map((post: any) => (
                                <tr key={post.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 w-24">
                                        <div className="w-16 h-12 rounded bg-gray-100 overflow-hidden flex items-center justify-center">
                                            {post.coverImage ? (
                                                <img src={post.coverImage} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <FileText className="text-gray-400" size={20} />
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 max-w-xs truncate">
                                        {post.title}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 text-sm">
                                        <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                                            {post.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} />
                                            {new Date(post.publishedAt).toLocaleDateString('tr-TR')}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/mct-kosesi/${post.id}`} className="btn btn-secondary text-xs px-3 py-1.5 flex items-center gap-2">
                                                <Pencil size={14} />
                                                Düzenle
                                            </Link>

                                            <form action={handleDelete.bind(null, post.id)}>
                                                <button className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors" title="Sil">
                                                    <Trash2 size={16} />
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
