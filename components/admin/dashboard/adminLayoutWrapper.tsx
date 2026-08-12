"use client";

import { useState } from "react";
import AdminSidebar from "./adminSidebar";
import AdminHeader from "./adminHeader";
import { UserItem } from "@/types/user";

interface AdminLayoutWrapperProps {
  user: UserItem | null;
  children: React.ReactNode;
}

export default function AdminLayoutWrapper({ user, children }: AdminLayoutWrapperProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex dir-rtl font-sans">
      <AdminSidebar
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          user={user}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
        />
        <main className="p-4 md:p-8 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}