"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Report {
  id: string;
  title: string;
  description?: string;
  category?: string;
  category_name?: string;
  status: string;
  location?: string;
  image_url?: string;
  created_at: string;
  vote_count?: number;
  user?: {
    full_name: string;
    avatar_url?: string;
  };
}

const FALLBACK_DATA: Report[] = [
  {
    id: "1",
    title: "Jalan berlubang di Jl. Sudirman KM 5",
    category_name: "Jalan",
    status: "VALID",
    location: "Jl. Sudirman",
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    vote_count: 24,
    image_url: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400",
    user: { full_name: "Ahmad Rizky" },
  },
  {
    id: "2",
    title: "Lampu jalan mati di perempatan Tugu",
    category_name: "Penerangan",
    status: "PENDING",
    location: "Perempatan Tugu",
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    vote_count: 18,
    user: { full_name: "Budi Santoso", avatar_url: "https://i.pravatar.cc/150?u=2" },
  },
  {
    id: "3",
    title: "Saluran air tersumbat di komplek Griya Asri",
    category_name: "Drainase",
    status: "RESOLVED",
    location: "Komplek Griya Asri",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    vote_count: 31,
    image_url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400",
    user: { full_name: "Siti Nurhaliza" },
  },
  {
    id: "4",
    title: "Trotoar rusak di depan Pasar Minggu",
    category_name: "Trotoar",
    status: "VALID",
    location: "Pasar Minggu",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    vote_count: 12,
    user: { full_name: "Maya Putri", avatar_url: "https://i.pravatar.cc/150?u=4" },
  },
];

const statusConfig: Record<string, { label: string; dotClass: string; badgeClass: string }> = {
  PENDING: {
    label: "Menunggu",
    dotClass: "bg-amber-500",
    badgeClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  VALID: {
    label: "Terverifikasi",
    dotClass: "bg-blue-500",
    badgeClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  WAITING_APPROVAL: {
    label: "Menunggu Approval",
    dotClass: "bg-purple-500",
    badgeClass: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },
  RESOLVED: {
    label: "Selesai",
    dotClass: "bg-emerald-500",
    badgeClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
};

const timeAgo = (date: string) => {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "Baru saja";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  return `${days} hari lalu`;
};

const getInitials = (name: string) => {
  if (!name) return "U";
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
};

export const LiveReportsFeed = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:3000";
        const res = await fetch(`${API_URL}/api/public-reports`);
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        const list = data.data || data || [];
        setReports(list.slice(0, 4));
      } catch {
        setReports(FALLBACK_DATA);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const displayReports = reports.length > 0 ? reports : FALLBACK_DATA;

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-zen-bg dark:bg-zen-bg-dark transition-colors duration-300 relative overflow-hidden">
      {/* Decorative Gradients for "less plain" look */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-500/5 dark:bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-amber-500/5 dark:bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.15] dark:opacity-[0.03] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-stone-400 dark:text-stone-500 mb-4">
            Feed Langsung
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight mb-4">
            Laporan Terkini
          </h2>
          <p className="text-base sm:text-lg text-stone-500 dark:text-stone-400 max-w-xl mx-auto font-medium">
            Pantau aktivitas pelaporan warga yang sedang berlangsung dan berikan dukungan Anda
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="p-6 rounded-[2rem] bg-white dark:bg-white/[0.03] border border-stone-200 dark:border-white/[0.06] animate-pulse"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-stone-200 dark:bg-white/10 shrink-0" />
                    <div className="flex-1 mt-1">
                      <div className="w-24 h-3 bg-stone-200 dark:bg-white/10 rounded mb-4" />
                      <div className="w-full h-4 bg-stone-200 dark:bg-white/10 rounded mb-2" />
                      <div className="w-2/3 h-3 bg-stone-200 dark:bg-white/10 rounded" />
                    </div>
                  </div>
                </div>
              ))
            : displayReports.map((report, i) => {
                const status = statusConfig[report.status] || statusConfig.PENDING;
                const authorName = report.user?.full_name || "Warga Anonim";
                
                return (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="group flex flex-col p-6 rounded-[2rem] bg-white dark:bg-white/[0.03] border border-stone-200 dark:border-white/[0.06] hover:border-stone-300 dark:hover:border-white/10 transition-all hover:shadow-xl hover:-translate-y-1 overflow-hidden relative"
                  >
                    {/* Reporter Profile Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-full bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 overflow-hidden shrink-0 flex items-center justify-center text-xs font-bold text-stone-500">
                        {report.user?.avatar_url ? (
                          <img 
                            src={report.user.avatar_url} 
                            alt={authorName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=random`;
                            }}
                          />
                        ) : (
                          getInitials(authorName)
                        )}
                      </div>
                      <div className="flex-1 min-w-0 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-stone-900 dark:text-white truncate">
                            {authorName}
                          </p>
                          <p className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
                            {timeAgo(report.created_at)}
                          </p>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold border ${status.badgeClass} ml-2 shrink-0`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${status.dotClass}`} />
                          {status.label}
                        </span>
                      </div>
                    </div>

                    {/* Report Content */}
                    <div className="flex-1">
                      <h4 className="text-lg font-extrabold text-stone-900 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {report.title}
                      </h4>

                      {/* Optional Image to make it less "plain" */}
                      {report.image_url && (
                        <div className="w-full h-40 mb-4 rounded-xl overflow-hidden bg-stone-100 dark:bg-white/5">
                          <img 
                            src={report.image_url} 
                            alt={report.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            onError={(e) => {
                               e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Meta Footer */}
                    <div className="mt-4 pt-4 border-t border-stone-100 dark:border-white/[0.06] flex items-center gap-4 text-xs text-stone-500 dark:text-stone-400 font-medium">
                      {report.category_name || report.category ? (
                        <span className="flex items-center gap-1.5 bg-stone-100 dark:bg-white/5 px-2 py-1 rounded-md">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          {report.category_name || report.category}
                        </span>
                      ) : null}

                      {report.location && (
                        <span className="flex items-center gap-1.5 truncate">
                          <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="truncate">{report.location}</span>
                        </span>
                      )}

                      <div className="flex-1" />

                      {report.vote_count !== undefined && (
                        <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-500 font-bold bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded-md">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                          </svg>
                          {report.vote_count}
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
        </div>
      </div>
    </section>
  );
};
