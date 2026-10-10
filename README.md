# SmartLap — Smart Laptop Decision Support & Official Store

> **Sistem Pendukung Keputusan (SPK) Pemilihan Laptop Menggunakan Metode Simple Additive Weighting (SAW) Berbasis Web Terintegrasi Transaksi Elektronik & Multi-Peran (Admin, Sales, User)**  
> *Program Studi Teknik Informatika / Sistem Informasi — Universitas Pamulang (UNPAM) 2026*

---

## 1. Tentang Proyek

**SmartLap** adalah platform sistem pendukung keputusan komputasi dan transaksi elektronik (*e-commerce*) terpadu yang dirancang untuk mengatasi fenomena *paradoks pilihan* (*choice overload*) serta kendala pemahaman spesifikasi perangkat keras bagi calon pembeli laptop.

Dengan menerapkan metode **Multi-Attribute Decision Making (MADM)** melalui algoritma **Simple Additive Weighting (SAW)**, sistem mampu memetakan kebutuhan preferensi pengguna secara objektif terhadap varian laptop yang paling optimal berdasarkan kriteria harga dan performa teknis. Sistem menerapkan pendekatan *Consumer-Centric* dan *Guest Checkout*, memungkinkan pengguna publik memperoleh rekomendasi, melakukan simulasi skema pembiayaan/kredit, hingga menyelesaikan transaksi tanpa kewajiban registrasi akun.

---

## 2. Fitur Utama Sistem

### A. Mesin Rekomendasi SPK SAW Multi-Profil
- **Personalisasi Profil Kebutuhan**:
  - **Pelajar & Mahasiswa**: Bobot diprioritaskan pada efisiensi harga dan ketahanan baterai.
  - **Pekerja & Profesional**: Fokus pada keandalan prosesor multitasking dan portabilitas kerja.
  - **Gamer & Kreator Konten**: Fokus pada performa grafis (GPU), kapasitas RAM, dan kecepatan penyimpanan.
- **Transparansi Perhitungan Matematis**: Audit visual matriks keputusan ($X$), matriks ternormalisasi ($R$), dan nilai preferensi akhir ($V$) secara real-time.

### B. Simulasi Kredit & Pembiayaan Terpadu (Credit-Driven Engine)
- **Kalkulator Cicilan Multi-Skema**:
  - **Kartu Kredit Cicilan 0%** (Tenor 3, 6, 12, dan 24 bulan).
  - **Fintech Paylater & Kredit Digital** (Kredivo, Akulaku, SPayLater).
  - **Kredit Konsumen Multifinance** dengan penyesuaian Uang Muka (DP) fleksibel 0% s/d 30%.
- **Metrik Keterjangkauan Harian (*Daily Affordability*)**: Mengonversi estimasi angsuran bulanan ke skala nominal harian untuk mempermudah perencanaan anggaran konsumen.

### C. Manajemen Multi-Peran (Role-Based Access Control)
- **Administrator Utama**:
  - Manajemen master data laptop (tambah, perbarui, hapus, dan kelola stok).
  - Konfigurasi bobot kriteria SAW ($C_1 - C_6$) dan profil dinamis.
  - Verifikasi dan audit komputasi matriks keputusan.
  - Dashboard analitik performa penjualan dan monitoring transaksi global.
- **Sales (Konsultan Penjualan & Pembiayaan) — *[Roadmap Fitur]* **:
  - Layanan bantuan rekomendasi SPK dan kalkulasi skema cicilan di toko (*In-Store POS Assistance*).
  - Pendorong transaksi pembiayaan (*Credit-Driven Sales*) untuk meningkatkan konversi penjualan.
  - Pembuatan pesanan langsung atas nama pelanggan (*Assisted Checkout*).
  - Verifikasi pembayaran, pembaruan status pengiriman, dan pemantauan stok fisik.
- **User / Tamu Publik (Guest Customer)**:
  - Akses mesin rekomendasi cerdas tanpa login.
  - Eksplorasi katalog laptop dengan filter multi-kriteria.
  - Checkout mandiri dengan simulasi pembayaran (Virtual Account, QRIS, Cicilan).
  - Pelacakan status pesanan real-time menggunakan nomor pesanan unik.

---

## 3. Kriteria dan Pemodelan Algoritma SAW

Metode **Simple Additive Weighting (SAW)** menentukan penjumlahan terbobot dari rating kinerja pada setiap alternatif untuk seluruh atribut kriteria yang telah dinormalisasi:

### Tabel Kriteria ($C_1 - C_6$)
| Kode | Nama Kriteria | Tipe Atribut | Satuan / Parameter | Rentang Bobot |
|:---:|---|:---:|---|:---:|
| **$C_1$** | Harga Perangkat | **Cost** (Minimasi) | Rupiah (Rp) | 15% – 35% |
| **$C_2$** | Performa Prosesor (CPU) | **Benefit** (Maksimasi) | Skor Benchmark | 20% – 30% |
| **$C_3$** | Kapasitas RAM | **Benefit** (Maksimasi) | Gigabyte (GB) | 15% – 25% |
| **$C_4$** | Performa Grafis (GPU) | **Benefit** (Maksimasi) | Skor Benchmark | 5% – 30% |
| **$C_5$** | Kapasitas Penyimpanan (SSD) | **Benefit** (Maksimasi) | Gigabyte (GB) | 5% – 15% |
| **$C_6$** | Ketahanan Daya Baterai | **Benefit** (Maksimasi) | Jam Pemakaian | 5% – 15% |

