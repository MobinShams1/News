import AdminLayoutWrapper from "@/components/admin/dashboard/adminLayoutWrapper";
import { getAuthAdmin } from "@/lib/auth";



export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const currentadmin = await getAuthAdmin();
  
  return <AdminLayoutWrapper user={currentadmin}>{children}</AdminLayoutWrapper>;
}