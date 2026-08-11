import CreateAdminModal from "./createAdminModal";

interface UsersHeaderProps {
  totalCount: number;
}

export default function UsersHeader({ totalCount }: UsersHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white">مدیریت مدیران و نویسندگان</h1>
          <p className="text-xs text-slate-400 mt-1">
            مشاهده لیست مدیران سیستم و ثبت ادمین جدید
          </p>
        </div>
        <CreateAdminModal />
      </div>

      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex items-center justify-between max-w-sm">
        <div>
          <p className="text-xs text-slate-400 font-medium">تعداد کل مدیران</p>
          <p className="text-2xl font-bold text-teal-400 mt-1">
            {totalCount.toLocaleString("fa-IR")} نفر
          </p>
        </div>
        <div className="w-12 h-12 bg-teal-500/10 border border-teal-500/20 rounded-xl flex items-center justify-center text-xl">
          👑
        </div>
      </div>
    </div>
  );
}