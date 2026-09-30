import Deck from './deck/Deck';
import Slide from './deck/Slide';
import Section from './components/Section';
import Steps from './components/Steps';
import BigNumber from './components/BigNumber';
import Table from './components/Table';
import CodeWindow from './components/CodeWindow';
import Build from './deck/Build';

export default function App() {
  return (
    <Deck>
      {/* SLIDE PEMBUKA */}
      <Section
        nav="Modul 3"
        n={3}
        kicker="Modul 3"
        title={
          <>
            Klasifikasi <span className="accent-text">ABC</span>
          </>
        }
        subtitle="Prioritas berdasarkan nilai penggunaan tahunan"
        notes="Selamat datang di Modul 3. Kita akan belajar cara menentukan prioritas pengelolaan stok persediaan menggunakan hukum Pareto."
      />

      {/* SLIDE 1 — Tujuan */}
      <Steps
        nav="Tujuan M3"
        kicker="Tujuan Praktikum"
        title="Apa yang Akan Kita Capai?"
        notes="Di modul ini, kita akan fokus pada pemilahan barang agar manajemen bisa lebih fokus mengawasi barang yang bernilai tinggi."
        items={[
          { title: 'Prinsip Dasar', body: 'Memahami prinsip Pareto & Klasifikasi ABC.' },
          { title: 'Hitung AUV', body: 'Menghitung Annual Usage Value (AUV) & persentase kumulatif.' },
          { title: 'Visualisasi Pareto', body: 'Membuat ringkasan kontribusi kelas & diagram Pareto.' },
          { title: 'Analisis Kebijakan', body: 'Melakukan analisis batas klasifikasi & menetapkan kebijakan per kelas.' },
        ]}
      />

      {/* SLIDE 2 — Teori: Pareto */}
      <Slide nav="Pareto" notes="Angka 80/20 adalah gambaran umum, bukan hukum alam mutlak yang kaku. Kadang bisa 70/30 atau 90/10.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Teori
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Prinsip Pareto
        </h2>
        <BigNumber
          value={<span className="accent-text" style={{ fontSize: '150px' }}>80/20</span>}
          caption="Hukum pareto (Aturan 80/20)"
          foot="Sebagian kecil item menyumbang sebagian besar nilai perusahaan."
        />
      </Slide>

      {/* SLIDE 3 — Teori: Tabel ABC */}
      <Slide nav="Tabel ABC" notes="Setiap kelas butuh perlakuan berbeda. Jangan buang waktu mengawasi ketat paku atau lakban (Kelas C).">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Teori
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Karakteristik Tiap Kelas
        </h2>
        <div style={{ maxWidth: 1000, marginInline: 'auto' }}>
          <Table
            columns={['Kelas', 'Kumulatif Nilai', 'Karakteristik Item', 'Kebijakan Kontrol']}
            rows={[
              ['A', '≤ 80%', 'Sangat sedikit item, namun bernilai sangat besar', 'Kontrol sangat ketat, audit sering, Service Level tinggi'],
              ['B', '80% - 95%', 'Jumlah dan nilai di tingkat menengah', 'Kontrol moderat, evaluasi berkala'],
              ['C', 'Sisanya (5%)', 'Jumlah item sangat banyak, nilai kecil (murah)', 'Kontrol sederhana, sistem dua-bin, pemesanan massal'],
            ]}
          />
        </div>
      </Slide>

      {/* SLIDE 4 — Teori: AUV */}
      <Slide nav="AUV" notes="Item murah yang sering terjual bisa AUV-nya lebih besar dari item mahal yang jarang terjual.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Teori
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Annual Usage Value (AUV)
        </h2>
        <div style={{ maxWidth: 800, marginInline: 'auto', marginBottom: 40 }}>
          <CodeWindow
            title="Rumus Nilai Penggunaan Tahunan"
            code={`AUV = Permintaan Harian × 365 × Harga per Unit`}
          />
        </div>
        <div style={{ maxWidth: 800, marginInline: 'auto', textAlign: 'center', fontSize: '20px', lineHeight: '1.6', background: 'var(--surface-2)', padding: '20px', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
          <b>Catatan Penting:</b> Klasifikasi ABC tidak hanya melihat "Harga Barang", tetapi seberapa banyak uang yang berputar dari barang tersebut dalam setahun.
        </div>
      </Slide>

      {/* SLIDE 5 — Praktikum: Hitung AUV */}
      <Slide nav="Langkah 1" notes="Pengurutan (sort_values) wajib dilakukan dari nilai tertinggi ke terendah sebelum menghitung kumulatif.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Praktikum
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Langkah 1: Menghitung AUV & Kumulatif
        </h2>
        <div style={{ maxWidth: 900, marginInline: 'auto' }}>
          <CodeWindow
            title="Kode 3.1 (Python Pandas)"
            code={`# 1. Hitung AUV
df['annual_usage_value'] = df['daily_demand'] * 365 * df['unit_price']

# 2. Urutkan dari nilai terbesar ke terkecil
df = df.sort_values(by='annual_usage_value', ascending=False).reset_index(drop=True)

# 3. Hitung persentase kumulatif
total_value = df['annual_usage_value'].sum()
df['cum_value_pct'] = (df['annual_usage_value'].cumsum() / total_value) * 100`}
          />
        </div>
      </Slide>

      {/* SLIDE 6 — Praktikum: Klasifikasi */}
      <Slide nav="Langkah 2" notes="Fungsi apply() menjalankan klasifikasi ABC baris per baris secara otomatis.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Praktikum
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Langkah 2: Melabeli Kelas A, B, C
        </h2>
        <div style={{ maxWidth: 900, marginInline: 'auto' }}>
          <CodeWindow
            title="Kode 3.2 (Python Pandas)"
            code={`# Definisi fungsi untuk klasifikasi
def classify_abc(percentage):
    if percentage <= 80:
        return 'A'
    elif percentage <= 95:
        return 'B'
    else:
        return 'C'

# Terapkan fungsi ke dalam kolom baru
df['abc_class'] = df['cum_value_pct'].apply(classify_abc)`}
          />
        </div>
      </Slide>

      {/* SLIDE 7 — Praktikum: Ringkasan */}
      <Slide nav="Langkah 3" notes="Bandingkan persen_item vs persen_nilai → semakin timpang (misal A hanya 10% item tapi 80% nilai), semakin kuat Paretotonya.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Praktikum
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Langkah 3: Ringkasan Hasil
        </h2>
        <div style={{ maxWidth: 900, marginInline: 'auto' }}>
          <CodeWindow
            title="Kode 3.3 (Agregasi Data)"
            code={`summary_abc = df.groupby('abc_class').agg(
    jumlah_item=('item_id', 'count'),
    total_nilai=('annual_usage_value', 'sum')
)

summary_abc['persen_item'] = (summary_abc['jumlah_item'] / len(df)) * 100
summary_abc['persen_nilai'] = (summary_abc['total_nilai'] / total_value) * 100

print(summary_abc)`}
          />
        </div>
        <Build at={1}>
          <div style={{ maxWidth: 900, marginInline: 'auto', marginTop: 15, padding: 15, background: 'var(--surface-2)', borderRadius: 8 }}>
            💡 Coba bandingkan <code>persen_item</code> dengan <code>persen_nilai</code>. Semakin timpang persentasenya, semakin terbukti hukum Pareto pada gudang ini!
          </div>
        </Build>
      </Slide>

      {/* SLIDE 8 — Praktikum: Pareto */}
      <Slide nav="Langkah 5" notes="twinx() adalah trik Matplotlib untuk membuat dua sumbu Y dalam satu plot (satu untuk bar jumlah item, satu lagi untuk garis kumulatif persen).">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Praktikum
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Langkah 5: Membuat Diagram Pareto
        </h2>
        <div style={{ maxWidth: 900, marginInline: 'auto' }}>
          <CodeWindow
            title="Kode 3.5 (Python Matplotlib & Seaborn)"
            code={`import matplotlib.pyplot as plt
import seaborn as sns

fig, ax1 = plt.subplots()

# Bar Chart untuk persentase nilai per kelas (Sumbu Kiri)
sns.barplot(x=summary_abc.index, y='persen_nilai', data=summary_abc, ax=ax1)

# Line Chart untuk kumulatif (Sumbu Kanan)
ax2 = ax1.twinx()
ax2.plot(summary_abc.index, summary_abc['persen_nilai'].cumsum(), color='red', marker='o')

# Garis referensi 80% dan 95%
ax2.axhline(80, color='gray', linestyle='--')
ax2.axhline(95, color='gray', linestyle='--')

plt.show()`}
          />
        </div>
      </Slide>

      {/* SLIDE 9 — Latihan & Tugas */}
      <Slide nav="Latihan M3" notes="Gunakan latihan terbimbing (titik-titik) untuk memastikan mahasiswa paham cara mengubah angka threshold.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Evaluasi
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Latihan & Tugas Mandiri
        </h2>
        <div style={{ maxWidth: 900, marginInline: 'auto', marginBottom: 20 }}>
          <CodeWindow
            title="Kode 3.6 (Isi Bagian Kosong)"
            code={`# Membuat tabel silang kategori vs abc_class
tabel_silang = pd.____(df['category'], df['____'])

# Modifikasi fungsi untuk batas 70% dan 90%
def classify_abc_v2(percentage):
    if percentage <= ____:
        return 'A'
    elif percentage <= ____:
        return 'B'
    else: return 'C'`}
          />
        </div>
        <div style={{ maxWidth: 900, marginInline: 'auto' }}>
          <Steps
            items={[
              { title: 'Tugas 1', body: 'Buatlah tabel silang (crosstab) antara Kategori vs Kelas ABC.' },
              { title: 'Tugas 2', body: 'Bandingkan hasil ringkasan aturan batas (80/95) dengan aturan baru (70/90).' },
              { title: 'Tugas 3', body: 'Usulkan minimal 2 kebijakan spesifik untuk Kelas A, Kelas B, dan Kelas C.' },
            ]}
          />
        </div>
      </Slide>

      {/* SLIDE 10 — Rubrik */}
      <Slide nav="Rubrik M3" notes="Perhatikan rubrik penilaian untuk Modul 3.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Penilaian
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Rubrik Penilaian Modul 3
        </h2>
        <div style={{ maxWidth: 700, marginInline: 'auto' }}>
          <Table
            columns={['Komponen Penilaian', 'Bobot (%)']}
            rows={[
              ['Ketepatan kode & output', '30'],
              ['Latihan terbimbing', '25'],
              ['Analisis & rumusan kebijakan', '35'],
              ['Kerapian format laporan', '10'],
            ]}
          />
        </div>
      </Slide>

    </Deck>
  );
}
