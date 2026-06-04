# 🪪 Identitas Project: SovraEquitara

## 1. Visi & Misi
**SovraEquitara** adalah platform tata kelola kota digital yang bertujuan untuk memberikan keadilan (Equitara) dalam pemenuhan infrastruktur publik. Platform ini dirancang untuk mendemokratisasi proses pelaporan masalah kota, memastikan setiap suara warga didengar, diproses, diselesaikan secara transparan, dan dimonitor secara real-time melalui sistem yang modern, terpusat, dan responsif.

---

## 2. Visual & Design Identity (Zen Minimalist Design System)
Platform ini mematuhi standar desain tingkat tinggi menggunakan **Zen Design System**, sebuah pendekatan desain antarmuka yang mengedepankan estetika premium, bersih, tenang, dan fungsional.

### A. Tipografi Modern
- **Display**: `Plus Jakarta Sans` & `Outfit` (Digunakan untuk *heading*, memberikan kesan modern, rapi, dan mudah dibaca).
- **Body**: `Inter` (Font standar industri yang dioptimalkan untuk keterbacaan tinggi pada teks panjang dan UI yang padat).

### B. Palet Warna (Tailwind Integrated)
Sistem warna dioptimalkan agar responsif terhadap *Light Mode* maupun *Dark Mode*.
- **Background Utama (`zen-bg`)**: `#FAFAF9` (Off-white yang hangat) di mode terang, dan hitam legam di mode gelap untuk menghindari kelelahan mata.
- **Surface & Komponen (`zen-surface`)**: Latar belakang panel atau kartu berwarna putih bersih dengan border yang sangat halus.
- **Warna Aksen / Brand**: Biru ke zamrud (Emerald) untuk memberikan kesan terpercaya, segar, dan menenangkan. Hitam pekat (`ink`) digunakan pada elemen *call-to-action* utama.
- **Warna Status Indikator**: 
  - 🟠 *Orange / Amber* (Pending / Menunggu persetujuan)
  - 🔵 *Blue* (Proses / Valid)
  - 🟢 *Emerald / Aloe* (Selesai / Resolved)
  - 🔴 *Red* (Ditolak / Batal)

### C. Efek Visual & Animasi Premium
- **Premium Components**: 
  - `AnimeHero`: Animasi tipografi dan elemen visual tingkat tinggi menggunakan Anime.js.
  - `BentoGridFeatures`: Penyajian fitur utama dalam tata letak *Bento Box* yang asimetris dan modern.
  - `DecryptedText` & `SquigglyText`: Efek teks dinamis untuk memberikan kesan teknologi tinggi.
  - `LineWaves`: Latar belakang prosedural yang memberikan nuansa hidup pada UI.
- **Glassmorphism**: Penggunaan `backdrop-blur-xl` dan latar belakang semi-transparan pada navigasi dan modal.
- **Large Radii**: Penggunaan sudut membulat yang ekstrim (`rounded-2xl`, `rounded-full`) untuk nuansa ramah dan mengalir.

---

## 3. Technology Stack (The Core)

### **A. Frontend Infrastructure (`/fe`)**
- **Core Framework**: **Astro v5.0** (Next-gen static site builder untuk performa load instan).
- **UI Logic / Interaktivitas**: 
  - **React 19**: Standar terbaru untuk komponen kompleks seperti Peta Laporan (`ReportMap.tsx`) dan interaksi landing page.
  - **Vanilla JavaScript**: Untuk penanganan *form* ringan dan integrasi modul Astro.
- **Styling**: **Tailwind CSS v3.4+** (Dengan konfigurasi *Zen System* kustom yang mendukung mode gelap dinamis).
- **Animasi**: **Framer Motion 12**, **Anime.js 3**, dan **GSAP 3** (Untuk transisi UI yang halus dan performa tinggi).
- **Pemetaan (Mapping)**: **Leaflet.js** & **React-Leaflet** (Integrasi OpenStreetMap untuk rendering peta yang mulus).
- **Manajemen State**: LocalStorage & Context API.

