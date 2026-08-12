import NewsCard from "./newsCard";
import { Article } from "@/types/article";

export default function NewsGrid({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 p-12 rounded-2xl text-center space-y-3">
        <div className="text-4xl">📭</div>
        <h3 className="text-base font-bold text-white">خبری یافت نشد</h3>
        <p className="text-xs text-slate-400">
          در این دسته‌بندی هنوز خبری منتشر نشده است.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
}