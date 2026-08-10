import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  const totalArticles = await prisma.article.count();
  const totalUsers = await prisma.users.count();
  const mostViewedArticle = await prisma.article.findFirst({
    orderBy: { viewsCount: "desc" },
    select: { title: true, viewsCount: true },
  });

  const recentArticles = await prisma.article.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      author: true,
    },
  });

  return (
    <div className="space-y-8 dir-rtl">
      {/* کارت‌های آماری */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl">
          <p className="text-slate-400 text-sm font-medium">کل اخبار منتشرشده</p>
          <p className="text-3xl font-bold text-white mt-2">{totalArticles}</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl">
          <p className="text-slate-400 text-sm font-medium">پربازدیدترین خبر هفته</p>
          <p className="text-lg font-semibold text-teal-400 mt-2 truncate">
            {mostViewedArticle?.title || "خبری یافت نشد"}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            تعداد بازدید: {mostViewedArticle?.viewsCount || 0}
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl">
          <p className="text-slate-400 text-sm font-medium">تعداد کاربران و نویسندگان</p>
          <p className="text-3xl font-bold text-white mt-2">{totalUsers}</p>
        </div>
      </div>

      {/* جدول آخرین اخبار */}
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
              {recentArticles.map((article) => (
                <tr key={article.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="p-4 font-medium text-white">{article.title}</td>
                  <td className="p-4">
                    <span className="bg-teal-500/10 text-teal-400 px-3 py-1 rounded-lg text-xs border border-teal-500/20">
                      {article.category?.name || "بدون دسته"}
                    </span>
                  </td>
                  <td className="p-4">{article.author?.name || "ادمین"}</td>
                  <td className="p-4">{article.viewsCount}</td>
                  <td className="p-4 space-x-2 space-x-reverse">
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
    </div>
  );
}