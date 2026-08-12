import Link from "next/link";
import ViewsCountFormatted from "@/utils/viewsCountFormat";

interface ArticleItem {
  id: string;
  title: string;
  viewsCount: number;
  category: { name: string } | null;
  author: { name: string | null } | null;
}

export default function RecentArticlesTable({
  articles,
}: {
  articles: ArticleItem[];
}) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">آخرین اخبار ثبت‌شده</h2>
        <Link
          href="/admin/articles/create"
          className="bg-teal-500 hover:bg-teal-600 text-slate-950 font-semibold px-4 py-2 rounded-xl text-sm transition-colors"
        >
          + افزودن خبر جدید
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right text-slate-300">
          <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase border-b border-slate-700">
            <tr>
              <th className="p-4">عنوان خبر</th>
              <th className="p-4">دسته‌بندی</th>
              <th className="p-4">نویسنده</th>
              <th className="p-4">تعداد بازدید</th>
              <th className="p-4">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50 text-sm">
            {articles.map((article) => (
              <tr
                key={article.id}
                className="hover:bg-slate-700/30 transition-colors"
              >
                <td className="p-4 font-medium text-white">{article.title}</td>
                <td className="p-4">
                  <span className="bg-teal-500/10 text-teal-400 px-3 py-1 rounded-lg text-xs border border-teal-500/20">
                    {article.category?.name || "بدون دسته"}
                  </span>
                </td>
                <td className="p-4">{article.author?.name || "ادمین"}</td>
                <td className="p-4">
                  <ViewsCountFormatted viewsCount={article.viewsCount} />
                </td>
                <td className="p-4">
                  <Link
                    href={`/admin/articles/edit/${article.id}`}
                    className="text-amber-400 hover:text-amber-300 text-xs"
                  >
                    ویرایش
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}