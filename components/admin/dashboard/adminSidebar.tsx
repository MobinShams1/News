"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutAdmin } from "@/lib/auth";
import { toast } from "sonner";

const menuItems = [
  { label: "داشبورد و آمار", href: "/admin/dashboard", icon: "📊" },
  { label: "مدیریت اخبار", href: "/admin/articles", icon: "📰" },
  { label: "دسته‌بندی‌ها", href: "/admin/categories", icon: "📂" },
  { label: "مدیریت کاربران", href: "/admin/users", icon: "👥" },
];

interface AdminSidebarProps {
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export default function AdminSidebar({ isOpenMobile, onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      toast.success("با موفقیت از حساب خارج شدید.");
      router.push("/admin/login");
      router.refresh();
    } catch {
      toast.error("خطا در خروج از حساب.");
    }
  };

  return (
    <>
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed md:static top-0 right-0 h-full w-64 bg-slate-900 border-l border-slate-800 flex flex-col justify-between z-50 transition-transform duration-300 ease-in-out shrink-0 ${
          isOpenMobile ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-teal-400">خبرخوان ERP</h1>
              <p className="text-xs text-slate-500 mt-1">سامانه مدیریت محتوا</p>
            </div>
            <button
              onClick={onCloseMobile}
              className="md:hidden text-slate-400 hover:text-white p-1"
            >
              ✕
            </button>
          </div>

          <nav className="p-4 space-y-1.5 text-sm font-medium">
            {menuItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150 ${
                    isActive
                      ? "bg-teal-500/10 text-teal-400 border border-teal-500/20 font-semibold"
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl text-sm font-medium transition-colors border border-red-500/20 cursor-pointer"
          >
            <span>🚪</span>
            <span>خروج از حساب</span>
          </button>
        </div>
      </aside>
    </>
  );
}