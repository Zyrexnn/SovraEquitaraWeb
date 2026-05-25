"use client";
import React, { useEffect, useRef } from "react";
import anime from "animejs";
import LineWaves from './LineWaves';
import { DecryptedText } from './DecryptedText';

export const AnimeHero = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // 1. Text Splitter for Stagger Animation
    const title = headlineRef.current;
    if (title && !title.classList.contains("anime-ready")) {
      const words = title.innerText.split(' ');
      title.innerHTML = '';
      words.forEach((word) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'inline-block overflow-hidden mr-[0.25em]';
        word.split('').forEach((char) => {
          const charSpan = document.createElement('span');
          charSpan.className = 'letter inline-block translate-y-[1.1em] opacity-0';
          charSpan.innerText = char;
          wordSpan.appendChild(charSpan);
        });
        title.appendChild(wordSpan);
      });
      title.classList.add("anime-ready");

      // 2. Main Timeline
      const tl = anime.timeline({ loop: false });

      tl.add({
        targets: '.letter',
        translateY: ['1.1em', 0],
        opacity: [0, 1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 1400,
        delay: (el, i) => 20 * i
      })
      .add({
        targets: textRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        easing: "easeOutQuint",
        duration: 1200
      }, '-=800')
      .add({
        targets: ctaRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.95, 1],
        easing: "easeOutBack",
        duration: 1000
      }, '-=800');
    }
  }, []);

  return (
    <div className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden z-10 perspective-1000 bg-stone-50 dark:bg-black transition-colors duration-300">
      {/* Background Abstract Geometry */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 transition-all duration-300">
        <div className="absolute inset-0 opacity-30 dark:opacity-60 invert dark:invert-0 transition-all duration-300">
          <LineWaves
            speed={0.3}
            innerLineCount={32}
            outerLineCount={36}
            warpIntensity={1.0}
            rotation={-45}
            edgeFadeWidth={0.0}
            colorCycleSpeed={1.0}
            brightness={0.2}
            color1="#ffffff"
            color2="#ffffff"
            color3="#ffffff"
            enableMouseInteraction={true}
            mouseInfluence={2.0}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-50/50 to-white dark:via-black/50 dark:to-black pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-white/5 border border-stone-200/50 dark:border-white/10 rounded-full mb-8 backdrop-blur-md shadow-sm opacity-0 animate-[fadeIn_1s_ease-out_forwards] transition-all hover:bg-white dark:hover:bg-white/10">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.5)]"></span>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-stone-700 dark:text-stone-300">Civic Tech Innovation 2026</span>
        </div>

        {/* Hero Headline */}
        <h1 ref={headlineRef} className="text-5xl sm:text-7xl lg:text-8xl font-black text-center tracking-tight text-stone-900 dark:text-white leading-[1.05] mb-8 max-w-5xl will-change-transform pb-2">
          Infrastruktur Cerdas Untuk Kota Masa Depan
        </h1>

        {/* Hero Text */}
        <p ref={textRef} className="text-lg sm:text-2xl text-stone-700 dark:text-stone-300 max-w-3xl text-center font-medium leading-relaxed opacity-0 mb-12 will-change-transform">
          <DecryptedText 
            text="Platform tata kelola kota yang transparan, digerakkan oleh partisipasi aktif warga, dan divalidasi oleh kecerdasan buatan." 
            speed={35} 
            maxIterations={20} 
          />
        </p>

        {/* Hero CTA */}
        <div ref={ctaRef} id="hero-cta" className="opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full will-change-transform">
          {/* Default CTA if not injected by auth script */}
          <a href="/register" className="inline-flex items-center justify-center px-8 py-4 bg-stone-900 text-white dark:bg-white dark:text-black rounded-2xl font-bold text-base sm:text-lg hover:scale-105 active:scale-95 transition-all shadow-xl dark:shadow-[0_0_30px_rgba(255,255,255,0.15)] w-full sm:w-auto">
            Mulai Lapor Gratis
          </a>
          <a href="#how" className="inline-flex items-center justify-center px-8 py-4 bg-white/80 text-stone-900 dark:bg-white/5 dark:text-white border border-stone-200/50 dark:border-white/10 backdrop-blur-xl rounded-2xl font-bold text-base sm:text-lg hover:bg-white dark:hover:bg-white/10 active:scale-95 transition-all shadow-sm w-full sm:w-auto">
            Pelajari Sistem
          </a>
        </div>
      </div>
    </div>
  );
};
