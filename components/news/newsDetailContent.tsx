export default function NewsDetailContent({ content }: { content: string }) {
  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 md:p-10 dir-rtl">
      <div className="text-slate-200 text-base md:text-lg leading-loose space-y-6 whitespace-pre-line font-normal">
        {content}
      </div>
    </div>
  );
}