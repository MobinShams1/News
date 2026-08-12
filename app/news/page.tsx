import type { Metadata } from "next";
import NewsHeader from "@/components/news/newsHeader";
import NewsGrid from "@/components/news/newsGrid";
import HeroNewsSlider from "@/components/news/heroNewsSlider";
import { getNewsFeedData } from "@/lib/articles";

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

  const {articles , categories} = await getNewsFeedData(category);

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