# 🌤️ Cuaca Pekanbaru - BMKG

Aplikasi prakiraan cuaca untuk **Kota Pekanbaru**, Provinsi Riau dengan data dari **BMKG Indonesia**.

## ✨ Fitur

- 📍 **83 Kelurahan** di 15 Kecamatan Kota Pekanbaru
- 🌡️ Prakiraan cuaca real-time dari BMKG
- 📊 Data detail per kelurahan dengan prakiraan 3 hari
- 🎨 Desain modern dengan tema hijau-teal
- 📱 Responsif untuk semua perangkat
- ⚡ Next.js 14 dengan TypeScript
- 🗺️ Navigasi hierarki: Pekanbaru → Kecamatan → Kelurahan

## 🗺️ Wilayah yang Tercakup

Aplikasi ini mencakup data cuaca untuk 15 kecamatan di Kota Pekanbaru:

### 1. Kecamatan Sukajadi (7 Kelurahan)
- Jadirejo
- Kampung Tengah
- Kampung Melayu
- Kedung Sari
- Harjo Sari
- Sukajadi
- Pulau Karomah

### 2. Kecamatan Pekanbaru Kota (6 Kelurahan)
- Simpang Empat
- Sumahilang
- Tanah Datar
- Kota Baru
- Sukaramai
- Kota Tinggi

### 3. Kecamatan Sail (3 Kelurahan)
- Cinta Raja
- Suka Mulya
- Tanah Datar

### 4. Kecamatan Lima Puluh (4 Kelurahan)
- Rintis
- Tanjung Rhu
- Pesisir
- Sekip

### 5. Kecamatan Senapelan (6 Kelurahan)
- Padang Bulan
- Sago
- Kampung Baru
- Kampung Dalam
- Kampung Bandar
- Padang Terubuk

### 6. Kecamatan Rumbai Barat (6 Kelurahan)
- Rumbai Bukit
- Muarafajar Timur
- Muarafajar Barat
- Rantaupanjang
- Maharani
- Agrowisata

### 7. Kecamatan Bukit Raya (5 Kelurahan)
- Simpang Tiga
- Tangkerang Selatan
- Tangkerang Utara
- Tangkerang Labuai
- Air Dingin

### 8. Kecamatan Binawidya (5 Kelurahan)
- Simpang Baru
- Delima
- Tobek Godang
- Binawidya
- Sungai Sibam

### 9. Kecamatan Marpoyan Damai (6 Kelurahan)
- Tangkerang Barat
- Tangkerang Tengah
- Sidomulyo Timur
- Wonorejo
- Maharatu
- Perhentian Marpoyan

### 10. Kecamatan Tenayan Raya (8 Kelurahan)
- Bencah Lesung
- Tangkerang Timur
- Rejosari
- Bambukuning
- Melebung
- Industri Tenayan
- Sialang Sakti
- Tuah Negeri

### 11. Kecamatan Payung Sekaki (6 Kelurahan)
- Tampan
- Labuh Baru Timur
- Labuh Baru Barat
- Air Hitam
- Bandar Raya
- Tirta Siak

### 12. Kecamatan Rumbai (6 Kelurahan)
- Meranti Pandak
- Lembah Damai
- Limbungan Baru
- Sri Meranti
- Palas
- Umban Sari

### 13. Kecamatan Tuah Madani (5 Kelurahan)
- Sidomulyo Barat
- Sialang Munggu
- Tuah Karya
- Tuah Madani
- Air Putih

### 14. Kecamatan Kulim (5 Kelurahan)
- Kulim
- Mentangor
- Sialang Rampai
- Pebatuan
- Pematang Kapau

### 15. Kecamatan Rumbai Timur (5 Kelurahan)
- Tebing Tinggi Okura
- Sungai Ukai
- Sungai Ambang
- Lembah Sari
- Limbungan

## 🚀 Cara Menjalankan
```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build

# Jalankan production server
npm start
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 📂 Struktur Routing

- `/` - Halaman utama menampilkan semua kecamatan
- `/district/[districtName]` - Daftar kelurahan per kecamatan
- `/Village/[VillageCode]` - Detail cuaca untuk kelurahan tertentu

## 🛠️ Teknologi

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Source**: BMKG API

## 📡 API BMKG

Data cuaca diambil dari API resmi BMKG Indonesia:
```
https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4={kode_kelurahan}
```

Kode administratif Kota Pekanbaru: `14.71`

## 📊 Statistik

- **Total Kecamatan**: 15
- **Total Kelurahan**: 83
- **Provinsi**: Riau
- **Kode Wilayah**: 14.71

## 📄 Lisensi

Data cuaca © BMKG Indonesia

## 👨‍💻 Developer

Dibuat oleh Aji Prasetia menggunakan data resmi BMKG

---

**Catatan**: Data cuaca diperbarui secara real-time dari server BMKG Indonesia
