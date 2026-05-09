# 🚀 SovraEquitara Frontend

Bagian frontend dari platform **SovraEquitara**, dibangun menggunakan **Astro** untuk performa maksimal dan **Tailwind CSS** untuk desain Zen Minimalis yang elegan.

---

## 🛠️ Tech Stack
- **Framework**: [Astro v4.x](https://astro.build/)
- **Styling**: [Tailwind CSS v4.0](https://tailwindcss.com/)
- **UI Components**: React & TypeScript
- **State Management**: LocalStorage & JWT
- **Peta Interaktif**: Leaflet.js

---

## ⚙️ Persiapan Pengembangan

### 1. Prasyarat
- **Node.js**: v18.x atau lebih baru.
- **Backend API**: Pastikan server [SovraEquitara Backend](../be) sudah berjalan di `http://localhost:3000`.

### 2. Instalasi
Clone repositori dan install dependensi:
```bash
npm install
```

### 3. Konfigurasi Environment
Buat file `.env` di direktori root `fe/` (jika belum ada) dan sesuaikan URL API:
```env
PUBLIC_API_URL=http://localhost:3000
```

### 4. Jalankan Server Development
```bash
npm run dev
```
Akses di: `http://localhost:4321`

---

## 🏗️ Struktur Folder Penting
- `src/pages/`: Route utama aplikasi (Warga & Admin).
- `src/layouts/`: Struktur layout dasar halaman.
- `src/components/`: Komponen UI interaktif (React/Astro).
- `src/styles/`: Konfigurasi global Tailwind.

---

## 🚀 Build untuk Produksi
Untuk melakukan kompilasi aset siap produksi:
```bash
npm run build
```

© 2026 **SovraEquitara** &bull; *Membangun Kota dengan Data.*
