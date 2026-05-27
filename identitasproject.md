# 🪪 Identitas Project: SovraEquitara

## 1. Visi & Misi
**SovraEquitara** adalah platform tata kelola kota digital yang bertujuan untuk memberikan keadilan (Equitara) dalam pemenuhan infrastruktur publik. Platform ini dirancang untuk mendemokratisasi proses pelaporan masalah kota, memastikan setiap suara warga didengar, diproses, diselesaikan secara transparan, dan dimonitor secara real-time melalui sistem yang modern, terpusat, dan responsif.

---

## 2. Visual & Design Identity (Zen Minimalist Design System)
Platform ini mematuhi standar desain tingkat tinggi menggunakan **Zen Design System**, sebuah pendekatan desain antarmuka yang mengedepankan estetika premium, bersih, tenang, dan fungsional.

### A. Tipografi Modern
- **Display**: `Plus Jakarta Sans` (Digunakan untuk *heading*, memberikan kesan modern, rapi, dan mudah dibaca).
- **Body**: `Inter` (Font standar industri yang dioptimalkan untuk keterbacaan tinggi pada teks panjang dan UI yang padat).

### B. Palet Warna (Tailwind Integrated)
Sistem warna dioptimalkan agar responsif terhadap *Light Mode* maupun *Dark Mode*.
- **Background Utama (`zen-bg`)**: `#FAFAF9` (Off-white yang hangat) di mode terang, dan hitam legam di mode gelap untuk menghindari kelelahan mata.
- **Surface & Komponen (`zen-surface`)**: Latar belakang panel atau kartu berwarna putih bersih dengan border yang sangat halus.
- **Warna Aksen / Brand**: Biru ke zamrud (Emerald) untuk memberikan kesan terpercaya, segar, dan menenangkan. Hitam pekat digunakan pada elemen *call-to-action* sekunder.
- **Warna Status Indikator**: 
  - 🟠 *Orange / Amber* (Pending / Menunggu persetujuan)
  - 🔵 *Blue* (Proses / Valid)
  - 🟢 *Emerald* (Selesai / Resolved)
  - 🔴 *Red* (Ditolak / Batal)

### C. Efek Visual & Tata Letak
- **Glassmorphism**: Penggunaan `backdrop-blur-md` dan latar belakang semi-transparan (misalnya pada navigasi, modal, dan *header* chat) untuk memberikan kesan berlapis yang mewah.
- **Bento Grid Layout**: Menggunakan pendekatan *grid* asimetris bergaya *Bento Box* pada *dashboard* (Admin/Super Admin) untuk mengelompokkan informasi secara terstruktur tanpa terlihat berantakan.
- **Subtle Shadows & Animations**: 
  - `shadow-sm` yang sangat lembut untuk memunculkan dimensi.
  - Efek *hover* yang responsif (memudar atau bergeser secara mulus).
  - Animasi mikro seperti *pulse* pada indikator pesan belum terbaca.
- **Large Radii**: Penggunaan sudut membulat yang ekstrim (`rounded-2xl`, `rounded-[2rem]`) untuk memberikan nuansa ramah, mengalir, dan tidak kaku (seperti bentuk pil).
- **Interactive Cursor (Dalam Perencanaan)**: Penambahan interaksi kursor yang dinamis di *landing page*.

---

## 3. Technology Stack (The Core)

### **A. Frontend Infrastructure (`/fe`)**
- **Core Framework**: **Astro v4.x** (Digunakan untuk *routing*, struktur halaman statis, dan meminimalkan JavaScript *bundle* demi load situs yang instan).
- **UI Logic / Interaktivitas**: 
  - **Vanilla JavaScript**: Untuk penanganan *form*, *polling* chat, modal, dan *event listener* sederhana.
  - **React 18**: Khusus digunakan untuk komponen kompleks yang membutuhkan manajemen state tinggi, seperti Peta Laporan (`ReportMap.tsx`).
- **Styling**: **Tailwind CSS v4.0** (100% *utility-first*, mendukung sistem desain yang konsisten dan mode gelap dinamis).
- **Pemetaan (Mapping)**: **Leaflet.js** & OpenStreetMap (Terintegrasi ke dalam React untuk rendering peta yang mulus dengan fitur pencarian dan filter *real-time*).
- **Renderer Teks**: **Marked.js** (Digunakan untuk merender hasil teks berbasis Markdown dari *AI Assistant* ke dalam format HTML).

### **B. Backend Infrastructure (`/be`)**
- **Bahasa Pemrograman**: **Go (Golang) v1.21+** (Dipilih karena kecepatannya dalam menangani konkurensi dan pemrosesan API berskala besar).
- **Web Framework**: **Fiber v2** (Cepat dan *express-like*).
- **ORM**: **GORM** (Pemetaan objek database relasional).
- **Database**: **PostgreSQL** (Digunakan karena kehandalannya dalam menangani data terstruktur dan spasial/geografis).
- **Keamanan**: Implementasi **JWT (JSON Web Tokens)** melalui *middleware* kustom berbasis *role* untuk memastikan validasi hak akses berjenjang.
- **Kecerdasan Buatan (AI)**: Integrasi dengan LLM lokal via **LM Studio** (titik akhir kompatibel OpenAI di `http://127.0.0.1:1234/v1`) untuk memproses permintaan AI tanpa biaya tambahan.

---

## 4. Hirarki Role & Hak Akses

