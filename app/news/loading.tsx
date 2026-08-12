export default function NewsLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 dir-rtl animate-pulse">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl h-36"></div>

      <div className="flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-8 w-20 bg-slate-900 rounded-xl"></div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl h-80"></div>
        ))}
      </div>
    </div>
  );
}