### Rumus Normalisasi Matriks ($R$)
$$
r_{ij} = \begin{cases} 
\dfrac{x_{ij}}{\max_i (x_{ij})}, & \text{jika atribut benefit} \\[10pt]
\dfrac{\min_i (x_{ij})}{x_{ij}}, & \text{jika atribut cost}
\end{cases}
$$

### Rumus Nilai Preferensi ($V$)
$$
V_i = \sum_{j=1}^{n} w_j \cdot r_{ij}
$$
*Alternatif dengan nilai preferensi $V_i$ tertinggi ditetapkan sebagai rekomendasi paling sesuai.*

---

## 4. Tumpukan Teknologi (Tech Stack)

### Frontend
- **Framework**: Vue.js 3 (Composition API, `<script setup>`)
- **Build Tool**: Vite
- **State Management**: Pinia (`authStore`, `cartStore`)
- **Styling**: Tailwind CSS v4
- **Komponen Ikon**: Material Symbols (Google Fonts)
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Web Framework**: Express.js
- **Object-Relational Mapping (ORM)**: Prisma ORM
- **Sistem Basis Data**: MySQL

---

## 5. Struktur Direktori Proyek

```text
smartlap/
├── backend/                  # RESTful API Backend
│   ├── database/             # Skrip SQL & master seeder data
│   ├── prisma/
│   │   └── schema.prisma     # Skema database Prisma ORM
│   ├── src/
│   │   ├── config/           # Inisialisasi Prisma client
│   │   ├── controllers/      # Logika controller (SPK, Laptop, Order, Profile, Auth)
│   │   ├── routes/           # Routing API Express
│   │   ├── services/         # Layanan kalkulasi algoritma SAW
│   │   └── app.js            # Entry point backend
│   └── package.json
│
├── frontend/                 # Single Page Application (SPA)
│   ├── public/               # Asset statis & SVG visual laptop
│   ├── src/
│   │   ├── components/       # Komponen UI (Navbar, Footer, LaptopCard, Modal Simulasi)
│   │   ├── stores/           # Manajemen state Pinia
│   │   ├── views/            # Halaman tampilan antarmuka
│   │   ├── router/           # Konfigurasi Vue Router & route guard
│   │   └── App.vue           # Komponen root Vue
│   └── package.json
│
├── .gitignore                # Konfigurasi pengabaian file repositori
├── README.md                 # Dokumentasi utama proyek
└── package.json              # Root script runner
```

---

## 6. Panduan Instalasi & Menjalankan Sistem

### Prasyarat Sistem
- **Node.js**: Versi 18.0.0 atau lebih baru
- **MySQL**: Layanan basis data aktif pada port default `3306`

### Langkah 1: Kloning Repositori
```bash
git clone https://github.com/Wizfie/smartlap.git
cd smartlap
```

### Langkah 2: Menyiapkan Backend
Masuk ke direktori backend, pasang dependensi, dan atur berkas konfigurasi `.env`:
```bash
cd backend
npm install
```

Salin template konfigurasi:
```bash
cp .env.example .env
```

Sesuaikan parameter koneksi basis data pada berkas `.env`:
```env
PORT=5000
DATABASE_URL="mysql://root:password@localhost:3306/smartlap_db"
```

Sinkronisasikan struktur tabel dan lakukan seeding data:
```bash
npx prisma db push
node database/masterSeed.js
```

Jalankan server backend:
```bash
npm run dev
```
*Server backend aktif di alamat: `http://localhost:5000`.*

### Langkah 3: Menyiapkan Frontend
Buka sesi terminal baru di direktori `frontend/`:
```bash
cd frontend
npm install
npm run dev
```
*Aplikasi frontend dapat diakses melalui browser di: `http://localhost:5173`.*

---

## 7. Kredensial Pengguna Bawaan (Default Credentials)

| Peran (Role) | Email | Password | Akses Halaman | Keterangan |
|---|---|---|---|---|
| **Administrator Utama** | `admin@smartlap.com` | `admin123` | `/admin` | Akses Penuh Sistem & Audit SAW |
| **User Publik** | *Tanpa Login (Guest)* | *-* | `/` | Rekomendasi, Katalog & Checkout |

*Catatan: Akun dan portal untuk peran Sales saat ini berada dalam tahapan perencanaan dan pengembangan fitur.*

---

## 8. Lisensi & Hak Cipta
Dikembangkan untuk keperluan akademik tugas akhir / skripsi:  
**Sistem Pendukung Keputusan Pemilihan Laptop (SmartLap)** — Universitas Pamulang (UNPAM) © 2026.
