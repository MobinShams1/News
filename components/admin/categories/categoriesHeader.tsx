interface CategoriesHeaderProps {
  totalCount: number;
  emptyCount: number;
}

export default function CategoriesHeader({ totalCount, emptyCount }: CategoriesHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <h1 className="text-xl font-bold text-white">مدیریت دسته‌بندی‌ها</h1>
        <p className="text-xs text-slate-400 mt-1">
          تعریف موضوعات خبری سایت، ویرایش نام‌ها و مدیریت دسته‌بندی‌ها
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">کل دسته‌بندی‌ها</p>
            <p className="text-2xl font-bold text-teal-400 mt-1">
              {totalCount.toLocaleString("fa-IR")}
            </p>
          </div>
          <div className="w-12 h-12 bg-teal-500/10 border border-teal-500/20 rounded-xl flex items-center justify-center text-xl">
            📂
          </div>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">دسته‌های بدون خبر</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">
              {emptyCount.toLocaleString("fa-IR")}
            </p>
          </div>
          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-xl">
            📭
          </div>
        </div>
      </div>
    </div>
  );
}