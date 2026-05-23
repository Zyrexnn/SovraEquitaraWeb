"use client";
import React from "react";
import { motion } from "framer-motion";
import dashboardUser from "../assets/dashboarduser.png";
import dashboardSuperadmin from "../assets/dashboard-superadmin.png";

export const DashboardShowcase = () => {
  return (
    <section className="relative py-8 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-zen-bg dark:bg-zen-bg-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="relative max-w-6xl mx-auto">
          
          {/* Secondary Dashboard Mockup (Superadmin) in background */}
          <motion.div
            initial={{ opacity: 0, x: 50, y: 30, rotate: 2 }}
            whileInView={{ opacity: 0.6, x: 40, y: -40, rotate: 4 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute top-0 right-0 z-0 w-[85%] rounded-2xl sm:rounded-3xl shadow-lg border border-stone-200 dark:border-white/10 bg-white dark:bg-white/5 p-2 sm:p-3 hidden md:block"
          >
            <div className="flex items-center gap-1.5 mb-2 px-2">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-stone-300 dark:bg-stone-600" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-stone-300 dark:bg-stone-600" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-stone-300 dark:bg-stone-600" />
            </div>
            <img 
              src={typeof dashboardSuperadmin === "string" ? dashboardSuperadmin : dashboardSuperadmin.src} 
              alt="Superadmin Dashboard" 
              className="w-full rounded-lg border border-stone-100 dark:border-white/5 opacity-80"
            />
          </motion.div>

          {/* Main Dashboard Image with Tilt Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotateX: 8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 rounded-2xl sm:rounded-3xl shadow-2xl dark:shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-stone-200 dark:border-white/10 bg-white dark:bg-white/5 p-2 sm:p-4 backdrop-blur-md"
          >
            {/* Browser Header Mockup */}
            <div className="flex items-center gap-1.5 mb-2 sm:mb-4 px-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-400/80" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-400/80" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400/80" />
                <div className="ml-4 h-4 sm:h-6 flex-1 max-w-xs bg-stone-100 dark:bg-white/10 rounded-lg flex items-center px-3">
                  <span className="text-[9px] text-stone-400 dark:text-stone-500 font-mono truncate">sovraequitara.app/dashboard</span>
                </div>
            </div>
            
            <img 
              src={typeof dashboardUser === "string" ? dashboardUser : dashboardUser.src} 
              alt="SovraEquitara Dashboard" 
              className="w-full rounded-xl border border-stone-100 dark:border-white/5 shadow-2xl"
            />

            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 sm:-left-10 top-1/4 z-20 bg-white dark:bg-zen-card-dark p-3 sm:p-4 rounded-2xl shadow-large border border-stone-100 dark:border-white/10 hidden md:flex items-center gap-3"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-500/15 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <div>
                <p className="text-[9px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-[0.2em] leading-none mb-1">Status</p>
                <p className="text-xs sm:text-sm font-extrabold text-stone-900 dark:text-white">AI Verified</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute -right-4 sm:-right-10 bottom-1/4 z-20 bg-white dark:bg-zen-card-dark p-3 sm:p-4 rounded-2xl shadow-large border border-stone-100 dark:border-white/10 hidden md:flex items-center gap-3"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-amber-500/15 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                </svg>
              </div>
              <div>
                <p className="text-[9px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-[0.2em] leading-none mb-1">Presisi</p>
                <p className="text-xs sm:text-sm font-extrabold text-stone-900 dark:text-white">Geo-Location</p>
              </div>
            </motion.div>

            {/* New: Report count badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -right-4 sm:-right-8 top-[15%] z-20 bg-white dark:bg-zen-card-dark px-4 py-2.5 rounded-2xl shadow-large border border-stone-100 dark:border-white/10 hidden lg:flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-extrabold text-stone-900 dark:text-white">+47 Laporan Hari Ini</span>
            </motion.div>
          </motion.div>

          {/* Decorative Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-500/5 dark:bg-amber-500/[0.02] blur-[120px] rounded-full -z-10" />
        </div>
      </div>
    </section>
  );
};
