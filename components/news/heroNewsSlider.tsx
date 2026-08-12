"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import ViewsCountFormatted from "@/utils/viewsCountFormat";
import DateFormat from "@/utils/dateFormat";
import { Article } from "@/types/article";

export default function HeroNewsSlider({ articles }: { articles: Article[] }) {
  if (!articles || articles.length === 0) return null;

  const featuredArticles = articles.slice(0, 5);

  return (
    <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: "!bg-teal-400 !w-8 !rounded-full transition-all duration-300",
          bulletClass: "inline-block w-2.5 h-2.5 bg-slate-600 rounded-full cursor-pointer transition-all mx-1",
        }}
        className="w-full h-[400px] md:h-[480px] hero-swiper"
      >
        {featuredArticles.map((article) => (
          <SwiperSlide key={article.id} className="relative w-full h-full">
          
            <div className="absolute inset-0 bg-slate-950 overflow-hidden">
              {article.coverImage ? (
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover opacity-60 scale-105 hover:scale-100 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl opacity-20">
                  📰
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            </div>

            <div className="absolute bottom-0 inset-x-0 p-6 md:p-10 space-y-3 z-10 dir-rtl text-right">
              <div className="flex items-center gap-2">
                {article.isBreaking && (
                  <span className="bg-red-500/90 text-white text-[11px] font-bold px-3 py-1 rounded-lg shadow-lg shadow-red-500/20 backdrop-blur-md animate-pulse">
                    خبر فوری 🚨
                  </span>
                )}
                {article.category && (
                  <span className="bg-teal-500/20 border border-teal-500/30 text-teal-400 text-xs font-semibold px-3 py-1 rounded-lg backdrop-blur-md">
                    {article.category.name}
                  </span>
                )}
              </div>

              <Link href={`/news/${article.id}`} className="block group">
                <h2 className="text-xl md:text-3xl font-extrabold text-white group-hover:text-teal-400 transition-colors line-clamp-2 leading-tight">
                  {article.title}
                </h2>
              </Link>

              {article.summary && (
                <p className="text-xs md:text-sm text-slate-300 line-clamp-2 leading-relaxed max-w-3xl">
                  {article.summary}
                </p>
              )}

              <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800/80 w-fit">
                <DateFormat date={article.createdAt}>📅</DateFormat>
                <span>•</span>
                <span className="dir-ltr">
                  <ViewsCountFormatted viewsCount={article.viewsCount}><span>بازدید</span></ViewsCountFormatted>
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}