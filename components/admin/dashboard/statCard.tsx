interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  valueClassName?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  valueClassName = "text-3xl font-bold text-white",
}: StatCardProps) {
  return (
    <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl space-y-2">
      <p className="text-slate-400 text-sm font-medium">{title}</p>
      <p className={`mt-2 ${valueClassName}`}>{value}</p>
      {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
    </div>
  );
}