import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface NewsHeaderProps {
  categories: Category[];
  selectedCategory?: string;
}

export default function NewsHeader({ categories, selectedCategory }: NewsHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 p-8 rounded-3xl text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          آخرین اخبار و مقالات
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          جدیدترین رویدادها، تحلیل‌ها و تازه‌ترین اخبار روز را در اینجا دنبال کنید.
        </p>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none dir-rtl">
        <Link
          href="/news"
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            !selectedCategory
              ? "bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20"
              : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          همه اخبار
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/news?category=${cat.slug}`}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.slug
                ? "bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}