"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Award } from "lucide-react";

interface LeaderboardUser {
  id: string;
  full_name: string;
  avatar_url?: string;
  points: number;
  role?: string;
}

const FALLBACK_DATA: LeaderboardUser[] = [
  { id: "1", full_name: "Ahmad Rizky", points: 2840 },
  { id: "2", full_name: "Siti Nurhaliza", points: 2350 },
  { id: "3", full_name: "Budi Santoso", points: 1920 },
  { id: "4", full_name: "Maya Putri", points: 1680 },
  { id: "5", full_name: "Dimas Prasetyo", points: 1450 },
];

const medals = [
  <Trophy key="gold" className="w-5 h-5 text-yellow-500 mx-auto" strokeWidth={2.5} />, 
  <Medal key="silver" className="w-5 h-5 text-gray-400 mx-auto" strokeWidth={2.5} />, 
  <Award key="bronze" className="w-5 h-5 text-amber-700 mx-auto" strokeWidth={2.5} />
];

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const LeaderboardPreview = () => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:3000";
        const res = await fetch(`${API_URL}/api/leaderboard`);
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        const list = data.data || data || [];
        setUsers(list.slice(0, 5));
      } catch {
        setUsers(FALLBACK_DATA);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const displayUsers = users.length > 0 ? users : FALLBACK_DATA;

  return (
    <section id="leaderboard" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#050505] transition-colors duration-300 border-t border-stone-200/50 dark:border-white/10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-stone-500 mb-4">
            Komunitas
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-stone-900 to-stone-600 dark:from-white dark:to-stone-400 tracking-tight pb-2 mb-4">
            Peringkat <span className="text-amber-500">Warga</span>
          </h2>
          <p className="text-base sm:text-lg text-stone-500 dark:text-stone-400 max-w-xl mx-auto font-medium">
            Warga yang paling aktif melaporkan masalah infrastruktur kota
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-stone-50 dark:bg-[#0a0a0a] border border-stone-200/50 dark:border-white/10 rounded-3xl overflow-hidden shadow-xl dark:shadow-2xl"
        >
          {/* Header */}
          <div className="px-6 sm:px-8 py-4 border-b border-stone-200/50 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                Leaderboard
              </span>
            </div>
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">
              Top 5
            </span>
          </div>

          {/* List */}
          <div className="divide-y divide-stone-200/50 dark:divide-white/5">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="px-6 sm:px-8 py-4 flex items-center gap-4 animate-pulse">
                    <div className="w-6 h-4 bg-stone-200 dark:bg-white/10 rounded" />
                    <div className="w-10 h-10 bg-stone-200 dark:bg-white/10 rounded-xl" />
                    <div className="flex-1">
                      <div className="w-28 h-3 bg-stone-200 dark:bg-white/10 rounded mb-1" />
                    </div>
                    <div className="w-16 h-4 bg-stone-200 dark:bg-white/10 rounded" />
                  </div>
                ))
              : displayUsers.map((user, i) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className={`px-6 sm:px-8 py-4 flex items-center gap-4 transition-colors hover:bg-stone-100/50 dark:hover:bg-white/[0.04] ${i === 0 ? "bg-amber-500/5 dark:bg-amber-500/10" : ""}`}
                  >
                    {/* Rank */}
                    <div className="w-6 text-center shrink-0">
                      {i < 3 ? (
                        <div className="flex items-center justify-center">{medals[i]}</div>
                      ) : (
                        <span className="text-sm font-extrabold text-stone-400 dark:text-stone-600">
                          {i + 1}
                        </span>
                      )}
                    </div>

                    {/* Avatar */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm ${
                      i === 0
                        ? "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400"
                        : i === 1
                        ? "bg-stone-200 text-stone-600 dark:bg-white/10 dark:text-stone-400"
                        : i === 2
                        ? "bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400"
                        : "bg-stone-100 text-stone-500 dark:bg-white/5 dark:text-stone-500"
                    }`}>
                      {user.avatar_url ? (
                        <img
                          src={user.avatar_url}
                          alt={user.full_name}
                          className="w-full h-full rounded-xl object-cover"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name)}&background=random`;
                          }}
                        />
                      ) : (
                        getInitials(user.full_name)
                      )}
                    </div>

                    {/* Name */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold truncate ${
                        i === 0 ? "text-stone-900 dark:text-white" : "text-stone-600 dark:text-stone-300"
                      }`}>
                        {user.full_name}
                      </p>
                    </div>

                    {/* Points */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className={`text-sm font-extrabold tabular-nums ${
                        i === 0 ? "text-amber-500 dark:text-amber-400" : "text-stone-500 dark:text-stone-400"
                      }`}>
                        {user.points.toLocaleString()}
                      </span>
                      <span className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase">
                        pts
                      </span>
                    </div>
                  </motion.div>
                ))}
          </div>

          {/* Footer */}
          <div className="px-6 sm:px-8 py-4 border-t border-stone-200/50 dark:border-white/10 text-center">
            <a
              href="/register"
              className="text-xs font-bold text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors uppercase tracking-[0.2em]"
            >
              Gabung & Raih Posisimu →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
