import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import NewsDetailHeader from "@/components/news/newsDetailHeader";
import NewsDetailContent from "@/components/news/newsDetailContent";
import RelatedArticles from "@/components/news/relatedArticles";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  const article = await prisma.article.findUnique({
    where: { id },
    select: { title: true, summary: true, coverImage: true },
  });

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

  const article = await prisma.article.update({
    where: { id },
    data: {
      viewsCount: { increment: 1 },
    },
    include: {
      category: {
        select: { id: true, name: true, slug: true },
      },
    },
  }).catch(() => null);

  if (!article) {
    notFound();
  }

  const relatedArticles = article.categoryId
    ? await prisma.article.findMany({
        where: {
          categoryId: article.categoryId,
          NOT: { id: article.id },
        },
        orderBy: { createdAt: "desc" },
        take: 3,
        select: {
          id: true,
          title: true,
          coverImage: true,
          createdAt: true,
        },
      })
    : [];

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-10 dir-rtl">
      <NewsDetailHeader article={article} />
      <NewsDetailContent content={article.content} />
      <RelatedArticles articles={relatedArticles} />
    </main>
  );
}