import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsDetailHeader from "@/components/news/newsDetailHeader";
import NewsDetailContent from "@/components/news/newsDetailContent";
import RelatedArticles from "@/components/news/relatedArticles";

import {
  getArticleAndIncrementViews,
  getArticleSummaryById,
  getRelatedArticles,
} from "@/lib/articles";
export const dynamic = "force-dynamic";
interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  const article = await getArticleSummaryById(id);

  if (!article) {
    return { title: "خبر یافت نشد" };
  }

  return {
    title: `${article.title} | خبرگزاری`,
    description: article.summary || article.title,
    openGraph: {
      title: article.title,
      description: article.summary || article.title,
      images: article.coverImage ? [article.coverImage] : [],
    },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params;

  const article = await getArticleAndIncrementViews(id);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(
    article.categoryId,
    article.id,
  );

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-10 dir-rtl">
      <NewsDetailHeader article={article} />
      <NewsDetailContent content={article.content} />
      <RelatedArticles articles={relatedArticles} />
    </main>
  );
}
