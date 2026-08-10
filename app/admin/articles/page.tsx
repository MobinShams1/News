import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteArticleBtn from "@/components/admin/articles/deleteArticleBtn";

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
    },
  });

  return (
    <div className="space-y-6 dir-rtl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white">مدیریت اخبار</h1>
          <p className="text-xs text-slate-400 mt-1">لیست تمام اخبار منتشرشده و عملیات مدیریت آن‌ها</p>
        </div>
        <Link
          href="/admin/articles/create"
          className="bg-teal-500 hover:bg-teal-600 text-slate-950 font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <span>➕</span>
          <span>افزودن خبر جدید</span>
        </Link>
      </div>

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
                  <tr key={article.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      <div className="w-12 h-12 bg-slate-800 border border-slate-700 rounded-lg overflow-hidden flex items-center justify-center text-xs text-slate-500 shrink-0">
                        {article.coverImage ? (
                          <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
                        ) : (
                          "🖼️"
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-medium text-white max-w-xs truncate">{article.title}</td>
                    <td className="p-4">
                      <span className="bg-teal-500/10 text-teal-400 px-3 py-1 rounded-lg text-xs border border-teal-500/20">
                        {article.category?.name || "بدون دسته"}
                      </span>
                    </td>
                    <td className="p-4 dir-ltr text-right">{article.viewsCount.toLocaleString("fa-IR")}</td>
                    <td className="p-4 text-xs text-slate-400">
                      {new Date(article.createdAt).toLocaleDateString("fa-IR")}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/admin/articles/edit/${article.id}`}
                          className="p-1.5 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 rounded-lg transition-colors"
                          title="ویرایش خبر"
                        >
                          ✏️
                        </Link>
                        <DeleteArticleBtn articleId={article.id} articleTitle={article.title} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}