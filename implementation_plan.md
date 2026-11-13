# Rencana Implementasi (Implementation Plan)
## Website Dashboard & Profil Sekolah

Proyek ini bertujuan untuk membangun platform web modern yang menggabungkan **Profil Sekolah (Public Site)** dan **Dashboard Manajemen Sekolah (Admin Panel)** menggunakan **Vue.js (Vue 3 + Vite)**. Seluruh sistem penyimpanan data pada tahap awal ini akan memanfaatkan **Cache / Local Storage / Pinia State Persist** tanpa backend server/database eksternal.

---

## 1. Arsitektur & Teknologi (Tech Stack)

* **Frontend Framework:** Vue 3 (Composition API `<script setup>`)
* **Build Tool:** Vite
* **Routing:** Vue Router 4
* **State Management & Caching:** 
  * **Pinia:** State management utama aplikasi.
  * **Pinia Plugin Persistedstate / LocalStorage:** Menyimpan data secara persistent di browser cache/local storage.
  * **IndexedDB (via idb-keyval / LocalForage):** Digunakan jika kapasitas data file/gambar lokal melebihi kuota LocalStorage (~5MB).
* **UI Framework / Styling:** Tailwind CSS + Headless UI / PrimeVue (opsional untuk komponen UI siap pakai).
* **Iconography:** Lucide Icons / Heroicons.

---

## 2. Fitur & Modul Utama

### A. Bagian Profil Sekolah (Public Access)
1. **Beranda (Home):** Banner hero, pengumuman terbaru, sekilas tentang sekolah, dan keunggulan.
2. **Profil Sekolah:**
   * Visi & Misi
   * Sejarah & Sambutan Kepala Sekolah
   * Identitas Sekolah (NPSN, Akreditasi, Alamat)
3. **Akademik & Ekstrakurikuler:**
   * Daftar Jurusan / Kurikulum
   * Daftar Kegiatan Ekstrakurikuler
4. **Berita & Pengumuman:** Artikel kegiatan sekolah dan info penting.
5. **Galeri & Fasilitas:** Foto-foto fasilitas dan dokumentasi kegiatan.
6. **Kontak & Lokasi:** Form pesan, denah/map, dan media sosial.

### B. Bagian Dashboard Sekolah (Admin / Internal)
1. **Overview / Dashboard Analytics:** Ringkasan statistik (Jumlah Siswa, Guru, Pengumuman, Akreditasi).
2. **Manajemen Data Siswa:** CRUD data siswa (NISN, Nama, Kelas, Status).
3. **Manajemen Data Guru & Staf:** CRUD data pengajar dan bidang studi.
4. **Manajemen Berita & Pengumuman:** Publikasi dan sunting berita yang langsung tampil di modul Public Profil.
5. **Manajemen Galeri & Fasilitas:** Upload/kelola daftar foto (disimpan dalam format Base64 / Local Object URL di cache).
6. **Pengaturan Cache & Data System:**
   * Export Data (Backup ke file JSON)
   * Import Data (Restore dari file JSON)
   * Reset / Clear Cache (Kembali ke data dummy awal)

---

## 3. Strategi Penyimpanan Data (Cache & Local Storage)

Karena sistem tidak menggunakan backend/database server, seluruh data dikelola dengan pendekatan **Client-Side Data Engine**:

1. **Initial Seed Data (Mock Data):**
   * Aplikasi menyediakan file `seedData.json` yang secara otomatis di-load ke Pinia store saat pertama kali aplikasi dijalankan (jika cache kosong).
2. **Reactivity & Synchronization:**
   * Setiap perubahan (Create, Update, Delete) di Dashboard Admin langsung mengupdate Pinia Store.
   * Pinia Plugin secara otomatis melakukan sinkronisasi state ke `localStorage` / `IndexedDB`.
3. **Backup & Portabilitas Data:**
   * Disediakan tombol **Export JSON** di Dashboard agar admin dapat mengunduh backup data.
   * Disediakan tombol **Import JSON** untuk memuat data dari file luar.

---

## 4. Tahapan Implementasi (Timeline & Milestone)

### Tahap 1: Setup Proyek & Infrastruktur Base (Hari 1 - 2)
* Setup Vue 3 + Vite + Tailwind CSS + Vue Router + Pinia.
* Konfigurasi plugin persistency cache pada Pinia.
* Buat struktur direktori proyek (`/components`, `/views`, `/stores`, `/assets`, `/utils`).
* Buat file mockup awal (`seedData.json`) untuk profil, berita, siswa, dan guru.

