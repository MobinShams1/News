import { notFound } from "next/navigation";
import EditArticleHeader from "@/components/admin/articles/editArticleHeader";
import EditArticleForm from "@/components/admin/articles/editArticlesForm";
import { Metadata } from "next";
import { getArticle, getArticleSummaryById } from "@/lib/articles";
import { getCategories } from "@/lib/categories";
export const dynamic = "force-dynamic";
interface EditArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: EditArticlePageProps): Promise<Metadata> {
  const { id } = await params;

  const article = await getArticleSummaryById(id);

  if (!article) {
    return {
      title: "خبر یافت نشد",
    };
  }

  return {
    title: `ویرایش خبر: ${article.title}`,
  };
}

export default async function EditArticlePage({
  params,
}: EditArticlePageProps) {
  const { id } = await params;

  const article = await getArticle(id);
  const categories = await getCategories();

  if (!article) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 dir-rtl">
      <EditArticleHeader />
      <EditArticleForm article={article} categories={categories} />
    </div>
  );
}
