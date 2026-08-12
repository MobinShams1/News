import ArticleTableRow from "./articlesTableRow";
import { Article } from "@/types/article";

export default function ArticlesTable({ articles }: { articles: Article[] }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-right text-slate-300">
          <thead className="bg-slate-950/60 text-slate-400 text-xs uppercase border-b border-slate-800">
            <tr>
              <th className="p-4">کاور</th>
              <th className="p-4">عنوان خبر</th>
              <th className="p-4">دسته‌بندی</th>
              <th className="p-4">بازدید</th>
              <th className="p-4">تاریخ انتشار</th>
              <th className="p-4 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-sm">
            {articles.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-slate-500">
                  هیچ خبری ثبت نشده است.
                </td>
              </tr>
            ) : (
              articles.map((article) => (
                <ArticleTableRow key={article.id} article={article} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}