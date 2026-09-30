import Deck from './deck/Deck';
import Slide from './deck/Slide';
import Build from './deck/Build';
import Cover from './components/Cover';
import Agenda from './components/Agenda';
import Steps from './components/Steps';
import Bento from './components/Bento';
import Table from './components/Table';
import StatGrid from './components/StatGrid';
import Tabs from './components/Tabs';
import CodeWindow from './components/CodeWindow';
import Accordion from './components/Accordion';
import Contrast from './components/Contrast';
import Split from './components/Split';
import Section from './components/Section';

export default function App() {
  return (
    <Deck>
      {/* SLIDE 1 — Cover */}
      <Cover
        nav="Cover"
        kicker="Buku Praktikum · Modul 0"
        title={
          <>
            Pengantar Big Data dan{' '}
            <span className="accent-text">Persiapan Lingkungan Kerja</span>
          </>
        }
        subtitle="Analisis Big Data: Studi Kasus Logistik dan Manajemen Persediaan Gudang Menggunakan Python"
        notes="Selamat datang di Modul 0. Kita mulai dari konsep dasar Big Data dan menyiapkan alat kerja."
      />

      {/* SLIDE 2 — Tujuan Praktikum */}
      <Steps
        nav="Tujuan"
        kicker="Tujuan Praktikum"
        title="Apa yang Akan Kita Capai?"
        notes="Estimasi waktu praktikum ini sekitar 60–90 menit."
        items={[
          { title: 'Konsep Big Data', body: 'Menjelaskan konsep Big Data (5V) dalam konteks logistik.' },
          { title: 'Tingkat Analitik', body: 'Membedakan 4 tingkat analitik (deskriptif, diagnostik, prediktif, preskriptif).' },
          { title: 'Lingkungan Kerja', body: 'Menyiapkan lingkungan kerja Python (Colab/Jupyter).' },
          { title: 'Import Pustaka', body: 'Mengimpor pustaka dasar: pandas, numpy, matplotlib, seaborn.' }
        ]}
      />

      {/* SLIDE 3 — Teori 5V */}
      <Slide nav="Teori 5V" notes="5V adalah kerangka Laney (2001) yang diperluas.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Konsep Dasar
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Karakteristik 5V dalam Logistik
        </h2>
        <div style={{ maxWidth: 900, marginInline: 'auto' }}>
          <Table
            columns={['Karakteristik', 'Penjelasan Singkat', 'Contoh Nyata']}
            rows={[
              ['Volume', 'Ukuran data yang sangat besar', 'Jutaan transaksi picking & pesanan per bulan'],
              ['Velocity', 'Kecepatan data baru masuk', 'Pemindaian barcode/RFID real-time, GPS armada'],
              ['Variety', 'Beragam jenis data', 'ERP/WMS, sensor IoT, dokumen pengiriman, log aplikasi'],
              ['Veracity', 'Tingkat kebenaran/kualitas data', 'Salah input SKU, stok fisik ≠ stok sistem'],
              ['Value', 'Nilai bisnis dari data', 'Kurangi stockout, turunkan biaya simpan, percepat picking'],
            ]}
          />
        </div>
      </Slide>

      {/* SLIDE 4 — 4 Tingkat Analitik */}
      <Steps
        nav="Tingkat Analitik"
        kicker="Analisis Data"
        title="Empat Tingkat Analitik"
        notes="Praktikum ini fokus pada deskriptif, diagnostik, dan preskriptif."
        items={[
          { title: 'Deskriptif', body: 'Apa yang terjadi? (Dibahas pada Modul 1 & 2)' },
          { title: 'Diagnostik', body: 'Mengapa terjadi? (Dibahas pada Modul 1 & 2)' },
          { title: 'Prediktif', body: 'Apa yang akan terjadi?' },
          { title: 'Preskriptif', body: 'Apa yang sebaiknya dilakukan? (Dibahas pada Modul 3–5)' }
        ]}
      />

      {/* SLIDE 5 — Ekosistem Python */}
      <Slide nav="Ekosistem Python" notes="Kita akan menggunakan 5 pustaka utama ini.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Ekosistem
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Alat Kerja: Pustaka Python
        </h2>
        <div style={{ maxWidth: 800, marginInline: 'auto' }}>
          <StatGrid
            stats={[
              { value: 'pandas', label: 'DataFrame', caption: 'baca CSV, filter, groupby (semua modul)' },
              { value: 'numpy', label: 'Komputasi numerik', caption: 'sqrt, ceil, where, select (Modul 4–5)' },
              { value: 'matplotlib', label: 'Visualisasi Dasar', caption: 'Grafik dasar (semua modul)' },
              { value: 'seaborn', label: 'Grafik Statistik', caption: 'histplot, boxplot, heatmap (Modul 1–4)' },
              { value: 'scipy', label: 'Fungsi Statistik', caption: 'scipy.stats.norm untuk nilai Z (Modul 4)' },
            ]}
          />
        </div>
      </Slide>

      {/* SLIDE 6 — Persiapan Lingkungan */}
      <Slide nav="Persiapan" notes="Pilih salah satu dari dua lingkungan ini.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Instalasi
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Menyiapkan Lingkungan Kerja
        </h2>
        <div style={{ maxWidth: 700, marginInline: 'auto' }}>
          <Tabs
            tabs={[
              {
                label: 'Google Colab',
                content: (
                  <CodeWindow
                    title="colab_setup.py"
                    code={`from google.colab import files
uploaded = files.upload()

# atau

from google.colab import drive
drive.mount('/content/drive')`}
                  />
                ),
              },
              {
                label: 'Jupyter Lokal',
                content: (
                  <CodeWindow
                    title="terminal"
                    code={`pip install pandas numpy matplotlib seaborn scipy notebook
jupyter notebook`}
                  />
                ),
              },
            ]}
          />
        </div>
      </Slide>

      {/* SLIDE 7 — Cek Versi */}
      <Split
        nav="Versi Pustaka"
        notes="Catat versi ini di laporan agar hasil dapat direproduksi."
        kicker="Troubleshooting"
        title="Memeriksa Versi Pustaka"
        body="Penting untuk memastikan versi pustaka kita sama untuk menghindari hasil yang berbeda."
        media={
          <div style={{ padding: 24 }}>
            <CodeWindow
              title="check_versions.py"
              code={`import sys, pandas as pd, numpy as np, matplotlib, seaborn as sns

print("Python    :", sys.version.split()[0])
print("pandas    :", pd.__version__)
print("numpy     :", np.__version__)
print("matplotlib:", matplotlib.__version__)
print("seaborn   :", sns.__version__)`}
            />
            <Build at={1}>
              <div style={{
                marginTop: 20, 
                padding: '16px', 
                background: 'rgba(0,0,0,0.5)', 
                borderRadius: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                color: 'var(--primary)'
              }}>
                Python 3.12 / pandas 3.0 / numpy 2.4 / matplotlib 3.10 / seaborn 0.13
              </div>
            </Build>
          </div>
        }
      />

      {/* SLIDE 8 — Import Library */}
      <Slide nav="Import Library" notes="Pengaturan awal untuk membuat plot lebih cantik.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Setup Awal
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Import Library & Pengaturan Tampilan
        </h2>
        
        <div className="cols" style={{ maxWidth: 1000, marginInline: 'auto', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <CodeWindow
              title="setup.py"
              code={`import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

plt.style.use('seaborn-v0_8-whitegrid')
sns.set_palette("Set2")
pd.options.display.float_format = '{:.2f}'.format`}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Accordion
              items={[
                { title: 'import pandas as pd', body: 'Menggunakan alias "pd" sebagai standar konvensi global.' },
                { title: "plt.style.use(...)", body: 'Menerapkan tema grafik latar putih dengan grid (seaborn-v0_8-whitegrid).' },
                { title: 'sns.set_palette("Set2")', body: 'Menerapkan palet warna default "Set2" agar grafik seragam dan rapi.' },
                { title: 'float_format', body: 'Menampilkan angka desimal dengan 2 digit dan pemisah ribuan agar mudah dibaca.' },
              ]}
            />
          </div>
        </div>
      </Slide>

      {/* SLIDE 9 — Tugas Mandiri */}
      <Steps
        nav="Tugas"
        kicker="Evaluasi"
        title="Tugas Mandiri Modul 0"
        items={[
          { title: 'Screenshot Versi', body: 'Screenshot hasil Kode 0.3 (versi Python & pustaka) — lampirkan di laporan.' },
          { title: 'Contoh 5V Logistik', body: 'Tulis 1 contoh nyata tiap elemen 5V di perusahaan logistik pilihan Anda.' },
          { title: 'Klasifikasi Dataset', body: 'Klasifikasi tiap kolom dataset: numerik kontinu / diskrit / kategorik / tanggal.' }
        ]}
      />

      {/* SLIDE 10 — Rangkuman & Rubrik */}
      <Split
        nav="Rangkuman"
        notes="Perhatikan bobot penilaian ini untuk kelulusan modul."
        kicker="Ringkasan Akhir"
        title="Rangkuman & Rubrik Penilaian"
        body={
          <ul style={{ lineHeight: 1.6, marginTop: 10 }}>
            <li><b>Konsep:</b> Big Data = 5V</li>
            <li><b>Skalabilitas:</b> Alur kerja analitik data kecil dapat diaplikasikan pada data besar</li>
            <li><b>Tools:</b> Menggunakan Python + pandas, numpy, matplotlib, seaborn</li>
            <li><b>Reproducibility:</b> Catat versi & rapikan folder kerja</li>
          </ul>
        }
        media={
          <div style={{ padding: 24, alignSelf: 'center', width: '100%' }}>
            <h3 style={{ marginBottom: 15, fontSize: '20px' }}>Rubrik Penilaian</h3>
            <Table
              columns={['Kriteria', 'Nilai']}
              rows={[
                ['Lingkungan kerja (notebook jalan, dataset, versi)', '40'],
                ['Pemahaman konsep (contoh 5V, klasifikasi kolom)', '40'],
                ['Kerapian (penamaan file, komentar, folder)', '20'],
              ]}
            />
          </div>
        }
      />

      {/* SLIDE 11 — Penutup */}
      <Section
        nav="Modul 1"
        n={1}
        kicker="Modul 0 Selesai"
        title={
          <>
            Siap untuk <span className="accent-text">Modul 1: Exploratory Data Analysis?</span>
          </>
        }
        notes="Modul 0 selesai. Pastikan lingkungan kerja siap sebelum lanjut ke EDA."
      />

    </Deck>
  );
}