### **B. Backend Infrastructure (`/be`)**
- **Bahasa Pemrograman**: **Go (Golang) v1.21+** (Untuk pemrosesan API konkurensi tinggi).
- **Web Framework**: **Fiber v2** (Performa maksimal dengan sintaksis minimalis).
- **ORM**: **GORM** (Pemetaan objek database relasional).
- **Database**: **PostgreSQL** (Kehandalan data terstruktur dan spasial).
- **Real-time Communication**: **SSE (Server-Sent Events)** (Untuk penyiaran event dan notifikasi real-time tanpa overhead WebSocket).
- **Keamanan**: **JWT (JSON Web Tokens)** & **OTP (One-Time Password)** (Verifikasi akun via email).
- **Kecerdasan Buatan (AI)**: Integrasi dengan LLM lokal (LM Studio) atau OpenAI API untuk *AI Assistant*.

---

## 4. Hirarki Role & Hak Akses

1. **Warga (Citizen)**: Melapor masalah, melihat peta, memberikan *upvote/comment*, berinteraksi dengan AI Assistant, dan melihat Leaderboard.
2. **Admin**: Meninjau, validasi, memproses, dan menyelesaikan laporan. Mengelola Chat Inbox global dan menyiarkan pengumuman (Broadcast).
3. **Super Admin**: Pengelola sistem menyeluruh, manajemen akun Admin, moderasi peta absolut, dan analitik pengguna global.

---

## 5. Arsitektur Fitur Utama

### **A. Fitur Lintas Role (Global)**
- **Landing Page Interaktif**: Dilengkapi dengan `AnimatedCounter`, `CitizenReportsCarousel`, dan `LeaderboardPreview` untuk membangun kepercayaan publik.
- **Peta Laporan Interaktif**: Fitur pencarian instan, filter status, dan marker dengan *thumbnail* visual.
- **Sistem Autentikasi OTP**: Alur pendaftaran dan pemulihan password yang aman dengan verifikasi kode 6-digit.
- **Zen Sidebar**: Navigasi intuitif yang menyesuaikan diri berdasarkan role pengguna.

### **B. Modul Warga (Citizen Portal)**
1. **Dashboard Suara Warga**: Form pelaporan dengan kategori otomatis, unggahan foto (maks. 3), dan deteksi lokasi otomatis.
2. **Leaderboard Reputasi**: Sistem poin untuk mendorong partisipasi positif warga dalam pembangunan kota.
3. **Riwayat Aspirasi**: Halaman khusus untuk melacak semua laporan yang pernah dikirimkan beserta statusnya.
4. **Tanya AI (Asisten Warga)**: AI yang membantu memandu fitur platform dan memberikan ringkasan status laporan pengguna dengan rendering Markdown.

### **C. Modul Admin & Super Admin**
1. **Bento Admin Dashboard**: Statistik vital (Total, Pending, Resolved) yang disajikan dalam grid modern.
2. **Global Chat Inbox**: Manajemen percakapan dengan warga menggunakan sistem *polling* yang dioptimalkan.
3. **Sistem Broadcast**: Penyiaran informasi penting secara real-time ke seluruh dasbor warga melalui sistem SSE.
4. **Moderasi Laporan**: Daur hidup laporan yang transparan: `PENDING` → `VALID` → `RESOLVED` / `REJECTED`.

---

## 6. Standar Komunikasi & Data
- **RESTful API**: Format JSON yang solid antara FE dan BE.
- **SSE Broadcast**: Mengirimkan update real-time seperti notifikasi baru atau perubahan status global.
- **Contextual AI Prompting**: AI Assistant menyuntikkan data profil pengguna ke dalam prompt untuk memberikan jawaban yang akurat dan personal.

---

## 7. Repositori & Direktori Proyek
- **Frontend (FE)**: `/fe` (Astro + React + Tailwind)
- **Backend (BE)**: `/be` (Go + Fiber + GORM)
- **Status Proyek Terkini**: Implementasi landing page premium, sistem verifikasi OTP, perombakan dashboard warga bergaya Bento, dan optimalisasi SEO serta performa (Astro v5).

---

© 2026 **SovraEquitara Core Team**  
*Membangun masa depan kota yang lebih transparan, responsif, berkeadilan (Equitara), dan estetis dengan kecerdasan buatan.*
