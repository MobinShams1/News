import ArticlesHeader from "@/components/admin/articles/articlesHeader";
import ArticlesTable from "@/components/admin/articles/articleTable";
export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import getArticles from "@/lib/articles";

export const metadata: Metadata = {
  title: "مدیریت اخبار",
};


export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="space-y-6 dir-rtl">
      <ArticlesHeader />
      <ArticlesTable articles={articles} />
    </div>
  );
}