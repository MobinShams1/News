import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import NewsHeader from "@/components/news/newsHeader";
import NewsGrid from "@/components/news/newsGrid";
import HeroNewsSlider from "@/components/news/heroNewsSlider";

export const metadata: Metadata = {
  title: "آخرین اخبار و مقالات | خبرگزاری",
  description: "جدیدترین اخبار روز، گزارش‌ها و تحلیل‌های خبری",
};

export const revalidate = 60;

interface NewsPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const { category } = await searchParams;

  const [articles, categories] = await Promise.all([
    prisma.article.findMany({
      where: category
        ? {
            category: {
              slug: category,
            },
          }
        : {},
      orderBy: { createdAt: "desc" },
      include: {
        category: {
          select: { name: true, slug: true },
        },
      },
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, slug: true },
    }),
  ]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-10 dir-rtl">
      <NewsHeader categories={categories} selectedCategory={category} />

      {!category && <HeroNewsSlider articles={articles} />}

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-400" />
          <span>تمامی اخبار</span>
        </h3>
        <NewsGrid articles={articles} />
      </div>
    </main>
  );
}