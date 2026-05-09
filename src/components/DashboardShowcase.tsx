"use client";
import React from "react";
import { motion } from "framer-motion";

export const DashboardShowcase = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-zen-bg dark:bg-zen-bg-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-zen-text dark:text-zen-text-dark mb-6 tracking-tight"
          >
            Monitor Seluruh Kota <br /> dari Genggaman Anda.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zen-text-secondary dark:text-zen-text-secondary-dark text-lg max-w-2xl mx-auto font-medium"
          >
            Dashboard admin yang intuitif memungkinkan Anda mengelola ribuan laporan warga dengan efisiensi tinggi dan verifikasi AI otomatis.
          </motion.p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Dashboard Image with Tilt Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 rounded-2xl shadow-xl dark:shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-stone-200 dark:border-white/10 bg-white dark:bg-white/5 p-2 sm:p-4 backdrop-blur-md"
          >
            {/* Browser Header Mockup */}
            <div className="flex items-center gap-1.5 mb-2 sm:mb-4 px-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-400/80" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-400/80" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400/80" />
                <div className="ml-4 h-4 sm:h-6 w-32 sm:w-64 bg-stone-100 dark:bg-white/10 rounded-md" />
            </div>
            
            <img 
              src="/dashboard.svg" 
              alt="SovraEquitara Dashboard" 
              className="w-full rounded-xl border border-stone-100 dark:border-white/5 shadow-2xl"
            />

            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 sm:-left-12 top-1/4 z-20 bg-zen-card dark:bg-zen-card-dark p-3 sm:p-4 rounded-2xl shadow-2xl border border-zen-border dark:border-zen-border-dark hidden md:flex items-center gap-3"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-bold text-stone-400 dark:text-gray-500 uppercase tracking-widest leading-none mb-1">Status</p>
                <p className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white">AI Verified</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-4 sm:-right-12 bottom-1/4 z-20 bg-zen-card dark:bg-zen-card-dark p-3 sm:p-4 rounded-2xl shadow-2xl border border-zen-border dark:border-zen-border-dark hidden md:flex items-center gap-3"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-500/20 dark:bg-brand/20 rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500 dark:text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-bold text-stone-400 dark:text-gray-500 uppercase tracking-widest leading-none mb-1">Precision</p>
                <p className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white">Geo-Location</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Decorative Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-500/10 dark:bg-amber-500/5 blur-[120px] rounded-full -z-10" />
        </div>
      </div>
    </section>
  );
};
