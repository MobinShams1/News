import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import AdminLayoutWrapper from "@/components/admin/dashboard/adminLayoutWrapper";

async function getAdminUser() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("admin_token")?.value;

  if (!userId) return null;

  return await prisma.users.findUnique({
    where: { id: userId },
    select: { name: true, phone: true, role: true },
  });
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getAdminUser();

  return <AdminLayoutWrapper user={user}>{children}</AdminLayoutWrapper>;
}