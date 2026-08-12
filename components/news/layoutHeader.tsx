import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 dir-rtl">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        <Link href="/news" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-teal-500/10 border border-teal-500/30 rounded-xl flex items-center justify-center text-lg group-hover:scale-105 transition-transform">
            📰
          </div>
          <span className="text-base font-bold text-white group-hover:text-teal-400 transition-colors">
            خبرگزاری آنلاین
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 shadow-sm"
          >
            <span>🔐</span>
            <span>ورود ادمین</span>
          </Link>
        </div>

      </div>
    </header>
  );
}