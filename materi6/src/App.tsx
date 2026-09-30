import Deck from './deck/Deck';
import Slide from './deck/Slide';
import Section from './components/Section';
import Steps from './components/Steps';
import CodeWindow from './components/CodeWindow';
import Table from './components/Table';
import Bento from './components/Bento';

export default function App() {
  return (
    <Deck>
      {/* SLIDE PEMBUKA */}
      <Section
        nav="Modul 5"
        n={5}
        kicker="Modul 5"
        title={
          <>
            Studi Kasus <span className="accent-text">Terpadu</span>
          </>
        }
        subtitle="Dari analisis ke keputusan"
        notes="Selamat datang di Modul 5, modul penutup dari praktikum kita. Di sini kita akan menggabungkan semua insight dari modul 1-4 menjadi satu keputusan utuh."
      />

      {/* SLIDE 1 — Tujuan */}
      <Steps
        nav="Tujuan M5"
        kicker="Tujuan Proyek Akhir"
        title="Apa yang Akan Kita Capai?"
        notes="Estimasi waktu pengerjaan modul ini sekitar 120–150 menit, karena berfungsi sebagai proyek akhir lab."
        items={[
          { title: 'Integrasi Data', body: 'Menggabungkan logika Dead Stock (M2) + Klasifikasi ABC (M3) + Evaluasi ROP (M4).' },
          { title: 'Otomasi Rekomendasi', body: 'Menerjemahkan status tiap item menjadi rekomendasi aksi (decision matrix).' },
          { title: 'Pelaporan Terpadu', body: 'Mengekspor data ke CSV & menyusun Laporan Akhir Praktikum yang reproducible.' },
        ]}
      />

      {/* SLIDE 2 — Teori: Dari Analisis ke Keputusan */}
      <Slide nav="Teori M5" notes="Penting bagi mahasiswa untuk memahami bahwa Python dan Pandas hanya alat bantu. Pada akhirnya, yang dibutuhkan manajemen adalah 'Apa yang harus kita lakukan?'.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Teori
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Dari Analisis Menjadi Keputusan
        </h2>
        <div style={{ maxWidth: 1000, marginInline: 'auto' }}>
          <Table
            columns={['Modul', 'Pertanyaan Bisnis', 'Implikasi Keputusan']}
            rows={[
              ['Klasifikasi ABC', 'Item mana yang paling penting secara nilai?', 'Menentukan tingkat perhatian & prioritas service level.'],
              ['Evaluasi ROP', 'Item mana yang rawan kehabisan stok (stockout)?', 'Menaikkan titik pemesanan (safety stock) agar aman.'],
              ['Dead Stock', 'Item mana yang mengendap dan memakan biaya simpan?', 'Mengurangi pembelian, obral/diskon, atau retur.'],
            ]}
          />
        </div>
      </Slide>

      {/* SLIDE 3 — Teori: Matriks Kebijakan */}
      <Slide nav="Matriks" notes="Urutan aturan np.select sangat penting di kode nanti. Jika item memenuhi syarat A+Rawan dan Dead Stock sekaligus (walau jarang), rule teratas yang akan dieksekusi.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Teori
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Matriks Kebijakan (Decision Matrix)
        </h2>
        <div style={{ maxWidth: 900, marginInline: 'auto' }}>
          <Bento
            tiles={[
              { 
                title: 'Prioritas Utama', 
                body: 'Kelas A + Rawan Stockout. Butuh intervensi secepatnya, berisiko menghilangkan banyak pendapatan.',
                c: 6 
              },
              { 
                title: 'Pertahankan (Aman)', 
                body: 'Kelas A + Aman. Pertahankan SOP.',
                c: 6 
              },
              { 
                title: 'Perbaiki Siklus', 
                body: 'Kelas C + Rawan Stockout. Perbaiki tanpa harus darurat/rush-order.',
                c: 6 
              },
              { 
                title: 'Kontrol Sederhana', 
                body: 'Kelas C + Aman. Lanjutkan sistem pemesanan manual/berkala.',
                c: 6 
              },
            ]}
          />
        </div>
      </Slide>

      {/* SLIDE 4 — Praktikum: Penanda Gabungan */}
      <Slide nav="Langkah 1" notes="Alert di bawah sangat krusial, karena urutan indeks dataframe bisa mempengaruhi logika komparasi jika dilakukan terpisah.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Praktikum
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Langkah 1: Membuat Penanda (Flags)
        </h2>
        <div style={{ maxWidth: 900, marginInline: 'auto', marginBottom: 30 }}>
          <CodeWindow
            title="Kode 5.1 (Penggabungan Kondisi)"
            code={`df['is_dead_stock'] = ((df['turnover_ratio'] < BATAS_TURNOVER) & (df['total_orders_last_month'] < BATAS_ORDER))

df['rop_status'] = np.where(df['rop_difference'] < 0, 'Rawan Stockout', 'Aman')

# Tabel Silang
pd.crosstab(df['abc_class'], df['rop_status'], margins=True)`}
          />
        </div>
        <div style={{ maxWidth: 900, marginInline: 'auto' }}>
          <div style={{ padding: '16px', background: 'rgba(255, 60, 60, 0.1)', borderLeft: '4px solid #ff3c3c', borderRadius: '8px' }}>
            <b>Peringatan:</b> Hitung ulang kondisi ini dari <code>df</code> yang <b>SUDAH</b> diurutkan dan diklasifikasikan pada Modul 3 sebelumnya! Pastikan variabel <code>df</code> adalah versi terbaru.
          </div>
        </div>
      </Slide>

      {/* SLIDE 5 — Praktikum: Rekomendasi Otomatis */}
      <Slide nav="Langkah 2" notes="np.select akan mengevaluasi kondisi dari atas ke bawah. Taruh aturan paling terdesak/penting di baris paling atas array.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Praktikum
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Langkah 2: Mesin Rekomendasi (np.select)
        </h2>
        <div style={{ maxWidth: 900, marginInline: 'auto' }}>
          <CodeWindow
            title="Kode 5.2 (Numpy Select)"
            code={`kondisi = [
    (df['abc_class'] == 'A') & (df['rop_status'] == 'Rawan Stockout'),
    (df['is_dead_stock']),
    (df['rop_status'] == 'Rawan Stockout')
]

aksi = [
    'PRIORITAS 1: naikkan ROP & pantau harian',
    'Tinjau: promosi/diskon, retur, atau stop pembelian',
    'Naikkan ROP pada siklus pemesanan berikutnya'
]

df['rekomendasi'] = np.select(kondisi, aksi, default='Pertahankan kebijakan')`}
          />
        </div>
      </Slide>

      {/* SLIDE 6 — Praktikum: Ekspor CSV */}
      <Slide nav="Langkah 3" notes="Ingatkan mahasiswa pengguna Google Colab untuk menggunakan sintaks 'files.download()' jika CSV tidak otomatis terunduh di sidebar.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Praktikum
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Langkah 3: Mengekspor Hasil
        </h2>
        <div style={{ maxWidth: 900, marginInline: 'auto' }}>
          <CodeWindow
            title="Kode 5.3 (Pandas Export)"
            code={`kolom_laporan = [
    'item_id', 'category', 'zone', 'abc_class', 'stock_level', 
    'reorder_point', 'optimal_rop', 'rop_status', 
    'is_dead_stock', 'rekomendasi'
]

laporan = df[kolom_laporan].sort_values(['abc_class', 'rop_status'])

# Simpan ke CSV tanpa menyimpan nomor baris (index)
laporan.to_csv('rekomendasi_gudang.csv', index=False)`}
          />
        </div>
        <div style={{ maxWidth: 900, marginInline: 'auto', marginTop: 15, padding: 15, background: 'var(--surface-2)', borderRadius: 8 }}>
          💡 Di Google Colab, Anda bisa menambahkan blok <code>from google.colab import files</code> dan memanggil <code>files.download('rekomendasi_gudang.csv')</code>.
        </div>
      </Slide>

      {/* SLIDE 7 — Tugas Proyek */}
      <Slide nav="Proyek" notes="Tugas ini merupakan representasi UTS/UAS bagi mata kuliah, pastikan memberikan waktu yang cukup.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Final Project
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Tugas Proyek Mandiri
        </h2>
        <div style={{ maxWidth: 900, marginInline: 'auto' }}>
          <Steps
            items={[
              { title: 'Tugas 1: Kustomisasi Aturan', body: 'Modifikasi aturan np.select Anda sendiri. Tambahkan minimal 2 kondisi baru (misal berdasar zona atau kategori). Jelaskan rasionalisasinya.' },
              { title: 'Tugas 2: Dampak Finansial', body: 'Hitung estimasi penghematan (dari dead stock yang dibuang) dikurangi investasi (biaya untuk menaikkan safety stock item rawan).' },
              { title: 'Tugas 3: Laporan Tertulis', body: 'Susun laporan akhir dalam dokumen 5–8 halaman sesuai dengan format Lampiran B.' },
            ]}
          />
        </div>
      </Slide>

      {/* SLIDE 8 — Struktur Laporan */}
      <Slide nav="Format Laporan" notes="Semua langkah dari Modul 1 sampai Modul 5 harus dirangkum menjadi narasi yang terhubung.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Administrasi
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Format Laporan (Lampiran B)
        </h2>
        <div style={{ maxWidth: 700, marginInline: 'auto' }}>
          <Table
            columns={['Bagian Laporan', 'Isi Ringkas']}
            rows={[
              ['Cover & Judul', 'Identitas Praktikan & Judul Proyek'],
              ['1. Tujuan', 'Objektif bisnis dari analisis data'],
              ['2. Data & Metode', 'Penjelasan singkat Dataset & Tool Python'],
              ['3. Hasil (Result)', 'Grafik EDA (M1), Tabel ABC (M3), Evaluasi (M4)'],
              ['4. Pembahasan', 'Analisis dampak finansial dan penyebab temuan'],
              ['5. Rekomendasi', 'Ringkasan aksi konkret untuk perusahaan logistik'],
              ['Lampiran', 'Tautan / Screenshot Kode, Versi Pustaka, Referensi'],
            ]}
          />
        </div>
      </Slide>

      {/* SLIDE 9 — Rubrik Proyek */}
      <Slide nav="Rubrik M5" notes="Rubrik tugas akhir (M5) jauh lebih berat pada analisis naratif dibandingkan penulisan kode.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Penilaian
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Rubrik Proyek Akhir Modul 5
        </h2>
        <div style={{ maxWidth: 700, marginInline: 'auto' }}>
          <Table
            columns={['Komponen Penilaian', 'Bobot (%)']}
            rows={[
              ['Integrasi Analisis Lintas Modul (1-4)', '30'],
              ['Akurasi Perhitungan Dampak Finansial', '20'],
              ['Kualitas Pelaporan & Kesimpulan Bisnis', '30'],
              ['Reproduksibilitas Kode & Etika Akademik', '20'],
            ]}
          />
        </div>
      </Slide>

      {/* SLIDE 10 — Penutup */}
      <Section
        nav="Penutup"
        n={0}
        kicker="Selesai"
        title="Terima Kasih"
        subtitle="Analisis Big Data untuk Keputusan Logistik yang Lebih Baik"
        notes="Ingat etika akademik: berdiskusi pemecahan masalah dengan teman diperbolehkan, namun penulisan kode dan interpretasi laporan harus hasil karya sendiri."
      />

    </Deck>
  );
}
