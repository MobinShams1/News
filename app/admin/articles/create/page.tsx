import CreateArticleHeader from "@/components/admin/articles/createArticleHeader";
import CreateArticleForm from "@/components/admin/articles/createArticleForm";
import type { Metadata } from "next";
import { getCategories } from "@/lib/categories";

export const metadata: Metadata = {
  title: "افزودن خبر جدید",
};
export default async function CreateArticlePage() {
  const categories = await getCategories();
  return (
    <div className="max-w-4xl mx-auto space-y-6 dir-rtl">
      <CreateArticleHeader />
      <CreateArticleForm categories={categories}/>
    </div>
  );
}