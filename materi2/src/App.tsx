import Deck from './deck/Deck';
import Slide from './deck/Slide';
import Build from './deck/Build';
import Cover from './components/Cover';
import Section from './components/Section';
import Steps from './components/Steps';
import Quote from './components/Quote';
import Table from './components/Table';
import CodeWindow from './components/CodeWindow';
import Contrast from './components/Contrast';
import Accordion from './components/Accordion';

export default function App() {
  return (
    <Deck>
      {/* SECTION PEMBUKA */}
      <Section
        nav="Modul 1"
        n={1}
        kicker="Modul 1"
        title={
          <>
            Exploratory Data <span className="accent-text">Analysis (EDA).</span>
          </>
        }
        subtitle="Memahami data sebelum mengambil keputusan"
        notes="Selamat datang di Modul 1. Di sini kita akan mempelajari pentingnya melakukan eksplorasi data."
      />

      {/* SLIDE 1 — Tujuan */}
      <Steps
        nav="Tujuan M1"
        kicker="Tujuan Praktikum"
        title="Apa yang Akan Kita Capai?"
        notes="Estimasi waktu praktikum ini sekitar 100–120 menit."
        items={[
          { title: 'Memuat Data', body: 'Memuat CSV ke DataFrame.' },
          { title: 'Menilai Kualitas', body: 'Memeriksa tipe, missing values, dan duplikat.' },
          { title: 'Statistik Deskriptif', body: 'Mengetahui ukuran pemusatan, sebaran, dan bentuk.' },
          { title: 'Konversi', body: 'Konversi tanggal & membuat kolom turunan.' },
          { title: 'Visualisasi Dasar', body: 'Membuat histogram, boxplot, dan heatmap korelasi.' },
          { title: 'Deteksi Outlier', body: 'Mendeteksi outlier menggunakan metode IQR.' },
        ]}
      />

      {/* SLIDE 2 — Teori: Apa itu EDA */}
      <Slide nav="Teori EDA" notes="Kesalahan di EDA jauh lebih murah diperbaiki.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Teori
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Apa itu EDA?
        </h2>
        <div style={{ maxWidth: 800, marginInline: 'auto', marginBottom: 40 }}>
          <Quote
            text="EDA adalah pendekatan mengenali data sebelum pemodelan, bertumpu pada ringkasan numerik dan visualisasi."
            author="John W. Tukey"
            title="Matematikawan (1977)"
          />
        </div>
        <div style={{ textAlign: 'center', fontSize: '20px', lineHeight: '1.6' }}>
          <b>Tujuan Utama:</b> Pahami struktur, periksa kualitas, temukan pola & anomali, rumuskan pertanyaan.
        </div>
      </Slide>

      {/* SLIDE 3 — Teori: Statistik Deskriptif */}
      <Slide nav="Statistik" notes="Pada data persediaan, distribusi hampir selalu miring ke kanan → median lebih representatif.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Statistik
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Statistik Deskriptif
        </h2>
        <div style={{ maxWidth: 900, marginInline: 'auto' }}>
          <Table
            columns={['Kelompok', 'Ukuran', 'Makna']}
            rows={[
              ['Pemusatan', 'Mean, Median', 'Nilai tipikal atau tengah-tengah.'],
              ['Sebaran', 'Std, Rentang, IQR', 'Seberapa jauh data menyebar dari pusat.'],
              ['Bentuk', 'Skewness', '>0 ekor kanan panjang, <0 ekor kiri panjang.'],
            ]}
          />
          <div style={{ marginTop: 30, padding: 20, background: 'var(--surface-2)', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
            <b>Highlight:</b> Pada data persediaan, distribusi hampir selalu miring ke kanan → median lebih representatif.
          </div>
        </div>
      </Slide>

      {/* SLIDE 4 — Teori: Outlier IQR */}
      <Slide nav="Outlier IQR" notes="Jangan hapus outlier sebelum paham penyebabnya.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Anomali
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Outlier dan Aturan IQR
        </h2>
        
        <div style={{ maxWidth: 600, marginInline: 'auto', marginBottom: 40 }}>
          <CodeWindow
            title="Rumus IQR"
            code={`IQR = Q3 - Q1
Batas bawah = Q1 - 1.5 × IQR
Batas atas  = Q3 + 1.5 × IQR`}
          />
        </div>

        <Contrast
          left={{
            label: 'Mitos',
            title: 'Outlier = Error',
            points: ['Outlier ≠ selalu kesalahan input.'],
          }}
          right={{
            label: 'Fakta',
            title: 'Insight Berharga',
            points: ['Bisa jadi kejadian nyata yang penting untuk analisis.'],
          }}
        />
      </Slide>

      {/* SLIDE 5 — Praktikum: Memuat Data */}
      <Slide nav="Langkah 1" notes="Jumlah & nama kolom sesuai kamus data. Jika FileNotFoundError, cek path.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Praktikum
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Langkah 1: Memuat Data
        </h2>
        <div style={{ maxWidth: 700, marginInline: 'auto' }}>
          <CodeWindow
            title="Kode 1.1"
            code={`df = pd.read_csv('logistics_dataset.csv')
display(df.head())
print("Ukuran dataset:", df.shape)`}
          />
        </div>
      </Slide>

      {/* SLIDE 6 — Praktikum: Kualitas Data */}
      <Slide nav="Langkah 2" notes="Perhatikan Non-Null Count, Dtype, dan jumlah duplikat.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Praktikum
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Langkah 2: Kualitas Data
        </h2>
        <div style={{ maxWidth: 700, marginInline: 'auto' }}>
          <CodeWindow
            title="Kode 1.2"
            code={`df.info()
print(df.isna().sum())
print(df.duplicated().sum())`}
          />
        </div>
      </Slide>

      {/* SLIDE 7 — Praktikum: Distribusi Stok */}
      <Slide nav="Histogram" notes="Sumbu X adalah stock level.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Praktikum
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Langkah 3: Distribusi Stok
        </h2>
        <div style={{ maxWidth: 700, marginInline: 'auto' }}>
          <CodeWindow
            title="Kode 1.5"
            code={`sns.histplot(df['stock_level'], bins=30, kde=True, color='blue')`}
          />
        </div>
        <Build at={1}>
          <div style={{ maxWidth: 700, marginInline: 'auto', marginTop: 20, padding: 15, background: 'var(--surface-2)', borderRadius: 8 }}>
            💡 Skewness positif + Mean &gt; Median → sebagian kecil barang menampung stok sangat besar → pintu masuk Modul 2.
          </div>
        </Build>
      </Slide>

      {/* SLIDE 8 — Praktikum: Performa Zona */}
      <Slide nav="Boxplot" notes="Zona dengan median lebih tinggi = picking lebih lambat.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Praktikum
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Langkah 4: Performa Zona (Boxplot)
        </h2>
        <div style={{ maxWidth: 700, marginInline: 'auto' }}>
          <CodeWindow
            title="Kode 1.6"
            code={`sns.boxplot(data=df, x='zone', y='picking_time_seconds', order=['A','B','C','D'])`}
          />
        </div>
        <Build at={1}>
          <div style={{ maxWidth: 700, marginInline: 'auto', marginTop: 20, padding: 15, background: 'var(--surface-2)', borderRadius: 8 }}>
            💡 Zona dengan median lebih tinggi = picking lebih lambat (jarak, tata letak, kepadatan).
          </div>
        </Build>
      </Slide>

      {/* SLIDE 9 — Praktikum: Korelasi */}
      <Slide nav="Korelasi" notes="Korelasi ≠ sebab-akibat. Hati-hati dalam interpretasi.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Praktikum
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Langkah 5: Heatmap Korelasi
        </h2>
        <div style={{ maxWidth: 900, marginInline: 'auto' }}>
          <CodeWindow
            title="Kode 1.8"
            code={`sns.heatmap(df.select_dtypes('number').corr(), annot=True, fmt='.2f', cmap='coolwarm', center=0)`}
          />
        </div>
      </Slide>

      {/* SLIDE 10 — Latihan Terbimbing */}
      <Slide nav="Latihan M1" notes="Isi bagian kosong untuk melengkapi sintaks pandas.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Evaluasi
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Latihan Terbimbing
        </h2>
        <div style={{ maxWidth: 900, marginInline: 'auto' }}>
          <CodeWindow
            title="Kode 1.9 (Fill in the blanks)"
            code={`rata_stok = df.groupby('____')['____'].mean().sort_values(ascending=____)
p95 = df['stock_level'].quantile(____)
persen_lama = (df['____'] > ____).mean() * 100`}
          />
        </div>
      </Slide>

      {/* SLIDE 11 — Tugas & Pertanyaan */}
      <Slide nav="Tugas M1" notes="Tugas mandiri yang harus dikerjakan mahasiswa di luar jam lab.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Penugasan
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Tugas Mandiri & Pertanyaan Analisis
        </h2>
        <div className="cols" style={{ maxWidth: 1000, marginInline: 'auto' }}>
          <div style={{ flex: 1 }}>
            <Steps
              items={[
                { title: 'Boxplot', body: 'Boxplot picking_time per category' },
                { title: 'Histogram', body: 'Histogram turnover_ratio + skewness' },
                { title: '5 Temuan', body: '5 temuan EDA: temuan → bukti → implikasi' },
              ]}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Accordion
              items={[
                { title: 'Pertanyaan 1', body: 'Sebutkan insight dari distribusi data logistik!' },
                { title: 'Pertanyaan 2', body: 'Berdasarkan nilai korelasi, variabel apa yang mempengaruhi waktu picking?' },
                { title: 'Pertanyaan 3', body: 'Apa implikasi dari keberadaan outlier di data persediaan?' },
                { title: 'Pertanyaan 4', body: 'Berikan rekomendasi awal berdasarkan visualisasi zona!' },
              ]}
            />
          </div>
        </div>
      </Slide>

      {/* SLIDE 12 — Rubrik */}
      <Slide nav="Rubrik M1" notes="Perhatikan rubrik penilaian untuk Modul 1.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Penilaian
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Rubrik Penilaian Modul 1
        </h2>
        <div style={{ maxWidth: 600, marginInline: 'auto' }}>
          <Table
            columns={['Komponen Penilaian', 'Bobot (%)']}
            rows={[
              ['Ketepatan kode', '30'],
              ['Latihan terbimbing', '25'],
              ['Interpretasi', '30'],
              ['Kerapian & orisinalitas', '15'],
            ]}
          />
        </div>
      </Slide>

    </Deck>
  );
}
