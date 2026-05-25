'use client';

import * as React from 'react';
import { ElevatedCarousel } from './animate-ui/components/community/elevated-carousel';
import { motion } from 'framer-motion';

const DUMMY_REPORTS = [
  {
    id: 1,
    title: "Jalan Berlubang di Sudirman Sangat Berbahaya bagi Pemotor",
    location: "Kecamatan Setiabudi",
    time: "2 jam yang lalu",
    status: "pending",
    votes: 124,
    image: "https://picsum.photos/seed/pothole/600/800",
    category: "Infrastruktur"
  },
  {
    id: 2,
    title: "Lampu PJU Mati Total di Sepanjang Jalan Gatot Subroto",
    location: "Jalan Gatot Subroto",
    time: "5 jam yang lalu",
    status: "proses",
    votes: 89,
    image: "https://picsum.photos/seed/lampu/600/800",
    category: "Fasilitas Umum"
  },
  {
    id: 3,
    title: "Tumpukan Sampah Liar Mengganggu Kenyamanan Warga",
    location: "Pasar Minggu",
    time: "1 hari yang lalu",
    status: "selesai",
    votes: 256,
    image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=600",
    category: "Lingkungan"
  },
  {
    id: 4,
    title: "Pohon Tumbang Menutupi Akses Jalan Utama",
    location: "Kebayoran Baru",
    time: "30 menit yang lalu",
    status: "pending",
    votes: 45,
    image: "https://picsum.photos/seed/pohon/600/800",
    category: "Bencana"
  },
  {
    id: 5,
    title: "Trotoar Rusak Parah Susah Dilewati Pejalan Kaki",
    location: "Cilandak",
    time: "2 hari yang lalu",
    status: "proses",
    votes: 112,
    image: "https://picsum.photos/seed/trotoar/600/800",
    category: "Infrastruktur"
  }
];

export const CitizenReportsCarousel = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-stone-50 dark:bg-[#050505] border-y border-stone-200/50 dark:border-white/10 transition-colors duration-300">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-stone-100/80 via-transparent to-stone-100/80 dark:from-black/80 dark:via-transparent dark:to-black/80 pointer-events-none transition-colors duration-300" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200/50 dark:bg-white/5 border border-stone-300/50 dark:border-white/10 text-xs font-bold text-stone-600 dark:text-stone-300 uppercase tracking-widest mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Pantauan Langsung
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-stone-900 to-stone-600 dark:from-white dark:to-stone-400 mb-6 tracking-tight pb-2 drop-shadow-xl">
            Laporan <span className="text-amber-500">Warga</span> Terkini
          </h2>
          <p className="text-stone-600 dark:text-stone-300 max-w-2xl mx-auto text-lg sm:text-xl font-medium mb-12 drop-shadow-md">
            Lihat apa yang terjadi di sekitarmu. Dukung laporan sesama warga untuk mempercepat tindak lanjut pemerintah.
          </p>
        </motion.div>
      </div>

      <div className="w-full relative z-10 -mt-10">
        <ElevatedCarousel 
          items={DUMMY_REPORTS} 
          cardWidth={300}
          cardHeight={400}
          elevationOffset={40}
          cardGap={32}
        />
      </div>
    </section>
  );
};
