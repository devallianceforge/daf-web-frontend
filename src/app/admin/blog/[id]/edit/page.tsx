import { BlogPostForm } from '@/components/admin/blog/BlogPostForm';

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BlogPostForm mode="edit" postId={id} />;
}