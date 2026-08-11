import Link from "next/link";

export default function CreateArticleHeader() {
  return (
    <div className="flex items-center justify-between bg-slate-900 p-6 rounded-2xl border border-slate-800">
      <div>
        <h1 className="text-xl font-bold text-white">ایجاد خبر جدید</h1>
        <p className="text-xs text-slate-400 mt-1">
          تصویر شاخص و مشخصات خبر را مشخص کنید.
        </p>
      </div>
      <Link
        href="/admin/articles"
        className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl text-sm transition-colors"
      >
        بازگشت به لیست
      </Link>
    </div>
  );
}