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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com";
  const articleUrl = `${baseUrl}/news/${id}`;
  const description = article.summary || article.title;
  const imageUrl = article.coverImage ? `${baseUrl}${article.coverImage}` : undefined;

  return {
    title: `${article.title} | خبرگزاری`,
    description: description,
    alternates: {
      canonical: articleUrl, 
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large", 
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    openGraph: {
      title: article.title,
      description: description,
      url: articleUrl,
      siteName: "خبرگزاری",
      locale: "fa_IR",
      type: "article", 
      publishedTime: article.createdAt ? new Date(article.createdAt).toISOString() : undefined,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: article.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: description,
      images: imageUrl ? [imageUrl] : [],
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