1. **Warga (Citizen)**: Pengguna publik. Hak akses meliputi membuat laporan, melihat peta laporan umum, memberikan *upvote*, berkomentar, berinteraksi dengan AI Asisten Warga, dan menghubungi tim Admin melalui Chat.
2. **Admin**: Staf atau moderator dari pihak pemerintah. Dapat meninjau, mengesahkan (validasi), menolak, atau menyelesaikan laporan masuk. Mengelola pesan langsung dengan warga, dan melihat analitik tingkat menengah di *dashboard*.
3. **Super Admin**: Pengendali sistem secara menyeluruh. Selain memiliki semua hak Admin, peran ini juga dapat mengelola pengguna, mendaftarkan dan menghapus akun Admin, serta melakukan moderasi global (termasuk penghapusan paksa laporan di peta).

---

## 5. Arsitektur Fitur Utama

### **A. Fitur Lintas Role (Global)**
- **Peta Laporan Interaktif (Report Map)**: Peta penyebaran laporan di seluruh penjuru kota. Memiliki fitur pencarian instan dan filter status (Pending, Selesai, Ditolak). Peta ini memuat *pop-up* otomatis dengan *thumbnail* foto laporan. Untuk level Admin/Super Admin, peta ini menyediakan tombol aksi langsung seperti "Hapus Laporan" atau "Batalkan Laporan".
- **Sistem Autentikasi Modern**: Halaman Login dan Registrasi berbasis *Zen Design*, dilengkapi ilustrasi *dashboard/macbook*, teks sambutan transparan, dan pemisahan navigasi rute yang aman (*protected routes*).
- **Pengaturan Profil (Profile Page)**: Memungkinkan pengguna melihat detail mereka sendiri dan menyesuaikan tampilan UI (Light/Dark Mode).

### **B. Modul Warga (Citizen Portal)**
1. **Dashboard Warga**: *Layout* yang menyambut pengguna dengan ringkasan laporan terbaru, info cuaca, dan tombol akses cepat.
2. **Sistem Pelaporan Pintar (Smart Reporting)**:
   - Dukungan unggahan foto/bukti.
   - Deteksi Geolocation otomatis via Leaflet.
   - Kategorisasi permasalahan.
3. **Interaksi Sosial (Social Engagement)**: Dukungan (*Upvote*) dan diskusi komentar di dalam detail setiap laporan (untuk mengutamakan isu yang paling dirasakan warga).
4. **Chat Inbox (Warga)**: Sistem perpesanan *real-time* (dengan fitur *polling*) untuk berbicara dengan tim admin. Balon *chat* Warga memiliki gradien warna khusus sebagai identitas.
5. **Gamifikasi (Leaderboard)**: Papan peringkat berbasis skor. Skor bertambah apabila laporan warga divalidasi dan diselesaikan, mendorong warga agar aktif dan melapor secara jujur.
6. **Asisten AI (Tanya AI)**: Bot AI yang memahami konteks kota untuk memberikan bimbingan pelaporan atau merangkum data pengguna.

### **C. Modul Admin (Management Portal)**
1. **Dashboard Admin**: Menggunakan gaya *Bento Grid*, menyajikan analitik laporan (total, selesai, pending) dan grafik performa respons secara keseluruhan.
2. **Manajemen Laporan**: Alur kontrol daur hidup laporan: `PENDING` → `VALID` → `RESOLVED` / `REJECTED`.
3. **Global Chat Inbox**: Menampilkan daftar seluruh obrolan dengan Warga. Desain memiliki tata letak pesan sebelah kiri (*list kontak*) dengan efek *hover* yang lembut, indikator pesan baru (*pulse* merah), dan area pesan yang bersih di sebelah kanan. Dilengkapi dengan lencana verifikasi (centang biru) untuk memastikan identitas Admin.
4. **Sistem Penyiaran (Broadcast)**: Kemampuan untuk membuat pengumuman skala kota yang akan terlihat oleh seluruh sistem Warga.
5. **AI Admin Dashboard**: Asisten AI yang dirancang untuk menganalisis kepadatan laporan, merumuskan respons terhadap keluhan, atau meringkas isu harian.

### **D. Modul Super Admin (System Portal)**
Semua kemampuan yang dimiliki Admin, dan tambahan hak administratif super:
1. **Manajemen Admin**: Menambah staf pengelola baru atau menonaktifkan akun admin yang ada.
2. **Direktori Pengguna Global**: Melihat data semua warganegara (Citizens) yang telah mendaftarkan diri, mengunci akses mereka (jika fitur keamanan diaktifkan).
3. **Moderasi Peta Absolut**: Dapat secara paksa menghapus marker di "Peta Laporan" apabila terindikasi sebagai *spam*.

---

## 6. Standar Komunikasi & Data
- **RESTful API**: Format JSON yang solid antara FE dan BE.
- **Manajemen State Chat**: Karena sifatnya yang statis dengan sedikit *overhead*, fitur chat sejauh ini masih mengandalkan mekanisme *short polling* yang sangat ringan setiap beberapa detik, memperbarui *thread* percakapan tanpa menyegarkan halaman.
- **Contextual AI Prompting**: AI Assistant di *backend* membaca profil yang memanggilnya dan menginjeksi konteks (seperti "Pengguna ini memiliki 5 laporan selesai") ke dalam *System Prompt*, sehingga LLM bisa memberikan jawaban yang personal dan relevan dengan data di *database*.

---

## 7. Repositori & Direktori Proyek
- **Frontend (FE)**: `/fe` (SovraEquitaraWeb)
- **Backend (BE)**: `/be` (SovraEquitara-BE)
- **Status Proyek Terkini**: Berhasil bermigrasi sepenuhnya ke Tailwind CSS v4, mengadopsi struktur *Zen Minimalist*, implementasi Peta Laporan interaktif dengan React + Leaflet, dan perombakan ekstensif untuk sistem *Chat Inbox* di semua *role*.

---

© 2026 **SovraEquitara Core Team**  
*Membangun masa depan kota yang lebih transparan, responsif, berkeadilan (Equitara), dan estetis dengan kecerdasan buatan.*
