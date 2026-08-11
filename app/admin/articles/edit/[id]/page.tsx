import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditArticleHeader from "@/components/admin/articles/editArticleHeader";
import EditArticleForm from "@/components/admin/articles/editArticlesForm";

interface EditArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const { id } = await params;

  const [article, categories] = await Promise.all([
    prisma.article.findUnique({
      where: { id },
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  if (!article) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 dir-rtl">
      <EditArticleHeader />
      <EditArticleForm article={article} categories={categories} />
    </div>
  );
}