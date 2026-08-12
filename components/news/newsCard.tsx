import Link from "next/link";
import Image from "next/image";

interface NewsCardProps {
  article: {
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
  };
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <article className="group bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
      <div>
        <div className="relative w-full h-48 bg-slate-950 overflow-hidden">
          {article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl text-slate-700">
              📰
            </div>
          )}

          {article.isBreaking && (
            <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-lg animate-pulse">
              خبر فوری 🚨
            </span>
          )}

          {article.category && (
            <span className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md text-teal-400 text-[11px] font-medium px-2.5 py-1 rounded-lg border border-teal-500/20">
              {article.category.name}
            </span>
          )}
        </div>

        <div className="p-5 space-y-3">
          <Link href={`/news/${article.id}`}>
            <h2 className="text-base font-bold text-white group-hover:text-teal-400 transition-colors line-clamp-2 leading-snug">
              {article.title}
            </h2>
          </Link>

          {article.summary && (
            <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
              {article.summary}
            </p>
          )}
        </div>
      </div>

      <div className="p-5 pt-0 border-t border-slate-800/50 mt-4 flex items-center justify-between text-[11px] text-slate-500">
        <span>{new Date(article.createdAt).toLocaleDateString("fa-IR")}</span>
        <div className="flex items-center gap-1 dir-ltr">
          <span>بازدید</span>
          <span>{article.viewsCount.toLocaleString("fa-IR")}</span>
        </div>
      </div>
    </article>
  );
}