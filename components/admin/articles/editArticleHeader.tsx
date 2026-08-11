import Link from "next/link";

export default function EditArticleHeader() {
  return (
    <div className="flex items-center justify-between bg-slate-900 p-6 rounded-2xl border border-slate-800">
      <div>
        <h1 className="text-xl font-bold text-white">ویرایش خبر</h1>
        <p className="text-xs text-slate-400 mt-1">
          تغییر اطلاعات و بروزرسانی متن یا تصویر خبر
        </p>
      </div>
      <Link
        href="/admin/articles"
        className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl text-sm transition-colors"
      >
        انصراف و بازگشت
      </Link>
    </div>
  );
}