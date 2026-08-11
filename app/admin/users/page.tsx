import { getUsers } from "@/lib/users";
import UsersHeader from "@/components/admin/users/usersHeader";
import UsersTable from "@/components/admin/users/usersTable";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-6 dir-rtl max-w-6xl mx-auto">
      <UsersHeader totalCount={users.length} />
      <UsersTable users={users} />
    </div>
  );
}