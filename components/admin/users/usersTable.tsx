import DateFormat from "@/utils/dateFormat";
import DeleteUserBtn from "./deleteUserBtn";

interface UserItem {
  id: string;
  name: string | null;
  phone: string;
  createdAt: Date;
  _count: {
    articles: number;
  };
}

export default function UsersTable({ users }: { users: UserItem[] }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-slate-800 font-bold text-sm text-white">
        لیست مدیران سیستم ({users.length})
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right text-slate-300">
          <thead className="bg-slate-950/60 text-slate-400 text-xs uppercase border-b border-slate-800">
            <tr>
              <th className="p-4">نام مدیر</th>
              <th className="p-4">شماره تلفن</th>
              <th className="p-4">تعداد اخبار منتشرشده</th>
              <th className="p-4">تاریخ عضویت</th>
              <th className="p-4 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-sm">
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-slate-500">
                  هیچ مدیری یافت نشد.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-medium text-white">
                    {user.name || "بدون نام"}
                  </td>
                  <td className="p-4 dir-ltr text-right text-slate-400 font-mono">
                    {user.phone}
                  </td>
                  <td className="p-4">
                    <span className="bg-teal-500/10 text-teal-400 px-3 py-1 rounded-lg text-xs border border-teal-500/20">
                      {user._count.articles.toLocaleString("fa-IR")} خبر
                    </span>
                  </td>
                  <td className="p-4 text-xs text-slate-400">
                    <DateFormat date={user.createdAt}/>
                  </td>
                  <td className="p-4 text-center">
                    <DeleteUserBtn
                      userId={user.id}
                      userName={user.name || user.phone}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}