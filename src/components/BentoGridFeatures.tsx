"use client";
import React, { useEffect, useRef } from "react";
import anime from "animejs";

export const BentoGridFeatures = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animasi stagger untuk grid item
            anime({
              targets: '.bento-item',
              translateY: [50, 0],
              opacity: [0, 1],
              scale: [0.95, 1],
              easing: "easeOutElastic(1, .8)",
              duration: 1200,
              delay: anime.stagger(150, { start: 100 })
            });

            // Animasi float untuk ikon di dalam bento
            anime({
              targets: '.bento-icon-container',
              translateY: [-5, 5],
              direction: 'alternate',
              loop: true,
              easing: 'easeInOutSine',
              duration: 2000,
              delay: anime.stagger(200)
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  return (
    <section ref={containerRef} id="features" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 sm:mb-20">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-stone-400 dark:text-stone-500 mb-4">
            Solusi Terpadu
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-stone-900 to-stone-600 dark:from-white dark:to-stone-400 tracking-tight pb-2">
            Dirancang untuk <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-amber-500">Transparansi</span>
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 auto-rows-[minmax(280px,auto)]">
          {/* Bento Item 1: Large Span */}
          <div className="bento-item opacity-0 group md:col-span-2 p-8 sm:p-10 rounded-[2.5rem] bg-stone-50 dark:bg-white/[0.02] border border-stone-200/50 dark:border-white/[0.05] hover:bg-white dark:hover:bg-white/[0.04] transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-amber-500/10 dark:bg-amber-500/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/4 group-hover:bg-amber-500/20 transition-colors"></div>
            
            <div className="relative z-10">
              <div className="bento-icon-container w-16 h-16 bg-amber-500/10 dark:bg-amber-500/20 rounded-2xl flex items-center justify-center mb-8 border border-amber-500/20 backdrop-blur-sm">
                <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                </svg>
              </div>
              <h3 className="text-3xl font-extrabold mb-4 text-stone-900 dark:text-white">Presisi Geospasial</h3>
              <p className="text-stone-500 dark:text-stone-400 text-lg leading-relaxed font-medium max-w-lg">
                Pemetaan lokasi otomatis dengan akurasi satelit tinggi, memastikan tim teknis tiba di titik yang tepat tanpa hambatan atau kebingungan koordinat.
              </p>
            </div>
            
            <div className="relative z-10 mt-8 h-32 w-full bg-stone-200/50 dark:bg-white/5 rounded-2xl border border-stone-200 dark:border-white/10 overflow-hidden flex items-center justify-center">
               <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-10 pointer-events-none" />
               <div className="w-12 h-12 bg-white dark:bg-black rounded-full flex items-center justify-center shadow-lg border border-stone-200 dark:border-white/10">
                  <div className="w-4 h-4 bg-amber-500 rounded-full animate-ping absolute" />
                  <div className="w-4 h-4 bg-amber-500 rounded-full relative z-10" />
               </div>
            </div>
          </div>

          {/* Bento Item 2 */}
          <div className="bento-item opacity-0 group p-8 sm:p-10 rounded-[2.5rem] bg-stone-50 dark:bg-white/[0.02] border border-stone-200/50 dark:border-white/[0.05] hover:bg-white dark:hover:bg-white/[0.04] transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-colors"></div>
            <div className="relative z-10 flex-1">
              <div className="bento-icon-container w-16 h-16 bg-blue-500/10 dark:bg-blue-500/20 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/20 backdrop-blur-sm">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold mb-4 text-stone-900 dark:text-white">Validasi AI Otomatis</h3>
              <p className="text-stone-500 dark:text-stone-400 leading-relaxed font-medium">
                Kecerdasan buatan menyaring laporan duplikat dan memprioritaskan masalah secara real-time.
              </p>
            </div>
          </div>

          {/* Bento Item 3 */}
          <div className="bento-item opacity-0 group p-8 sm:p-10 rounded-[2.5rem] bg-stone-50 dark:bg-white/[0.02] border border-stone-200/50 dark:border-white/[0.05] hover:bg-white dark:hover:bg-white/[0.04] transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden flex flex-col md:col-span-3">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-emerald-500/10 to-transparent blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <div className="bento-icon-container w-16 h-16 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/20 backdrop-blur-sm">
                  <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
                  </svg>
                </div>
                <h3 className="text-3xl font-extrabold mb-4 text-stone-900 dark:text-white">Ekosistem Gamifikasi</h3>
                <p className="text-stone-500 dark:text-stone-400 text-lg leading-relaxed font-medium max-w-2xl">
                  Setiap kontribusi dihargai. Kumpulkan poin reputasi, raih lencana eksklusif, dan bersaing secara positif di Leaderboard.
                </p>
              </div>
              
              <div className="w-full md:w-auto shrink-0 group-hover:scale-105 transition-transform duration-500">
                <div className="flex items-center gap-5 bg-white/80 dark:bg-white/[0.05] p-6 rounded-3xl border border-stone-200 dark:border-white/10 backdrop-blur-md shadow-xl">
                  <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(245,158,11,0.2)]">🏆</div>
                  <div>
                    <div className="text-lg font-black text-stone-900 dark:text-white mb-1 tracking-tight">Reputasi +50</div>
                    <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Laporan tervalidasi</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
