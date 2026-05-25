# 🪪 Identitas Project: SovraEquitara

## 1. Visi & Misi
**SovraEquitara** adalah platform tata kelola kota digital yang bertujuan untuk memberikan keadilan (Equitara) dalam pemenuhan infrastruktur publik. Platform ini dirancang untuk mendemokratisasi proses pelaporan masalah kota, memastikan setiap suara warga didengar, diproses, diselesaikan secara transparan, dan dimonitor secara real-time.

---

## 2. Visual & Design Identity (Zen Design System)
Platform ini menggunakan **Zen Design System**, sebuah pendekatan minimalis yang mengedepankan ketenangan visual tanpa mengorbankan fungsionalitas dan UX (User Experience).

- **Typography**: 
  - **Display**: `Plus Jakarta Sans` (Font modern dengan keterbacaan tinggi untuk judul).
  - **Body**: `Inter` (Standar industri untuk teks panjang).
- **Color Palette (Tailwind Integrated)**:
  - `zen-bg`: `#FAFAF9` (Off-white yang nyaman di mata) / Dark Mode terintegrasi.
  - `zen-surface`: Latar belakang komponen yang bersih dengan border yang sangat halus.
  - `zen-brand`: Aksen hitam pekat (Light) atau Putih (Dark).
  - `zen-blue` / `emerald` / `orange`: Indikator status (Valid, Resolved, Pending).
- **Visual Effects**:
  - **Glassmorphism**: Penggunaan `backdrop-blur-xl` pada navigasi mobile dan modal.
  - **Subtle Shadows**: `shadow-zen` yang sangat lembut untuk memberikan kedalaman visual pada "Bento Grid".
  - **Large Radii**: Penggunaan radius besar (`rounded-2xl`, `rounded-3xl`) untuk kesan ramah, modern, dan tidak kaku.

---

## 3. Technology Stack (The Core)

### **Frontend Infrastructure (fe)**
- **Framework**: **Astro v4.x** (Static-first dengan arsitektur responsif dan load yang sangat cepat).
- **UI Logic**: **Vanilla JavaScript (Inline Scripts)** untuk performa interaktivitas tertinggi tanpa overhead virtual DOM.
- **Styling**: **Tailwind CSS v4.0** (100% utility-first, mendukung fitur Dark Mode sistematis).
- **Mapping**: **Leaflet.js** & **OpenStreetMap** (Sistem koordinat real-time dengan interaksi peta interaktif).
- **AI UI Integration**: Marked.js untuk *parsing* output Markdown dari AI Assistant.

### **Backend Infrastructure (be)**
- **Language**: **Go (Golang) v1.21+**.
- **Web Framework**: **Fiber v2** (Framework backend berkinerja tinggi).
- **ORM**: **GORM** untuk kemudahan pemetaan relasi database.
- **Database**: **PostgreSQL** (Relational Database Management System utama).
- **Security**: **JWT (JSON Web Tokens)** dengan sistem validasi middleware kustom per-role.
- **AI Server**: Terintegrasi dengan **Local LLM via LM Studio** (OpenAI-compatible endpoint `http://127.0.0.1:1234/v1`).

---

## 4. Hirarki Role & Hak Akses

Sistem memiliki tiga tingkatan akses utama:
1. **Warga (Citizen)**: Pengguna publik yang membuat laporan.
2. **Admin**: Moderator pengelola kota yang meninjau dan menyelesaikan laporan.
3. **Super Admin**: Pemegang otoritas tertinggi yang mengatur sistem dan seluruh tingkatan akun.

---

## 5. Arsitektur Fitur Utama

### **A. Modul Warga (Citizen Portal)**
1. **Dashboard Bento**: Layout grid dinamis yang menampilkan ringkasan cuaca/waktu, status laporan pribadi, leaderboard, dan feed laporan terbaru.
2. **Smart Reporting System**:
   - Deteksi Geolocation otomatis via Leaflet.
   - Lampiran bukti visual (gambar).
   - Klasifikasi kategori masalah (Infrastruktur, Kebersihan, Keamanan, dll).
3. **Social Engagement Feed**:
   - Sistem Upvote (Dukungan) untuk laporan warga lain.
   - Kolom diskusi publik di setiap laporan.
4. **Chat Inbox**: Berkomunikasi langsung dengan tim Admin kota untuk kendala spesifik.
5. **Gamification (Leaderboard)**: Sistem poin kompetitif yang diberikan setiap kali Warga membuat laporan yang disetujui (Valid).
6. **Tanya AI (AI Assistant)**: Asisten kecerdasan buatan (*local model*) yang merangkum status laporan pengguna, membimbing cara penggunaan aplikasi, dan memberikan jawaban kontekstual.

### **B. Modul Admin (Management Portal)**
1. **Decision Support Dashboard**: Visualisasi analitik komprehensif, jumlah laporan masuk vs selesai, dan daftar prioritas.
2. **Report Lifecycle Management**:
   - Validasi status laporan: `PENDING` → `VALID` / `WAITING_APPROVAL` → `RESOLVED` atau `REJECTED`.
3. **Interactive Map Overview**: Tinjauan geografis (peta penuh) untuk melihat sebaran titik masalah infrastruktur se-kota.
4. **Global Chat Inbox**: Menjawab pesan dan keluhan pribadi dari seluruh warga.
5. **Broadcast System**: Menerbitkan pengumuman resmi dari pemerintah kota yang akan muncul di notifikasi warga.
6. **Admin AI Assistant**: Asisten AI tingkat lanjut untuk membantu moderator menganalisis tren laporan dan merumuskan respon diskusi.

### **C. Modul Super Admin (System Portal)**
Seluruh fitur yang dimiliki **Admin**, ditambah dengan:
1. **Admins Management**: Mendaftarkan, memantau, dan menghapus akun Admin kota.
2. **Users Directory**: Memantau seluruh direktori Warga (Citizens) yang terdaftar di dalam platform.

---

## 6. Standar Integrasi & Komunikasi
- **RESTful API**: Komunikasi antara Astro Frontend dan Golang Backend terjadi sepenuhnya via API berformat JSON.
- **Local AI Prompting**: AI Assistant diatur sedemikian rupa melalui *System Prompts* di handler backend (`be/internal/handler/handler.go`) agar bisa mengekstrak data dari database (misal: menghitung statistik laporan user) sebelum diumpankan ke model LLM (contoh: Llama-3/Mistral di LM Studio).

---

## 7. Lokasi Pengembangan
- **Repository Frontend**: `SovraEquitaraWeb` (`/fe`)
- **Repository Backend**: `SovraEquitara-BE` (`/be`)
- **Status Proyek**: **100% Migrated to Tailwind CSS** & Full Integrated AI Workflow.

---

© 2026 **SovraEquitara Core Team**. *Membangun masa depan kota yang lebih transparan, responsif, dan adil dengan kecerdasan buatan.*
