import Link from "next/link";

export default function ArticlesHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
      <div>
        <h1 className="text-xl font-bold text-white">مدیریت اخبار</h1>
        <p className="text-xs text-slate-400 mt-1">
          لیست تمام اخبار منتشرشده و عملیات مدیریت آن‌ها
        </p>
      </div>
      <Link
        href="/admin/articles/create"
        className="bg-teal-500 hover:bg-teal-600 text-slate-950 font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 self-start sm:self-auto"
      >
        <span>➕</span>
        <span>افزودن خبر جدید</span>
      </Link>
    </div>
  );
}