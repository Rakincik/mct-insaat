import { getBlogPosts } from "@/lib/db";
import PageHeader from "@/components/layout/PageHeader";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const posts = await getBlogPosts();
    const post = posts.find((p: any) => p.slug === params.slug);

    if (!post) return { title: "Yazı Bulunamadı" };

    return {
        title: post.seoTitle || post.title,
        description: post.seoDescription || post.excerpt,
        keywords: post.keywords,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [post.coverImage],
            type: "article",
            publishedTime: post.publishedAt,
            authors: [post.author],
        },
    };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const posts = await getBlogPosts();
    const post = posts.find((p: any) => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    // Related posts (same category, excluding current)
    const relatedPosts = Array.isArray(posts)
        ? posts
            .filter((p: any) => p.category === post.category && (p.id !== post.id && p._id !== post.id))
            .slice(0, 3)
        : [];

    return (
        <>
            <PageHeader
                title={post.title}
                description={post.category}
                backgroundImage={post.coverImage}
                parentPage={{ label: "MCT Köşesi", href: "/mct-kosesi" }}
            />

            <article className="section bg-white">
                <div className="container">
                    <div className="max-w-3xl mx-auto">
                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500 mb-10 pb-6 border-b border-neutral-200">
                            <span className="flex items-center gap-2">
                                <User size={16} />
                                {post.author || "MCT İnşaat"}
                            </span>
                            <span className="flex items-center gap-2">
                                <Calendar size={16} />
                                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('tr-TR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }) : "Yakında"}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock size={16} />
                                {post.readTime || "5 dk"} okuma
                            </span>
                        </div>

                        {/* Video Player */}
                        {post.videoUrl && (
                            <div className="mb-10 rounded-xl overflow-hidden shadow-lg bg-black">
                                <video
                                    controls
                                    className="w-full aspect-video"
                                    preload="metadata"
                                >
                                    <source src={post.videoUrl} type="video/mp4" />
                                    Tarayıcınız video etiketini desteklemiyor.
                                </video>
                            </div>
                        )}

                        {/* Content */}
                        <div
                            className="prose prose-lg prose-neutral max-w-none prose-headings:font-heading prose-headings:text-primary prose-a:text-accent prose-strong:text-primary"
                            dangerouslySetInnerHTML={{
                                __html: (post.content || "")
                                    .replace(/\\n/g, '\n') // Normalize escaped newlines
                                    .replace(/\n/g, '<br/>') // Convert to HTML breaks
                                    .replace(/### (.*?)(<br\/>|$)/g, '<h3 class="text-xl font-bold mt-8 mb-3 text-primary">$1</h3>') // Headings 3
                                    .replace(/## (.*?)(<br\/>|$)/g, '<h2 class="text-2xl font-bold mt-10 mb-4 text-primary">$1</h2>') // Headings 2
                                    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-primary">$1</strong>') // Bold
                                    .replace(/\|(.*?)\|/g, '<span class="font-mono text-sm bg-neutral-100 px-2 py-1 rounded">$1</span>') // Code/Table alike
                            }}
                        />

                        {/* CTA */}
                        <div className="mt-16 p-8 bg-primary text-white rounded-lg text-center">
                            <h3 className="font-heading text-2xl font-bold mb-4">
                                Projeniz İçin Ücretsiz Teklif Alın
                            </h3>
                            <p className="text-neutral-300 mb-6">
                                Hayalinizdeki ev için hemen bizimle iletişime geçin.
                            </p>
                            <Link href="/iletisim" className="btn btn-secondary">
                                İletişime Geç
                            </Link>
                        </div>

                        {/* Back */}
                        <div className="mt-10">
                            <Link href="/mct-kosesi" className="inline-flex items-center gap-2 text-accent hover:underline">
                                <ArrowLeft size={18} />
                                Tüm Yazılar
                            </Link>
                        </div>
                    </div>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <div className="mt-20 pt-12 border-t border-neutral-200">
                            <h2 className="font-heading text-2xl font-bold text-primary mb-8 text-center">
                                Benzer Yazılar
                            </h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                {relatedPosts.map((related: any) => (
                                    <Link key={related.id || related._id} href={`/mct-kosesi/${related.slug}`} className="group">
                                        <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-neutral-100">
                                            <img
                                                src={related.coverImage || "/placeholder-blog.jpg"}
                                                alt={related.title || "Benzer Yazı"}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <h3 className="font-bold text-primary group-hover:text-accent transition-colors line-clamp-2">
                                            {related.title}
                                        </h3>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </article >
        </>
    );
}
