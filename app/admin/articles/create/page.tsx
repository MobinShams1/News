import CreateArticleHeader from "@/components/admin/articles/createArticleHeader";
import CreateArticleForm from "@/components/admin/articles/createArticleForm";

export default function CreateArticlePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 dir-rtl">
      <CreateArticleHeader />
      <CreateArticleForm />
    </div>
  );
}