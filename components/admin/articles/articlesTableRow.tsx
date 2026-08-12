import Link from "next/link";
import DeleteArticleBtn from "@/components/admin/articles/deleteArticleBtn";
import Image from "next/image";

interface ArticleItem {
  id: string;
  title: string;
  coverImage: string | null;
  viewsCount: number;
  createdAt: Date;
  category?: {
    name: string;
  } | null;
}

export default function ArticleTableRow({ article }: { article: ArticleItem }) {
  return (
    <tr className="hover:bg-slate-800/40 transition-colors">
      <td className="p-4">
        <div className="relative w-12 h-12 bg-slate-800 border border-slate-700 rounded-lg overflow-hidden flex items-center justify-center text-xs text-slate-500 shrink-0">
          {article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={article.title || "تصویر خبر"}
              fill
              unoptimized
              sizes="48px"
              className="object-cover"
              priority={false}
            />
          ) : (
            "🖼️"
          )}
        </div>
      </td>
      <td className="p-4 font-medium text-white max-w-xs truncate">
        {article.title}
      </td>
      <td className="p-4">
        <span className="bg-teal-500/10 text-teal-400 px-3 py-1 rounded-lg text-xs border border-teal-500/20">
          {article.category?.name || "بدون دسته"}
        </span>
      </td>
      <td className="p-4 dir-ltr text-right">
        {article.viewsCount.toLocaleString("fa-IR")}
      </td>
      <td className="p-4 text-xs text-slate-400">
        {new Date(article.createdAt).toLocaleDateString("fa-IR")}
      </td>
      <td className="p-4">
        <div className="flex items-center justify-center gap-2">
          <Link
            href={`/admin/articles/edit/${article.id}`}
            className="p-1.5 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 rounded-lg transition-colors"
            title="ویرایش خبر"
          >
            ✏️
          </Link>
          <DeleteArticleBtn
            articleId={article.id}
            articleTitle={article.title}
          />
        </div>
      </td>
    </tr>
  );
}