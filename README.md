# 🚀 SovraEquitara Frontend

Bagian frontend dari platform **SovraEquitara**, dibangun menggunakan **Astro v4** untuk performa maksimal dan **Tailwind CSS v4** untuk desain Zen Minimalis yang elegan dan premium.

---

## 🛠️ Tech Stack
- **Framework**: [Astro v4.x](https://astro.build/) (Hybrid Rendering & ViewTransitions)
- **Styling**: [Tailwind CSS v4.0](https://tailwindcss.com/) (CSS-first engine)
- **UI Components**: React & TypeScript Islands
- **UX Logic**: 
  - **ViewTransitions**: Transisi halaman yang mulus tanpa refresh.
  - **NProgress**: Indikator loading global untuk feedback instan.
  - **Zen Toast**: Sistem notifikasi minimalis dan terpadu.
- **Peta Interaktif**: Leaflet.js

---

## ⚙️ Persiapan Pengembangan

### 1. Prasyarat
- **Node.js**: v18.x atau lebih baru.
- **Backend API**: Pastikan server [SovraEquitara Backend](../be) sudah berjalan di `http://localhost:3000`.

### 2. Instalasi
```bash
cd fe
npm install
```

### 3. Konfigurasi Environment
Buat file `.env` di direktori `fe/` (jika belum ada):
```env
PUBLIC_API_URL=http://localhost:3000
```

### 4. Jalankan Server Development
```bash
npm run dev
```
Akses di: `http://localhost:4321`

---

## 🏗️ Struktur Folder
- `src/pages/`: 
  - `/`: Landing Page & Feed.
  - `/dashboard`: Portal Warga.
  - `/admin/`: Dashboard & Manajemen Moderasi.
  - `/superadmin/`: Governance Dashboard & Chat Control.
- `src/layouts/`: Struktur layout dengan dukungan `ViewTransitions`.
- `src/components/`: Komponen UI berbasis React & Astro.
- `src/utils/`: Utilitas sistem seperti `showToast`.

---

## 🚀 Build untuk Produksi
```bash
npm run build
```

© 2026 **SovraEquitara** • *Modernizing Urban Governance.*
