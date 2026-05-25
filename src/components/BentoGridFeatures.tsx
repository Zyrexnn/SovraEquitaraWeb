"use client";
import React, { useEffect, useRef, useState } from "react";
import anime from "animejs";

export const BentoGridFeatures = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State for AI Validation Logs
  const [logs, setLogs] = useState<string[]>([
    "⚙️ [SYSTEM]: Initializing Civic-AI validator..."
  ]);
  const logSequence = [
    "🔍 [AI]: Metadata scanning... OK",
    "📷 [AI]: Photo analysis: Validated signature (98% confidence)",
    "🚫 [AI]: Duplication check: 0 matches found",
    "🗺️ [AI]: Mapping to coordinate cluster...",
    "🚀 [AI]: Auto-routing to: Dinas PUPR Kota",
    "✅ [SYSTEM]: Validation complete. Waiting approval."
  ];

  useEffect(() => {
    // Staggered log simulator
    let index = 0;
    const interval = setInterval(() => {
      setLogs((prev) => {
        const next = [...prev, logSequence[index]];
        if (next.length > 4) next.shift(); // Keep logs clean and compact
        return next;
      });
      index = (index + 1) % logSequence.length;
    }, 2800);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Anime.js Stagger for grid items
            anime({
              targets: ".bento-item",
              translateY: [40, 0],
              opacity: [0, 1],
              scale: [0.98, 1],
              easing: "easeOutElastic(1, .85)",
              duration: 1000,
              delay: anime.stagger(120, { start: 100 })
            });

            // Float effect for icons
            anime({
              targets: ".bento-icon-container",
              translateY: [-6, 6],
              direction: "alternate",
              loop: true,
              easing: "easeInOutSine",
              duration: 2200,
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
      clearInterval(interval);
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  return (
    <section ref={containerRef} id="features" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black transition-colors duration-300 relative overflow-hidden">
      {/* Visual background decorations */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 sm:mb-20">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-stone-400 dark:text-stone-500 mb-4 bg-stone-100 dark:bg-white/5 px-3 py-1 rounded-full">
            Fitur Cerdas
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-stone-900 to-stone-600 dark:from-white dark:to-stone-400 tracking-tight pb-2">
            Dirancang untuk <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-amber-500">Transparansi</span>
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 auto-rows-[minmax(280px,auto)]">
          
          {/* Card 1: Geospatial Precision (Radar Graphic) */}
          <div className="bento-item opacity-0 group md:col-span-2 p-8 sm:p-10 rounded-[2.5rem] bg-stone-50 dark:bg-[#0B0B0F] border border-stone-200/50 dark:border-white/[0.04] hover:bg-white dark:hover:bg-[#101015] transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/5 hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-[35rem] h-[35rem] bg-amber-500/10 dark:bg-amber-500/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/4 group-hover:bg-amber-500/20 transition-colors pointer-events-none" />
            
            <div className="relative z-10">
              <div className="bento-icon-container w-16 h-16 bg-amber-500/10 dark:bg-amber-500/20 rounded-2xl flex items-center justify-center mb-8 border border-amber-500/20 backdrop-blur-sm shadow-md">
                <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                </svg>
              </div>
              <h3 className="text-3xl font-extrabold mb-4 text-stone-900 dark:text-white tracking-tight">Presisi Geospasial</h3>
              <p className="text-stone-500 dark:text-stone-400 text-base sm:text-lg leading-relaxed font-semibold max-w-lg">
                Pemetaan lokasi otomatis dengan akurasi satelit tinggi, memastikan tim teknis tiba di titik yang tepat tanpa hambatan atau kebingungan koordinat.
              </p>
            </div>
            
            {/* Interactive Vector Radar Scan Widget */}
            <div className="relative z-10 mt-8 h-40 sm:h-44 w-full bg-stone-150/40 dark:bg-black/50 rounded-3xl border border-stone-200 dark:border-white/5 overflow-hidden flex items-center justify-center shadow-inner">
               <div className="absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-10 pointer-events-none" />
               
               {/* Radar Concentric Circles */}
               <div className="absolute w-36 h-36 border border-amber-500/20 rounded-full animate-pulse" />
               <div className="absolute w-24 h-24 border border-dashed border-amber-500/30 rounded-full" />
               <div className="absolute w-12 h-12 border border-amber-500/40 rounded-full" />
               
               {/* Radar Sweeping Line */}
               <div className="absolute w-40 h-40 rounded-full overflow-hidden flex items-center justify-center animate-[spin_5s_linear_infinite]">
                 <div className="w-1/2 h-full bg-gradient-to-r from-transparent to-amber-500/25 origin-right translate-x-[-50%] clip-path-half" />
               </div>
               
               {/* Center pulsing radar dot */}
               <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center shadow-lg border border-amber-500/30 relative">
                  <div className="w-3.5 h-3.5 bg-amber-500 rounded-full animate-ping absolute" />
                  <div className="w-3.5 h-3.5 bg-amber-500 rounded-full relative z-10 shadow-[0_0_10px_rgba(245,158,11,0.6)]" />
               </div>

               {/* Random Radar Targets */}
               <div className="absolute top-8 left-1/4 w-2 h-2 bg-amber-500/40 rounded-full animate-ping" />
               <div className="absolute bottom-8 right-1/3 w-2.5 h-2.5 bg-amber-500/60 rounded-full animate-pulse" />

               {/* Grid Metrics overlay */}
               <div className="absolute bottom-3 left-4 font-mono text-[9px] sm:text-[10px] text-amber-500/70 dark:text-amber-500/50 flex gap-4 uppercase font-bold tracking-wider">
                 <span>SYS: OK</span>
                 <span>LAT: -6.2088</span>
                 <span>LNG: 106.8456</span>
               </div>
            </div>
          </div>

          {/* Card 2: AI Validation (Terminal Log Widget) */}
          <div className="bento-item opacity-0 group p-8 sm:p-10 rounded-[2.5rem] bg-stone-50 dark:bg-[#0B0B0F] border border-stone-200/50 dark:border-white/[0.04] hover:bg-white dark:hover:bg-[#101015] transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-colors pointer-events-none" />
            
            <div className="relative z-10 flex-1 flex flex-col justify-between">
              <div>
                <div className="bento-icon-container w-16 h-16 bg-blue-500/10 dark:bg-blue-500/20 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/20 backdrop-blur-sm shadow-md">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-extrabold mb-4 text-stone-900 dark:text-white tracking-tight">Validasi AI Otomatis</h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed font-semibold mb-6">
                  Kecerdasan buatan menyaring laporan duplikat dan memprioritaskan masalah secara real-time.
                </p>
              </div>
              
              {/* Futuristic Terminal Log Mock */}
              <div className="relative h-32 w-full bg-black/80 dark:bg-black/90 rounded-2xl border border-white/5 font-mono text-[10px] sm:text-xs text-blue-400 p-4 overflow-hidden select-none shadow-xl flex flex-col gap-1.5 justify-end">
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-80" />
                
                {/* Rolling validation logs */}
                {logs.map((log, i) => (
                  <div key={i} className="animate-[slideIn_0.3s_ease-out_both] whitespace-nowrap overflow-hidden text-ellipsis font-bold">
                    {log}
                  </div>
                ))}
                
                {/* Pulsing prompt cursor */}
                <div className="flex items-center gap-1 font-bold text-stone-500">
                  <span>$ running diagnostics</span>
                  <span className="w-1.5 h-3 bg-blue-500 animate-pulse" />
                </div>
                
                {/* Glowing AI Scanning Line */}
                <div className="absolute inset-x-0 h-[2px] bg-blue-500/30 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-[scan_2s_ease-in-out_infinite] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Card 3: Gamification Ecosystem (Trophy Card & Level Meter) */}
          <div className="bento-item opacity-0 group p-8 sm:p-10 rounded-[2.5rem] bg-stone-50 dark:bg-[#0B0B0F] border border-stone-200/50 dark:border-white/[0.04] hover:bg-white dark:hover:bg-[#101015] transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/5 hover:-translate-y-1 relative overflow-hidden flex flex-col md:col-span-3">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-emerald-500/10 to-transparent blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="flex-1">
                <div className="bento-icon-container w-16 h-16 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/20 backdrop-blur-sm shadow-md">
                  <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
                  </svg>
                </div>
                <h3 className="text-3xl font-extrabold mb-4 text-stone-900 dark:text-white tracking-tight">Ekosistem Gamifikasi</h3>
                <p className="text-stone-500 dark:text-stone-400 text-base sm:text-lg leading-relaxed font-semibold max-w-2xl">
                  Setiap kontribusi dihargai. Kumpulkan poin reputasi, raih lencana eksklusif, dan bersaing secara positif di Leaderboard.
                </p>
              </div>
              
              {/* Gamification Interactive Widgets side-by-side */}
              <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row gap-5 items-stretch">
                {/* Widget 1: Floating Profile & Level Up */}
                <div className="flex items-center gap-4 bg-white/80 dark:bg-black/40 border border-stone-200/50 dark:border-white/10 p-5 rounded-[2rem] shadow-xl backdrop-blur-md transition-all duration-300 group-hover:border-emerald-500/25">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 p-0.5 shadow-md">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Avatar" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-stone-900 dark:bg-white text-white dark:text-black text-[9px] font-black rounded-full flex items-center justify-center border border-white dark:border-black shadow-md">Lvl 4</div>
                  </div>
                  <div className="flex-1 min-w-[140px] sm:min-w-[160px]">
                    <div className="text-[9px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest">Warga Teladan</div>
                    <div className="text-sm font-extrabold text-stone-900 dark:text-white mt-0.5">Siti Aminah</div>
                    <div className="w-full bg-stone-200 dark:bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full w-[85%] relative">
                        <div className="absolute inset-0 bg-white/30 animate-pulse" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-[9px] text-stone-400 mt-1 font-bold">
                      <span>850 / 1000 Poin</span>
                      <span className="text-amber-500 font-extrabold">+150 XP</span>
                    </div>
                  </div>
                </div>

                {/* Widget 2: 3D Trophy Card */}
                <div className="flex items-center gap-4 bg-white/80 dark:bg-black/40 border border-stone-200/50 dark:border-white/10 p-5 rounded-[2rem] shadow-xl backdrop-blur-md group-hover:scale-[1.03] transition-transform duration-500">
                  <div className="w-14 h-14 bg-amber-500/20 rounded-2xl flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(245,158,11,0.25)] relative overflow-hidden group-hover:animate-bounce">
                    <span className="relative z-10">🏆</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  </div>
                  <div>
                    <div className="text-base font-black text-stone-900 dark:text-white mb-0.5 tracking-tight">Reputasi +50</div>
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Laporan Tervalidasi</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Keyframe Custom Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0%, 100% { top: 0%; }
          50% { top: 98%; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </section>
  );
};
