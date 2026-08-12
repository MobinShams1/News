import Header from "@/components/news/layoutHeader";

export default function NewsLayout ({children} : {children :React.ReactNode})  {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-teal-500 selection:text-slate-950">
      <Header />
      {children}
    </div>
  );
}