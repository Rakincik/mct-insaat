import BlogPostForm from "@/components/admin/BlogPostForm";
import { getBlogPosts } from "@/lib/db";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: { id: string } }) {
    const posts = await getBlogPosts();
    const post = posts.find((p: any) => p.id === params.id);

    if (!post) notFound();

    return <BlogPostForm initialData={post} />;
}
