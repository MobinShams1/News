import { prisma } from "@/lib/prisma";
import ArticlesHeader from "@/components/admin/articles/articlesHeader";
import ArticlesTable from "@/components/admin/articles/articleTable";
export const dynamic = "force-dynamic";
export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
    },
  });

  return (
    <div className="space-y-6 dir-rtl">
      <ArticlesHeader />
      <ArticlesTable articles={articles} />
    </div>
  );
}