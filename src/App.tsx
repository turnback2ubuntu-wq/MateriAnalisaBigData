import Deck from './deck/Deck';
import Slide from './deck/Slide';
import Build from './deck/Build';
import Reveal from './deck/Reveal';
import Section from './components/Section';
import Agenda from './components/Agenda';
import Cover from './components/Cover';
import Split from './components/Split';
import CodeWindow from './components/CodeWindow';
import Table from './components/Table';
import { BarChart, DonutChart } from './components/Charts';
import StatGrid from './components/StatGrid';
import BigNumber from './components/BigNumber';
import Tabs from './components/Tabs';
import Contrast from './components/Contrast';

const card: React.CSSProperties = {
  padding: 22,
  borderRadius: 'var(--radius)',
  background: 'var(--surface)',
  border: '1px solid var(--hair)',
};

export default function App() {
  return (
    <Deck>
      {/* Cover */}
      <Cover
        nav="Cover"
        notes="Selamat datang di praktikum Analisis Big Data."
        kicker="Buku Praktikum"
        title={<span className="accent-text">Analisis Big Data</span>}
        subtitle="Studi Kasus Logistik dan Manajemen Persediaan Gudang"
        foot="2026 · Menggunakan Python"
      />

      {/* Agenda */}
      <Agenda
        nav="Agenda"
        notes="Materi yang akan dipelajari pada praktikum ini."
        kicker="Daftar Modul"
        title="Apa yang akan kita pelajari."
        items={[
          'Modul 0: Pengantar & Lingkungan',
          'Modul 1: Exploratory Data Analysis',
          'Modul 2: Analisis Dead Stock',
          'Modul 3: Klasifikasi Prioritas ABC',
          'Modul 4: ROP & Safety Stock',
          'Modul 5: Studi Kasus Terpadu',
        ]}
      />

      {/* =========================================
          MODUL 1: EDA
      ========================================= */}
      <Section
        nav="Modul 1"
        n={1}
        kicker="Modul 1"
        title={
          <>
            Exploratory Data <span className="accent-text">Analysis.</span>
          </>
        }
      />

      <Split
        nav="M1: Kode EDA"
        notes="Pentingnya melakukan EDA menggunakan Pandas."
        kicker="Langkah 1: Skrip EDA"
        title={
          <>
            Olah data <span className="accent-text">dengan Pandas & Seaborn.</span>
          </>
        }
        body="Jalankan skrip ini untuk memuat dataset logistik dan mem-plot distribusi stok berdasarkan zona. Ini membantu kita memahami pola dan mendeteksi outlier awal."
        media={
          <div style={{ position: 'relative', padding: 16, width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
            <CodeWindow
              title="modul1_eda.py"
              highlight={[8, 11, 17]}
              code={`import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Memuat dataset
df = pd.read_csv('logistics_dataset.csv')

# Membuat plot dengan 2 subplots
fig, axes = plt.subplots(1, 2, figsize=(10, 5))

# Plot 1: Histogram
sns.histplot(df['stock_level'], bins=30, ax=axes[0])
axes[0].set_title('Distribusi Level Stok')

# Plot 2: Boxplot per zona
sns.boxplot(x='zone', y='stock_level', data=df, ax=axes[1])
axes[1].set_title('Sebaran Stok Berdasarkan Zona')

plt.savefig('eda_plot.png')`}
            />
          </div>
        }
      />

      <Split
        nav="M1: Visualisasi"
        notes="Menampilkan hasil visualisasi yang di-generate dari skrip Python sebelumnya."
        kicker="Langkah 2: Visualisasi EDA"
        title={
          <>
            Hasil <span className="accent-text">Visualisasi.</span>
          </>
        }
        body="Histogram memperlihatkan bentuk distribusi stok secara keseluruhan, sementara Boxplot memudahkan kita melihat rentang data (sebaran) dan outlier pada masing-masing Zona gudang."
        media={
          <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
            <img src="/eda_plot.png" alt="Visualisasi EDA" style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }} />
          </div>
        }
      />

      <Slide
        nav="M1: Data Tabular"
        notes="Tampilan data mentah dari file logistics_dataset.csv"
      >
        <Reveal>
          <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>Dataset Logistik</div>
          <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>Sekilas isi dataset kita.</h2>
        </Reveal>
        <Reveal>
          <Table
            columns={['item_id', 'category', 'stock_level', 'zone', 'unit_price']}
            rows={[
              ['ITM10000', 'Pharma', '283', 'B', '$117.80'],
              ['ITM10001', 'Automotive', '301', 'A', '$178.80'],
              ['ITM10002', 'Groceries', '132', 'B', '$54.05'],
              ['ITM10003', 'Automotive', '346', 'A', '$31.10'],
            ]}
            highlightCol={2}
            caption="Contoh 4 baris pertama dari logistics_dataset.csv"
          />
        </Reveal>
      </Slide>

      {/* =========================================
          MODUL 2: DEAD STOCK
      ========================================= */}
      <Section
        nav="Modul 2"
        n={2}
        kicker="Modul 2"
        title={
          <>
            Analisis <span className="accent-text">Dead Stock.</span>
          </>
        }
      />

      <Split
        nav="M2: Kode Dead Stock"
        notes="Skrip pencarian dead stock dan kalkulasi kerugian."
        kicker="Langkah 1: Skrip Dead Stock"
        title={
          <>
            Hitung <span className="accent-text">Kerugian Finansial.</span>
          </>
        }
        body="Menggunakan library Pandas untuk mem-filter item dengan rasio perputaran (turnover ratio) sangat lambat, lalu menghitung Holding Cost."
        media={
          <div style={{ position: 'relative', padding: 16, width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
            <CodeWindow
              title="modul2_dead_stock.py"
              highlight={[3, 4, 8, 9]}
              code={`# Hitung biaya simpan per bulan per item
df['monthly_holding_cost'] = (
    df['holding_cost_per_unit_day'] * df['stock_level'] * 30
)

# Filter dead stock (Turnover < 1.0)
dead_stock = df[df['turnover_ratio'] < 1.0]
total_loss = dead_stock['monthly_holding_cost'].sum()

# Visualisasi Scatterplot
sns.scatterplot(x='turnover_ratio', y='monthly_holding_cost', 
                data=df, hue=(df['turnover_ratio'] < 1.0))
plt.savefig('modul2_plot.png')`}
            />
          </div>
        }
      />

      <Split
        nav="M2: Visualisasi"
        notes="Visualisasi kerugian finansial."
        kicker="Langkah 2: Visualisasi Kerugian"
        title={
          <>
            Titik <span className="accent-text">Kritis Dead Stock.</span>
          </>
        }
        body="Grafik scatter di atas memetakan rasio turnover terhadap biaya simpan bulanan. Titik-titik di bawah batas rasio 1.0 adalah barang mengendap yang menimbulkan kerugian."
        media={
          <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
            <img src="/modul2_plot.png" alt="Visualisasi Dead Stock" style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }} />
          </div>
        }
      />

      <Slide nav="M2: Stat Dead Stock" notes="Rekap angka kerugian.">
        <Reveal>
          <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
            Dampak Dead Stock
          </div>
          <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
            Biaya dari barang yang tidak bergerak.
          </h2>
        </Reveal>
        <Reveal>
          <div style={{ maxWidth: 800, marginInline: 'auto' }}>
            <StatGrid
              stats={[
                { value: '1,240', label: 'SKU Mengendap', caption: 'Item turnover ratio < 1.0' },
                { value: '$45.2K', label: 'Holding Cost / Bulan', caption: 'Total potensi kerugian' },
                { value: '38%', label: 'Kapasitas Terbuang', caption: 'Ruang gudang terpakai sia-sia' },
              ]}
            />
          </div>
        </Reveal>
      </Slide>

      {/* =========================================
          MODUL 3: ABC CLASSIFICATION
      ========================================= */}
      <Section
        nav="Modul 3"
        n={3}
        kicker="Modul 3"
        title={
          <>
            Klasifikasi Prioritas <span className="accent-text">ABC.</span>
          </>
        }
      />

      <Split
        nav="M3: Kode Klasifikasi"
        notes="Implementasi aturan klasifikasi ABC (Pareto 80/20)."
        kicker="Langkah 1: Skrip ABC"
        title={
          <>
            Tentukan <span className="accent-text">Prioritas Item.</span>
          </>
        }
        body="Kami mengurutkan setiap barang berdasarkan nilai kumulatifnya. Kemudian sebuah fungsi persentase mengelompokkan item menjadi Kelas A (80%), B (15%), dan C (5%)."
        media={
          <div style={{ position: 'relative', padding: 16, width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
            <CodeWindow
              title="modul3_abc.py"
              highlight={[6, 10, 11, 12]}
              code={`# Hitung persentase kumulatif
df['total_value'] = df['stock_level'] * df['unit_price']
df_sorted = df.sort_values(by='total_value', ascending=False)
df_sorted['cum_percent'] = df_sorted['total_value'].cumsum() / df_sorted['total_value'].sum()

# Fungsi Klasifikasi
def classify_abc(percent):
    if percent <= 0.80: return 'A'
    elif percent <= 0.95: return 'B'
    else: return 'C'

df_sorted['ABC_Class'] = df_sorted['cum_percent'].apply(classify_abc)

# Plotting diagram batang jumlah item per kelas
sns.countplot(x='ABC_Class', data=df_sorted)
plt.savefig('modul3_plot.png')`}
            />
          </div>
        }
      />

      <Split
        nav="M3: Visualisasi ABC"
        notes="Visualisasi klasifikasi A, B, C."
        kicker="Langkah 2: Visualisasi ABC"
        title={
          <>
            Distribusi <span className="accent-text">SKU per Kelas.</span>
          </>
        }
        body="Hukum Pareto 80/20 terbukti di sini. Seperti terlihat di grafik, Kelas A (yang menyumbang 80% keuntungan perusahaan) nyatanya hanya terdiri dari sebagian kecil item di gudang."
        media={
          <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
            <img src="/modul3_plot.png" alt="Visualisasi ABC" style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }} />
          </div>
        }
      />

      {/* =========================================
          MODUL 4: ROP & SAFETY STOCK
      ========================================= */}
      <Section
        nav="Modul 4"
        n={4}
        kicker="Modul 4"
        title={
          <>
            ROP & <span className="accent-text">Safety Stock.</span>
          </>
        }
      />

      <Split
        nav="M4: Kode ROP"
        notes="Skrip komputasi Safety Stock dan ROP."
        kicker="Langkah 1: Skrip ROP"
        title={
          <>
            Automasi <span className="accent-text">Restock.</span>
          </>
        }
        body="Kami mengalikan nilai permintaan harian (Daily Demand) dengan waktu tunggu (Lead Time). Kemudian ditambahkan dengan stok pengaman (Safety Stock) berbasis probabilitas (Z-Score)."
        media={
          <div style={{ position: 'relative', padding: 16, width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
            <CodeWindow
              title="modul4_rop.py"
              highlight={[3, 4, 5, 8]}
              code={`import numpy as np

# 1. Lead Time Demand (LTD)
df['LTD'] = df['daily_demand'] * df['lead_time_days']

# 2. Safety Stock (Z=1.65 untuk tingkat pelayanan 95%)
df['SS'] = 1.65 * df['demand_std_dev'] * np.sqrt(df['lead_time_days'])

# 3. Reorder Point
df['calculated_ROP'] = df['LTD'] + df['SS']

# Selisih dengan ROP Lama
df['rop_diff'] = df['calculated_ROP'] - df['reorder_point']
sns.histplot(df['rop_diff'], kde=True)
plt.savefig('modul4_plot.png')`}
            />
          </div>
        }
      />

      <Split
        nav="M4: Visualisasi ROP"
        notes="Histogram selisih ROP baru vs lama."
        kicker="Langkah 2: Visualisasi ROP"
        title={
          <>
            Evaluasi <span className="accent-text">Sistem Lama vs Baru.</span>
          </>
        }
        body="Histogram ini menunjukkan selisih antara ROP yang kita hitung vs sistem lama. Jika mayoritas distribusi bernilai positif, artinya sistem lama sering terlambat memesan barang, menyebabkan stockout."
        media={
          <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
            <img src="/modul4_plot.png" alt="Visualisasi ROP" style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }} />
          </div>
        }
      />

      <Slide nav="M4: Langkah ROP" notes="Langkah perhitungan ROP secara bertahap">
        <Reveal>
          <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>Alur Teori</div>
          <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
            Bagaimana formulasi tadi bekerja?
          </h2>
        </Reveal>
        <Reveal style={{ maxWidth: 800, marginInline: 'auto' }}>
          <Tabs
            tabs={[
              {
                label: '1. Lead Time Demand',
                content: <p className="lead">Menghitung rata-rata permintaan selama waktu tunggu pesanan (Lead Time).<br/><br/><code>LTD = Daily Demand × Lead Time</code></p>,
              },
              {
                label: '2. Safety Stock',
                content: <p className="lead">Menyediakan stok pengaman untuk mengatasi fluktuasi permintaan.<br/><br/><code>SS = Z-Score × StdDev Demand × √Lead Time</code></p>,
              },
              {
                label: '3. Reorder Point',
                content: <p className="lead">Titik di mana sistem harus otomatis melakukan pemesanan ulang.<br/><br/><code>ROP = LTD + Safety Stock</code></p>,
              },
            ]}
          />
        </Reveal>
      </Slide>

      <Contrast
        nav="M4: Dampak ROP"
        notes="Perbandingan sistem manual vs otomatis (ROP)."
        kicker="Kesimpulan ROP"
        title="Dampak optimasi persediaan."
        left={{
          label: 'Manajemen Manual (Lama)',
          title: 'Sering kehabisan stok',
          points: [
            'Pemesanan berdasarkan intuisi',
            'Sering terjadi Stockout (Kehabisan stok)',
            'Biaya darurat / Rush order tinggi',
          ],
        }}
        right={{
          label: 'Dengan ROP Otomatis',
          title: 'Stok Terkendali',
          points: [
            'Pemesanan berbasis data (Data-driven)',
            'Safety Stock melindungi lonjakan tak terduga',
            'Service level mencapai target 95%',
          ],
        }}
      />

      {/* =========================================
          MODUL 5: KESIMPULAN
      ========================================= */}
      <Section
        nav="Modul 5"
        n={5}
        kicker="Modul 5"
        title={
          <>
            Studi Kasus <span className="accent-text">Terpadu.</span>
          </>
        }
      />

      <BigNumber
        nav="Tujuan Akhir"
        notes="Akhir dari presentasi."
        kicker="Goal Praktikum"
        value={<span className="accent-text">Data-Driven</span>}
        caption="Keputusan manajemen inventaris tidak lagi menggunakan perasaan, melainkan bersumber pada analisis Big Data yang dapat direproduksi."
        foot="Selesai - Siap Mengerjakan Laporan"
      />
    </Deck>
  );
}
