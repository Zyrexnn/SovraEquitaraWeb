"use client";
import React from "react";
import { motion } from "framer-motion";
import { Camera, ShieldCheck, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Lapor",
    subtitle: "Portal Warga",
    description: "Ambil foto, tandai lokasi, dan kirim laporan infrastruktur di sekitar Anda dalam hitungan detik.",
    icon: <Camera className="w-8 h-8" strokeWidth={2.5} />,
    color: "amber",
  },
  {
    number: "02",
    title: "Verifikasi",
    subtitle: "Proses Verifikasi",
    description: "Laporan Anda akan melalui proses verifikasi untuk memastikan keabsahan dan menghindari laporan ganda.",
    icon: <ShieldCheck className="w-8 h-8" strokeWidth={2.5} />,
    color: "blue",
  },
  {
    number: "03",
    title: "Selesai",
    subtitle: "Tindak Lanjut",
    description: "Tim kota menindaklanjuti perbaikan. Pantau progres real-time dan berikan persetujuan saat selesai.",
    icon: <CheckCircle className="w-8 h-8" strokeWidth={2.5} />,
    color: "green",
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; glow: string; badge: string }> = {
  amber: {
    bg: "bg-amber-500/10 dark:bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-500/20 dark:border-amber-500/10",
    glow: "shadow-[0_0_30px_rgba(245,158,11,0.15)] group-hover:shadow-[0_0_50px_rgba(245,158,11,0.35)]",
    badge: "bg-amber-500 text-white dark:bg-amber-400 dark:text-stone-950",
  },
  blue: {
    bg: "bg-blue-500/10 dark:bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500/20 dark:border-blue-500/10",
    glow: "shadow-[0_0_30px_rgba(59,130,246,0.15)] group-hover:shadow-[0_0_50px_rgba(59,130,246,0.35)]",
    badge: "bg-blue-500 text-white dark:bg-blue-400 dark:text-stone-950",
  },
  green: {
    bg: "bg-emerald-500/10 dark:bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/20 dark:border-emerald-500/10",
    glow: "shadow-[0_0_30px_rgba(16,185,129,0.15)] group-hover:shadow-[0_0_50px_rgba(16,185,129,0.35)]",
    badge: "bg-emerald-500 text-white dark:bg-emerald-400 dark:text-stone-950",
  },
};

export const HowItWorks = () => {
  return (
    <section id="how" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#fbfbfb] dark:bg-[#010101] border-y border-stone-200/30 dark:border-white/[0.02] transition-colors duration-300 relative overflow-hidden">
      {/* Decorative grids */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 sm:mb-24"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-stone-400 dark:text-stone-500 mb-4 bg-stone-100 dark:bg-white/5 px-3 py-1 rounded-full">
            Alur Sistem
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-stone-900 to-stone-600 dark:from-white dark:to-stone-400 tracking-tight pb-2">
            Bagaimana SovraEquitara <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-amber-500">Bekerja</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-6 lg:gap-10 relative">
          
          {/* Glowing Animated Laser Flow Connection (desktop) */}
          <div className="hidden md:block absolute top-[6.5rem] left-[15%] right-[15%] h-[3px] -translate-y-1/2 pointer-events-none">
            {/* Ambient background pipe line */}
            <div className="w-full h-full bg-stone-200 dark:bg-white/10 rounded-full" />
            
            {/* Dynamic neon gradient flow line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="absolute inset-0 bg-gradient-to-r from-amber-500 via-blue-500 to-emerald-500 origin-left rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            />
            
            {/* Flowing Laser Particle Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-blue-500 to-emerald-500 rounded-full animate-[flow_3s_linear_infinite] bg-[length:200%_auto] pointer-events-none" />
          </div>

          {steps.map((step, i) => {
            const colors = colorMap[step.color];
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-white/70 dark:bg-[#0B0B0F] border border-stone-200/50 dark:border-white/[0.04] backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-stone-200/50 dark:hover:shadow-black/70 hover:bg-white dark:hover:bg-[#101015] group"
              >
                {/* Decorative absolute circle layout details */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full opacity-50 pointer-events-none" />
                
                {/* Glowing Icon Circle */}
                <div className={`relative w-24 h-24 rounded-[2rem] ${colors.bg} border ${colors.border} flex items-center justify-center mb-8 transition-all duration-500 ${colors.glow} group-hover:scale-105`}>
                  <div className={`${colors.text} transition-transform duration-500 group-hover:scale-110`}>{step.icon}</div>
                  
                  {/* Glowing Ring Outer Orbit */}
                  <div className="absolute inset-0 rounded-[2rem] border border-dashed border-stone-300 dark:border-white/10 scale-110 animate-[spin_20s_linear_infinite] pointer-events-none" />
                  
                  {/* Step number badge */}
                  <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-2xl ${colors.badge} flex items-center justify-center font-black text-xs shadow-md border border-white dark:border-stone-900`}>
                    <span>{step.number}</span>
                  </div>
                </div>

                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500 mb-2">
                  {step.subtitle}
                </div>
                <h3 className="text-2xl font-extrabold text-stone-900 dark:text-white mb-4 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed max-w-[260px] font-semibold">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Embedded CSS for gradient flow connecting laser */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes flow {
          0% { background-position: 0% 50%; }
          100% { background-position: -200% 50%; }
        }
      `}} />
    </section>
  );
};
