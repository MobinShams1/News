import type { Metadata } from "next";
import NewsHeader from "@/components/news/newsHeader";
import NewsGrid from "@/components/news/newsGrid";
import HeroNewsSlider from "@/components/news/heroNewsSlider";
import { getNewsFeedData } from "@/lib/articles";
import { Category } from "@/types/category";

export async function generateMetadata({
  searchParams,
}: NewsPageProps): Promise<Metadata> {
  const { category } = await searchParams;
  const { categories } = await getNewsFeedData(category);

  const currentCategory = categories.find((c: Category) => c.slug === category);

  const title = currentCategory
    ? `اخبار ${currentCategory.name} | آخرین گزارش‌ها و اخبار روز`
    : "آخرین اخبار و مقالات | خبرگزاری";

  const description = currentCategory
    ? `جدیدترین اخبار و گزارش‌های تحلیلی در حوزه ${currentCategory.name}. بروزترین اخبار را در خبرگزاری دنبال کنید.`
    : "جدیدترین اخبار روز، گزارش‌ها و تحلیل‌های خبری ایران و جهان";

  const pageUrl = category ? `/news?category=${category}` : "/news";

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl, 
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: "website",
      locale: "fa_IR",
      siteName: "خبرگزاری",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
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