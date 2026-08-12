export default function FormLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 dir-rtl animate-pulse">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-6 w-36 bg-slate-800 rounded-lg"></div>
          <div className="h-3 w-56 bg-slate-800/60 rounded-lg"></div>
        </div>
        <div className="h-9 w-28 bg-slate-800 rounded-xl"></div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="space-y-2">
          <div className="h-4 w-20 bg-slate-800 rounded-md"></div>
          <div className="h-12 w-full bg-slate-950 rounded-xl border border-slate-800/50"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="h-4 w-20 bg-slate-800 rounded-md"></div>
            <div className="h-12 w-full bg-slate-950 rounded-xl border border-slate-800/50"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-20 bg-slate-800 rounded-md"></div>
            <div className="h-12 w-full bg-slate-950 rounded-xl border border-slate-800/50"></div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-4 w-24 bg-slate-800 rounded-md"></div>
          <div className="h-36 w-full bg-slate-950 rounded-xl border border-slate-800/50"></div>
        </div>
      </div>
    </div>
  );
}