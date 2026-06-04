# 🚀 SovraEquitara Frontend Portal (Web Client)

Portal web untuk **SovraEquitara**, dirancang menggunakan **Astro v5.0** (Next-Gen Web Framework) dengan konsep **Islands Architecture** untuk menjamin waktu muat halaman yang instan dan interaktivitas tingkat tinggi menggunakan **React 19**, **Framer Motion 12**, **Anime.js**, dan **GSAP**. 

Tampilan antarmuka mengacu pada **Zen Minimalist Design System** yang disesuaikan secara kustom melalui **Tailwind CSS**.

---

## 🛠️ Tech Stack & Library

- **Core Framework**: [Astro v5.0](https://astro.build/) (Static Site Generation & Hybrid Rendering).
- **Interactive Islands**: [React 19](https://react.dev/) & TypeScript.
- **Styling**: [Tailwind CSS v3.4+](https://tailwindcss.com/) dengan Zen Design Tokens.
- **Animasi & Efek UI**:
  - **Framer Motion 12**: Digunakan untuk transisi layout yang mulus.
  - **Anime.js 3**: Digunakan pada interaksi hero (`AnimeHero.tsx`) dan interaksi teks.
  - **GSAP 3**: Digunakan untuk animasi scrolling berkinerja tinggi.
  - **Astro ViewTransitions**: Navigasi halaman cepat tanpa reload penuh (*single-page app experience*).
- **Peta Interaktif**: **Leaflet.js** & **React-Leaflet** (Integrasi OpenStreetMap untuk pemetaan isu kota secara presisi).
- **Indikator Proses**: **NProgress** (Visual loading bar global).

---

## 📂 Struktur Direktori & Rute Halaman

```bash
fe/
├── src/
│   ├── components/       # Reusable Astro & React Components
│   │   ├── react/        # Komponen React (Islands) seperti ReportMap.tsx, AIAssistant.tsx
│   │   └── ui/           # Komponen presentasional berdesain Zen
│   ├── layouts/          # Template layout global dengan <ViewTransitions />
│   ├── pages/            # File-based routing (Astro Pages)
│   │   ├── admin/        # Portal Khusus Admin
│   │   ├── superadmin/   # Portal Pengawasan Super Admin
│   │   ├── index.astro   # Landing Page Publik & Feed Laporan
│   │   ├── dashboard.astro# Dashboard Bento Warga (Citizen Portal)
│   │   ├── login.astro   # Autentikasi Warga
│   │   ├── register.astro# Pendaftaran Akun Warga
│   │   ├── verify-otp.astro# Halaman Pengisian Kode OTP
│   │   └── ...           # Profile, History, Chat, Map, Forgot/Reset Password
│   └── utils/            # Utilitas global (API Client, Toast notification)
├── public/               # Asset statis (Logo, Font, Images)
└── tailwind.config.mjs   # Konfigurasi Token Warna & Efek Zen Minimalist
```

---

## 🎨 Zen Design Tokens (Tailwind Integration)

Buku panduan visual Tailwind yang dikonfigurasi kustom di `tailwind.config.mjs`:

### 1. Palet Warna Kustom
- **`zen-bg`**: `#FAFAF9` (Mode Terang) / `#000000` (Mode Gelap).
- **`zen-surface`**: `#FFFFFF` dengan batas tipis border abu-abu transparan.
- **`zen-accent`**: Gradasi Biru ke Hijau Zamrud (Emerald) untuk elemen aktif.
- **`ink`**: `#000000` pekat untuk teks penting dan tombol utama.

### 2. Efek Spesifik Zen
- **`shadow-zen`**: Shadow halus berlapis untuk efek melayang tanpa membebani mata.
- **`backdrop-blur-xl`**: Efek buram premium pada header (`navbar`) dan menu dropdown.
- **`rounded-3xl`**: Sudut panel membulat ekstrim untuk kenyamanan visual.

---

## 🔗 Pemetaan Rute Halaman Web (`src/pages/`)

### 1. Akses Publik & Warga (Citizen Portal)
- `/` - **Landing Page & Feed**: Menampilkan statistik laporan warga, `LeaderboardPreview`, dan daftar laporan terkini.
- `/map` - **Peta Interaktif**: Peta Leaflet visual penuh untuk memantau titik-titik kerusakan kota.
- `/login` & `/register` - **Portal Masuk & Daftar**: Otentikasi aman terintegrasi OTP.
- `/verify-otp` - **Verifikasi Akun**: Validasi kode OTP 6-digit yang dikirim ke email.
- `/dashboard` - **Citizen Dashboard**: Tampilan Bento Grid multifungsi berisi ringkasan poin, form pelaporan cepat (mendukung upload foto & GPS), riwayat, dan notifikasi.
- `/chat` - **Bantuan Warga**: Fitur live chat hub dengan Admin untuk menanyakan status infrastruktur.
- `/ai-assistant` - **Tanya AI**: Integrasi asisten kecerdasan buatan untuk merangkum data laporan secara dinamis.
- `/profile` - **Manajemen Akun**: Pengaturan profil, unggah foto avatar, dan reset kata sandi.

### 2. Portal Admin (`/admin/`)
- `/admin/login` - Gerbang masuk khusus staf admin.
- `/admin/dashboard` - Dasbor statistik Bento berisi metrik performa respon, status antrean, dan notifikasi.
- `/admin/reports` - Manajemen moderasi daftar laporan masuk (`VALIDATE`, `RESOLVE`).
- `/admin/chat` - Helpdesk Inbox untuk membalas percakapan warga secara real-time.
- `/admin/broadcast` - Pembuatan pengumuman darurat atau info perbaikan kota yang akan dikirim secara real-time ke semua dashboard warga via SSE.
- `/admin/ai-assistant` - Alat AI khusus admin untuk menganalisis tren masalah kota secara terstruktur.

### 3. Portal Super Admin (`/superadmin/`)
- `/superadmin/dashboard` - Panel pengawas keseluruhan sistem, performa admin, dan kepuasan publik.
- `/superadmin/reports` - Kontrol pembatalan absolut (`CANCEL`) laporan jika terjadi indikasi penyalahgunaan.
- `/superadmin/users` - Manajemen warga terdaftar (aktif/nonaktif).
- `/superadmin/admins` - CRUD (Tambah/Ubah/Hapus) hak akses akun Admin baru.
- `/superadmin/chat` & `/superadmin/broadcast` - Hak istimewa untuk memonitor percakapan dan menyiarkan darurat sistem global.

---

## ⚙️ Persiapan & Menjalankan Portal Web

### 1. File Environment
Pastikan file `.env` di dalam folder `fe/` telah berisi alamat API backend yang benar:
```env
PUBLIC_API_URL=http://localhost:3000
```

### 2. Instalasi Dependensi
Jalankan perintah npm berikut untuk mengunduh semua library:
```bash
npm install
```

### 3. Jalankan Server Dev
Mulai server development lokal:
```bash
npm run dev
```
Buka peramban (*browser*) Anda ke: `http://localhost:4321`

### 4. Build untuk Produksi
Lakukan kompilasi optimal untuk deployment:
```bash
npm run build
```
Hasil build produksi yang optimal akan berada pada folder `dist/`.

---

© 2026 **SovraEquitara Web Client** • *Designed with Care, Engineered for Everyone.*
