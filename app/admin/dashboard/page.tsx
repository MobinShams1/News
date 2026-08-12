import { getDashboardData } from "@/lib/dashboard";
import DashboardStats from "@/components/admin/dashboard/dashboardStats";
import RecentArticlesTable from "@/components/admin/dashboard/recentArticlesTable";

export default async function DashboardPage() {
  const { totalArticles, totalUsers, mostViewedArticle, recentArticles } =
    await getDashboardData();

  return (
    <div className="space-y-8 dir-rtl">
      <DashboardStats
        totalArticles={totalArticles}
        totalUsers={totalUsers}
        mostViewedArticle={mostViewedArticle}
      />

      <RecentArticlesTable articles={recentArticles} />
    </div>
  );
}