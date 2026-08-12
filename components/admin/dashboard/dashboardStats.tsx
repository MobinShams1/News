import StatCard from "./statCard";

interface DashboardStatsProps {
  totalArticles: number;
  totalUsers: number;
  mostViewedArticle: { title: string; viewsCount: number } | null;
}

export default function DashboardStats({
  totalArticles,
  totalUsers,
  mostViewedArticle,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="کل اخبار منتشرشده"
        value={totalArticles.toLocaleString("fa-IR")}
      />

      <StatCard
        title="پربازدیدترین خبر هفته"
        value={mostViewedArticle?.title || "خبری یافت نشد"}
        subtitle={`تعداد بازدید: ${
          mostViewedArticle?.viewsCount?.toLocaleString("fa-IR") || "۰"
        }`}
        valueClassName="text-lg font-semibold text-teal-400 truncate"
      />

      <StatCard
        title="تعداد کاربران و نویسندگان"
        value={totalUsers.toLocaleString("fa-IR")}
      />
    </div>
  );
}