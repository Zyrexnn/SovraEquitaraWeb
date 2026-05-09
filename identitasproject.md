# 🪪 Identitas Project: SovraEquitara

## 1. Visi & Misi
**SovraEquitara** adalah platform tata kelola kota digital yang bertujuan untuk memberikan keadilan (Equitara) dalam pemenuhan infrastruktur publik. Platform ini dirancang untuk mendemokratisasi proses pelaporan masalah kota, memastikan setiap suara warga didengar, diproses, dan diselesaikan secara transparan.

---

## 2. Visual & Design Identity (Zen Design System)
Platform ini menggunakan **Zen Design System**, sebuah pendekatan minimalis yang mengedepankan ketenangan visual tanpa mengorbankan fungsionalitas.

- **Typography**: 
  - **Display**: `Plus Jakarta Sans` (Font modern dengan keterbacaan tinggi untuk judul).
  - **Body**: `Inter` (Standar industri untuk teks panjang).
- **Color Palette (Tailwind Integrated)**:
  - `zen-bg`: `#FAFAF9` (Off-white yang nyaman di mata).
  - `zen-sidebar`: `#FFFFFF` (Putih bersih untuk kontras navigasi).
  - `zen-brand`: `#1A1A1A` (Hitam pekat untuk aksen utama).
  - `zen-blue`: `#3B82F6` (Biru untuk status 'Valid').
  - `zen-green`: `#10B981` (Hijau untuk status 'Resolved').
  - `zen-yellow`: `#F59E0B` (Kuning untuk status 'Pending').
- **Visual Effects**:
  - **Glassmorphism**: Penggunaan `backdrop-blur-xl` pada navigasi dan modal.
  - **Subtle Shadows**: `shadow-zen` yang sangat lembut untuk kedalaman visual.
  - **Large Radii**: Penggunaan konsisten `rounded-2xl` dan `rounded-3xl` untuk kesan ramah dan modern.

---

## 3. Technology Stack (The Core)

### **Frontend Infrastructure**
- **Framework**: **Astro v4.x** (Static-first dengan Islands Architecture).
- **UI Logic**: **React v18** & **TypeScript** (untuk komponen interaktif seperti Modals & Toggles).
- **Styling**: **Tailwind CSS v4.0** (100% utility-first, nol file CSS manual).
- **Mapping**: **Leaflet.js** & **OpenStreetMap** (Sistem koordinat real-time).
- **Analytics**: **Chart.js** (Visualisasi statistik administratif).

### **Backend Infrastructure**
- **Language**: **Go (Golang) v1.21+**.
- **Web Framework**: **Fiber v2** (Framework tercepat untuk Go).
- **Database**: **PostgreSQL** (Managed persistence).
- **Security**: **JWT (JSON Web Tokens)** dengan sistem validasi middleware kustom.
- **API Spec**: RESTful architecture.

---

## 4. Arsitektur Fitur

### **Citizen Module (Portal Warga)**
1. **Dashboard Bento**: Layout grid responsif yang menampilkan ringkasan aktivitas warga.
2. **Smart Reporting System**:
   - Geolocation tagging otomatis.
   - Image upload dengan kompresi client-side.
   - Kategori dinamis (Infrastruktur, Kebersihan, Keamanan, dll).
3. **Social Engagement Feed**:
   - Sistem Upvote (Dukungan) untuk meningkatkan prioritas laporan.
   - Kolom diskusi real-time antara warga dan admin.
4. **Gamification**: Sistem poin dan peringkat berdasarkan kontribusi laporan yang valid.

### **Administrative Module (Portal Admin)**
1. **Decision Support Dashboard**: Visualisasi data laporan masuk vs terselesaikan.
2. **Report Lifecycle Management**:
   - Perubahan status: `PENDING` → `IN_PROGRESS` → `RESOLVED`.
   - Verifikasi bukti visual langsung dari dashboard.
3. **User Management**: Kontrol terhadap akun warga dan moderator.
4. **Interactive Map Overview**: Melihat sebaran masalah kota berdasarkan titik koordinat pada peta besar.

---

## 5. Standar Keamanan & Performa
- **Authentication**: Token-based authentication dengan masa berlaku 72 jam.
- **Frontend Build**: Optimized static assets via Vite (Astro compiler).
- **Backend Build**: Compiled binary Go untuk eksekusi ultra-cepat.
- **Accessibility**: Mematuhi standar kontras warna WCAG untuk aksesibilitas yang baik.

---

## 6. Lokasi Pengembangan
- **Repository Frontend**: `SovraEquitaraWeb`
- **Repository Backend**: `SovraEquitara-BE`
- **Status Refactor**: **100% Migrated to Tailwind CSS** (Mei 2026).

---

© 2026 **SovraEquitara Core Team**. *Membangun masa depan kota yang lebih adil dan efisien.*
