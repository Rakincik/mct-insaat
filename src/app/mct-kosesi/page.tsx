import Link from "next/link";
import { getBlogPosts } from "@/lib/db";
import PageHeader from "@/components/layout/PageHeader";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "MCT Köşesi | İnşaat Rehberi ve Blog",
    description: "MCT İnşaat'tan güncel haberler, sektör analizleri ve inşaat rehberleri. MCT Köşesi'nde buluşalım.",
};

export default async function BlogPage() {
    const rawPosts = await getBlogPosts();
    const posts = Array.isArray(rawPosts) ? rawPosts : [];

    return (
        <>
            <PageHeader
                title="MCT Köşesi"
                description="İnşaat dünyasından haberler, rehberler ve uzman görüşleri"
                backgroundImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
            />

            <section className="section bg-white">
                <div className="container">
                    {/* Featured Post */}
                    {posts.length > 0 && posts[0] && (
                        <Link href={`/mct-kosesi/${posts[0].slug}`} className="block mb-16 group">
                            <div className="grid lg:grid-cols-2 gap-8 items-center">
                                <div className="aspect-video rounded-lg overflow-hidden bg-neutral-100">
                                    <img
                                        src={posts[0].coverImage || "/placeholder-blog.jpg"}
                                        alt={posts[0].title || "Blog Yazısı"}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div>
                                    <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                                        {posts[0].category || "Genel"}
                                    </span>
                                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mt-2 mb-4 group-hover:text-accent transition-colors">
                                        {posts[0].title}
                                    </h2>
                                    <p className="text-neutral-600 text-lg mb-6">
                                        {posts[0].excerpt}
                                    </p>
                                    <div className="flex items-center gap-6 text-sm text-neutral-500">
                                        <span className="flex items-center gap-2">
                                            <Calendar size={16} />
                                            {posts[0].publishedAt ? new Date(posts[0].publishedAt).toLocaleDateString('tr-TR') : "Yakında"}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Clock size={16} />
                                            {posts[0].readTime || "5 dk"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )}

                    {posts.length === 0 && (
                        <div className="text-center py-20">
                            <h3 className="text-2xl font-bold text-neutral-400">Henüz bir yazı paylaşılmadı.</h3>
                        </div>
                    )}

                    {/* Posts Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.slice(1).map((post: any) => (
                            <Link
                                key={post.id || post._id}
                                href={`/mct-kosesi/${post.slug}`}
                                className="group"
                            >
                                <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="aspect-video overflow-hidden bg-neutral-100">
                                        <img
                                            src={post.coverImage || "/placeholder-blog.jpg"}
                                            alt={post.title || "Blog Yazısı"}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <span className="text-accent font-semibold text-xs uppercase tracking-wider">
                                            {post.category || "Genel"}
                                        </span>
                                        <h3 className="font-heading text-lg font-bold text-primary mt-2 mb-3 group-hover:text-accent transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-neutral-600 text-sm line-clamp-2 mb-4">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between text-xs text-neutral-500">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={14} />
                                                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('tr-TR') : "Yakında"}
                                            </span>
                                            <span className="flex items-center gap-1 text-accent font-medium group-hover:gap-2 transition-all">
                                                Oku <ArrowRight size={14} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
