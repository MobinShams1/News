"use client";

import React from "react";

interface AdminHeaderProps {
  user: {
    name?: string | null;
    phone: string;
    role: string;
  } | null;
  onToggleMobileSidebar: () => void;
}

export default function AdminHeader({ user, onToggleMobileSidebar }: AdminHeaderProps) {
  const todayDate = new Date().toLocaleDateString("fa-IR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const displayName = user?.name || user?.phone || "مدیر سیستم";
  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800/80 border border-slate-700"
          aria-label="باز کردن منو"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        <div className="text-xs md:text-sm text-slate-400 font-medium hidden sm:block">
          امروز: {todayDate}
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <span className="text-[10px] md:text-xs bg-teal-500/10 text-teal-400 px-2.5 py-1 rounded-full border border-teal-500/20 font-medium">
          {user?.role === "ADMIN" ? "ادمین ارشد" : "کاربر"}
        </span>
        
        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-xs md:text-sm font-semibold text-white max-w-[100px] md:max-w-none truncate">{displayName}</span>
          <div className="w-8 h-8 md:w-9 md:h-9 bg-teal-500/20 border border-teal-500/30 rounded-full flex items-center justify-center font-bold text-xs md:text-sm text-teal-400">
            {avatarLetter}
          </div>
        </div>
      </div>
    </header>
  );
}