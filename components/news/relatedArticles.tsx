import Link from "next/link";
import Image from "next/image";

interface ArticleItem {
  id: string;
  title: string;
  coverImage: string | null;
  createdAt: Date;
}

export default function RelatedArticles({ articles }: { articles: ArticleItem[] }) {
  if (!articles || articles.length === 0) return null;

  return (
    
    <section className="space-y-4 pt-8 border-t border-slate-800 dir-rtl">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
        <span >اخبار مرتبط</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((item) => (
          <Link
            key={item.id}
            href={`/news/${item.id}`}
            className="group bg-slate-900 border border-slate-800 hover:border-slate-700 p-4 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="relative w-full h-32 bg-slate-950 rounded-xl overflow-hidden">
                {item.coverImage ? (
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    fill
                    sizes="300px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">
                    📰
                  </div>
                )}
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-teal-400 transition-colors line-clamp-2 leading-snug">
                {item.title}
              </h4>
            </div>

            <span className="text-[11px] text-slate-500 pt-3 mt-2 border-t border-slate-800/60 block">
              {new Date(item.createdAt).toLocaleDateString("fa-IR")}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}