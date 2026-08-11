import AdminLayoutWrapper from "@/components/admin/dashboard/adminLayoutWrapper";
import { getAuthAdmin } from "@/lib/auth";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | پنل مدیریت خبرگزاری",
    default: "پنل مدیریت",
  },
  description: "سیستم مدیریت محتوا و اخبار",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const currentadmin = await getAuthAdmin();
  
  return <AdminLayoutWrapper user={currentadmin}>{children}</AdminLayoutWrapper>;
}