### Tahap 2: Pengembangan Modul Profil Sekolah (Public) (Hari 3 - 5)
* Implementasi Layout Public (Navbar, Footer, Responsive Mobile Menu).
* Halaman Beranda (Hero Banner, Highlights, Summary).
* Halaman Profil (Visi Misi, Sejarah, Sambutan).
* Halaman Berita & Detail Berita (mengambil data dari Pinia store cache).
* Halaman Galeri & Kontak.

### Tahap 3: Pengembangan Modul Dashboard Admin (Hari 6 - 9)
* Implementasi Layout Admin (Sidebar, Header, Breadcrumbs).
* Halaman Overview Dashboard (Kuis/Card Statistik).
* Tabel Data Siswa & Data Guru (dilengkapi pencarian, filter, dan modal Form CRUD).
* Manajemen Berita & Galeri (Form input berita baru & upload gambar via Base64 cache).
* Halaman Data Management (Export, Import, Reset Data).

### Tahap 4: Integrasi Cache & Refinement (Hari 10 - 11)
* Pengujian sinkronisasi data antara Dashboard Admin dan Halaman Public.
* Penanganan kuota penyimpanan (fallback ke IndexedDB jika data gambar besar).
* Penambahan feedback UI (Toast Notification, Confirm Dialog, Loader).

### Tahap 5: Testing & Deployment (Hari 12)
* Testing kompatibilitas browser (Chrome, Firefox, Safari, Edge).
* Responsive layout testing (Mobile, Tablet, Desktop).
* Build production (`npm run build`).
* Deployment ke static hosting gratis (Vercel / Netlify / GitHub Pages).

---

## 5. Struktur Direktori Proyek

```text
sekolah-dashboard-vue/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   └── main.css
│   │   └── images/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminSidebar.vue
│   │   │   ├── AdminHeader.vue
│   │   │   └── ModalForm.vue
│   │   ├── public/
│   │   │   ├── Navbar.vue
│   │   │   ├── Footer.vue
│   │   │   └── NewsCard.vue
│   │   └── common/
│   │       ├── BaseButton.vue
│   │       └── BaseTable.vue
│   ├── router/
│   │   └── index.js
│   ├── stores/
│   │   ├── schoolProfile.js
│   │   ├── studentStore.js
│   │   ├── teacherStore.js
│   │   └── newsStore.js
│   ├── views/
│   │   ├── public/
│   │   │   ├── HomeView.vue
│   │   │   ├── ProfileView.vue
│   │   │   ├── NewsView.vue
│   │   │   └── ContactView.vue
│   │   └── admin/
│   │       ├── DashboardOverview.vue
│   │       ├── StudentsManagement.vue
│   │       ├── TeachersManagement.vue
│   │       ├── NewsManagement.vue
│   │       └── DataManagement.vue
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 6. Contoh Ringkas Kode Cache Store (Pinia)

```javascript
// src/stores/newsStore.js
import { defineStore } from 'pinia';
import seedNews from '@/data/seedNews.json';

export const useNewsStore = defineStore('news', {
  state: () => ({
    newsList: JSON.parse(localStorage.getItem('school_news')) || seedNews
  }),
  actions: {
    addNews(item) {
      const newItem = { ...item, id: Date.now(), createdAt: new Date().toISOString() };
      this.newsList.unshift(newItem);
      this.saveToCache();
    },
    updateNews(id, updatedData) {
      const index = this.newsList.findIndex(n => n.id === id);
      if (index !== -1) {
        this.newsList[index] = { ...this.newsList[index], ...updatedData };
        this.saveToCache();
      }
    },
    deleteNews(id) {
      this.newsList = this.newsList.filter(n => n.id !== id);
      this.saveToCache();
    },
    saveToCache() {
      localStorage.setItem('school_news', JSON.stringify(this.newsList));
    },
    resetToDefault() {
      this.newsList = seedNews;
      this.saveToCache();
    }
  }
});
```

---

## 7. Catatan Pemeliharaan & Pengembangan Masa Depan
* **Batas Kapasitas LocalStorage:** Disarankan untuk membatasi ukuran file foto/gambar yang diunggah ke cache (maksimal 500KB per gambar) agar tidak melebihi kuota 5MB browser.
* **Migrasi Backend:** Arsitektur store Pinia dirancang terpisah sehingga jika di masa depan akan diintegrasikan dengan REST API / Firebase / Laravel, cukup memperbarui method `actions` pada store Pinia tanpa perlu merubah tampilan komponen Vue.