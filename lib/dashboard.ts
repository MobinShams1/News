import { prisma } from "@/lib/prisma";

export async function getDashboardData() {
  const [totalArticles, totalUsers, mostViewedArticle, recentArticles] =
    await Promise.all([
      prisma.article.count(),
      prisma.users.count(),
      prisma.article.findFirst({
        orderBy: { viewsCount: "desc" },
        select: { title: true, viewsCount: true },
      }),
      prisma.article.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          category: { select: { name: true } },
          author: { select: { name: true } },
        },
      }),
    ]);

  return {
    totalArticles,
    totalUsers,
    mostViewedArticle,
    recentArticles,
  };
}