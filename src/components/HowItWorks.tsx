"use client";
import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Lapor",
    description: "Ambil foto, tandai lokasi, dan kirim laporan infrastruktur di sekitar Anda dalam hitungan detik.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
    color: "amber",
  },
  {
    number: "02",
    title: "Verifikasi",
    description: "AI kami memvalidasi laporan secara otomatis — mendeteksi duplikat, memverifikasi foto, dan memetakan prioritas.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    color: "blue",
  },
  {
    number: "03",
    title: "Selesai",
    description: "Tim kota menindaklanjuti perbaikan. Pantau progres real-time dan berikan persetujuan saat selesai.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    color: "green",
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; line: string }> = {
  amber: {
    bg: "bg-amber-500/10 dark:bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-500/20 dark:border-amber-500/20",
    line: "from-amber-500/40",
  },
  blue: {
    bg: "bg-blue-500/10 dark:bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500/20 dark:border-blue-500/20",
    line: "from-blue-500/40",
  },
  green: {
    bg: "bg-emerald-500/10 dark:bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/20 dark:border-emerald-500/20",
    line: "from-emerald-500/40",
  },
};

export const HowItWorks = () => {
  return (
    <section id="how" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-zen-bg dark:bg-zen-bg-dark transition-colors duration-300 relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-stone-400 dark:text-stone-500 mb-4">
            Cara Kerja
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-stone-900 to-stone-600 dark:from-white dark:to-stone-400 tracking-tight pb-2">
            Bagaimana SovraEquitara <span className="text-blue-500">Bekerja</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-[4.5rem] left-[16.66%] right-[16.66%] h-px">
            <div className="w-full h-full bg-gradient-to-r from-amber-500/20 via-blue-500/20 to-emerald-500/20" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              className="absolute inset-0 bg-gradient-to-r from-amber-500/60 via-blue-500/60 to-emerald-500/60 origin-left"
            />
          </div>

          {steps.map((step, i) => {
            const colors = colorMap[step.color];
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Icon circle */}
                <div className={`relative w-[5.5rem] h-[5.5rem] rounded-3xl ${colors.bg} border ${colors.border} flex items-center justify-center mb-8 group-hover:scale-105 transition-transform duration-300`}>
                  <div className={colors.text}>{step.icon}</div>
                  {/* Step number badge */}
                  <div className={`absolute -top-2 -right-2 w-7 h-7 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                    <span className={`text-[10px] font-extrabold ${colors.text}`}>{step.number}</span>
                  </div>
                </div>

                <h3 className="text-xl font-extrabold text-stone-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed max-w-[280px] font-medium">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
