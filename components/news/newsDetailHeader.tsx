import Image from "next/image";
import Link from "next/link";

interface ArticleData {
  id: string;
  title: string;
  summary: string | null;
  coverImage: string | null;
  viewsCount: number;
  createdAt: Date;
  isBreaking: boolean;
  category?: {
    name: string;
    slug: string;
  } | null;
}

export default function NewsDetailHeader({ article }: { article: ArticleData }) {
  return (
    <header className="space-y-6 dir-rtl">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/news" className="hover:text-teal-400 transition-colors">
          اخبار
        </Link>
        <span>/</span>
        {article.category ? (
          <Link
            href={`/news?category=${article.category.slug}`}
            className="text-teal-400 hover:underline font-medium"
          >
            {article.category.name}
          </Link>
        ) : (
          <span>عمومی</span>
        )}
      </div>

      <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
        {article.title}
      </h1>

      {article.summary && (
        <p className="text-sm md:text-base text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border-r-4 border-teal-500 border-y border-l border-slate-800">
          {article.summary}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <span>📅 {new Date(article.createdAt).toLocaleDateString("fa-IR")}</span>
          {article.isBreaking && (
            <span className="bg-red-500/20 text-red-400 font-bold px-2.5 py-0.5 rounded-md border border-red-500/30">
              خبر فوری 🚨
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 dir-ltr text-slate-400 font-mono">
          <span>بازدید</span>
          <span>{article.viewsCount.toLocaleString("fa-IR")}</span>
        </div>
      </div>

      {article.coverImage && (
        <div className="relative w-full h-64 md:h-[420px] rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            unoptimized
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
        </div>
      )}
    </header>
  );
}