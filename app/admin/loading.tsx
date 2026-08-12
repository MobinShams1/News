export default function AdminLoading() {
  return (
    <div className="space-y-6 dir-rtl animate-pulse max-w-6xl mx-auto p-2">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-6 w-48 bg-slate-800 rounded-lg"></div>
          <div className="h-3 w-64 bg-slate-800/60 rounded-lg"></div>
        </div>
        <div className="h-10 w-36 bg-slate-800 rounded-xl"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between"
          >
            <div className="space-y-2">
              <div className="h-3 w-20 bg-slate-800/60 rounded-md"></div>
              <div className="h-7 w-16 bg-slate-800 rounded-lg"></div>
            </div>
            <div className="w-12 h-12 bg-slate-800 rounded-xl"></div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center">
          <div className="h-4 w-32 bg-slate-800 rounded-md"></div>
          <div className="h-8 w-24 bg-slate-800/50 rounded-lg"></div>
        </div>
        <div className="p-4 space-y-4">
          {[1, 2, 3, 4, 5].map((row) => (
            <div
              key={row}
              className="flex items-center justify-between gap-4 border-b border-slate-800/50 pb-3 last:border-0"
            >
              <div className="flex items-center gap-3 w-1/3">
                <div className="w-10 h-10 bg-slate-800 rounded-lg shrink-0"></div>
                <div className="h-4 w-full bg-slate-800 rounded-md"></div>
              </div>
              <div className="h-4 w-20 bg-slate-800/60 rounded-md hidden sm:block"></div>
              <div className="h-4 w-16 bg-slate-800/60 rounded-md"></div>
              <div className="h-8 w-16 bg-slate-800/80 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}