import Deck from './deck/Deck';
import Slide from './deck/Slide';
import Section from './components/Section';
import Steps from './components/Steps';
import CodeWindow from './components/CodeWindow';
import Table from './components/Table';
import Build from './deck/Build';

export default function App() {
  return (
    <Deck>
      {/* SLIDE PEMBUKA */}
      <Section
        nav="Modul 4"
        n={4}
        kicker="Modul 4"
        title={
          <>
            Reorder Point & <span className="accent-text">Safety Stock</span>
          </>
        }
        subtitle="Kapan harus memesan ulang?"
        notes="Selamat datang di Modul 4. Setelah kita mengklasifikasikan item penting, kini kita pastikan barang tersebut tidak kehabisan stok."
      />

      {/* SLIDE 1 — Tujuan */}
      <Steps
        nav="Tujuan M4"
        kicker="Tujuan Praktikum"
        title="Apa yang Akan Kita Capai?"
        notes="Estimasi waktu praktikum ini sekitar 120–150 menit."
        items={[
          { title: 'Konsep Dasar', body: 'Memahami lead time, safety stock (SS), ROP, service level, dan stockout.' },
          { title: 'Nilai Z', body: 'Mengetahui cara mendapatkan Nilai Z untuk probabilitas service level.' },
          { title: 'Perhitungan', body: 'Menghitung Safety Stock & ROP.' },
          { title: 'Evaluasi Sistem', body: 'Membandingkan ROP optimal dengan sistem ROP lama.' },
          { title: 'Uji Sensitivitas', body: 'Melakukan uji sensitivitas Service Level terhadap biaya.' },
        ]}
      />

      {/* SLIDE 2 — Teori: Konsep ROP */}
      <Slide nav="Konsep ROP" notes="ROP terlalu rendah → stockout. ROP terlalu tinggi → stok menumpuk.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Teori
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Siklus Reorder Point
        </h2>
        <div style={{ maxWidth: 800, marginInline: 'auto' }}>
          <Steps
            items={[
              { title: '1. Pemantauan', body: 'Stok dipantau secara berkelanjutan seiring berjalannya permintaan harian.' },
              { title: '2. Titik Pemesanan', body: 'Pesan barang ke supplier saat level stok menyentuh garis ROP.' },
              { title: '3. Lead Time', body: 'Menunggu barang dikirim selama masa Lead Time.' },
              { title: '4. Barang Tiba', body: 'Barang tiba tepat sebelum stok habis (atau menyentuh Safety Stock). Siklus berulang.' },
            ]}
          />
        </div>
      </Slide>

      {/* SLIDE 3 — Teori: Istilah */}
      <Slide nav="Istilah M4" notes="Pastikan Anda memahami variabel-variabel ini sebelum masuk ke rumus matematika.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Teori
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Istilah Penting (Variabel)
        </h2>
        <div style={{ maxWidth: 900, marginInline: 'auto' }}>
          <Table
            columns={['Istilah', 'Simbol / Kolom Dataset', 'Penjelasan']}
            rows={[
              ['Daily Demand', 'd (daily_demand)', 'Rata-rata permintaan per hari'],
              ['Demand Std Dev', 'σd (demand_std_dev)', 'Simpangan baku (fluktuasi) permintaan'],
              ['Lead Time', 'L (lead_time_days)', 'Waktu tunggu barang datang (hari)'],
              ['Safety Stock', 'SS (dihitung)', 'Stok pengaman cadangan'],
              ['Reorder Point', 'ROP (reorder_point)', 'Titik pesan ulang sistem vs optimal'],
              ['Stockout Count', 'stockout_count_last_month', 'Berapa kali kehabisan stok bulan lalu'],
              ['Service Level', 'SL (%)', 'Probabilitas target tidak kehabisan stok'],
            ]}
          />
        </div>
      </Slide>

      {/* SLIDE 4 — Teori: Rumus */}
      <Slide nav="Rumus ROP" notes="Mengapa menggunakan akar dari L (√L)? Karena fluktuasi (varians) permintaan harian bersifat independen, sehingga standar deviasi berakumulasi berdasarkan aturan akar.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Teori
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Rumus Matematika
        </h2>
        <div style={{ maxWidth: 700, marginInline: 'auto', marginBottom: 20 }}>
          <CodeWindow
            title="Formulasi"
            code={`ROP Tanpa Ketidakpastian:
ROP = d × L

Safety Stock (Ketidakpastian Permintaan):
SS = Z × σd × √L

ROP Optimal:
ROP = (d × L) + SS`}
          />
        </div>
        <Build at={1}>
          <div style={{ maxWidth: 700, marginInline: 'auto', textAlign: 'center', fontSize: '18px', lineHeight: '1.6', background: 'var(--surface-2)', padding: '15px', borderRadius: '8px' }}>
            💡 <b>Catatan:</b> Penggunaan <code>√L</code> didasarkan pada asumsi statistik bahwa fluktuasi permintaan harian saling independen.
          </div>
        </Build>
      </Slide>

      {/* SLIDE 5 — Teori: Nilai Z */}
      <Slide nav="Nilai Z" notes="Menaikkan service level tidak linear terhadap SS. Untuk naik dari 99% ke 99.9% butuh kenaikan Z (dan Safety Stock) yang luar biasa drastis.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Teori
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Tabel Z-Score (Probabilitas)
        </h2>
        <div style={{ maxWidth: 500, marginInline: 'auto' }}>
          <Table
            columns={['Target Service Level', 'Nilai Z-Score']}
            rows={[
              ['90%', '1.282'],
              ['95%', '1.645'],
              ['97.5%', '1.960'],
              ['99%', '2.326'],
              ['99.9%', '3.090'],
            ]}
          />
        </div>
      </Slide>

      {/* SLIDE 6 — Teori: Contoh Manual */}
      <Slide nav="Contoh Manual" notes="Kerjakan ulang dengan Python di Tugas Mandiri.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Teori
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Contoh Perhitungan Manual
        </h2>
        <div style={{ maxWidth: 700, marginInline: 'auto', fontSize: '22px', lineHeight: '1.8' }}>
          <b>Diketahui:</b><br />
          • Permintaan harian (<code>d</code>) = 20<br />
          • Std Deviasi Permintaan (<code>σd</code>) = 5<br />
          • Lead Time (<code>L</code>) = 9 hari<br />
          • Service Level (<code>SL</code>) = 95% → (<code>Z</code> = 1.645)<br /><br />
          
          <b>Langkah:</b>
          <ul style={{ marginLeft: 30 }}>
            <li>Standar deviasi masa L (<code>σ_L</code>) = 5 × √9 = 5 × 3 = 15</li>
            <li>Safety Stock (<code>SS</code>) = 1.645 × 15 ≈ 25 unit</li>
            <li>LTD (Lead Time Demand) = 20 × 9 = 180 unit</li>
            <li><b>ROP Optimal</b> = 180 + 25 = <b>205 unit</b></li>
          </ul>
        </div>
      </Slide>

      {/* SLIDE 7 — Praktikum: Nilai Z dengan scipy */}
      <Slide nav="Langkah 1" notes="Scipy menyediakan modul khusus untuk probabilitas normal (Z-distribution).">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Praktikum
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Langkah 1: Nilai Z dengan Scipy
        </h2>
        <div style={{ maxWidth: 900, marginInline: 'auto' }}>
          <CodeWindow
            title="Kode 4.1 (Python Scipy)"
            code={`from scipy.stats import norm

for sl in [0.90, 0.95, 0.975, 0.99]:
    z_value = norm.ppf(sl)
    print(f"SL {sl*100:.1f}% -> Z = {z_value:.3f}")`}
          />
        </div>
      </Slide>

      {/* SLIDE 8 — Praktikum: Safety Stock */}
      <Slide nav="Langkah 2" notes="np.ceil() untuk jaga service level tidak turun (dibulatkan ke atas).">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Praktikum
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Langkah 2: Menghitung Safety Stock
        </h2>
        <div style={{ maxWidth: 900, marginInline: 'auto' }}>
          <CodeWindow
            title="Kode 4.2 (Python Pandas & Numpy)"
            code={`import numpy as np

z_score = 1.645 # Untuk SL 95%

# Perhitungan Safety Stock
df['optimal_safety_stock'] = (
    z_score * df['demand_std_dev'] * np.sqrt(df['lead_time_days'])
)

# Pembulatan ke atas untuk menjaga service level
df['optimal_safety_stock'] = np.ceil(df['optimal_safety_stock'])`}
          />
        </div>
      </Slide>

      {/* SLIDE 9 — Praktikum: ROP & Selisih */}
      <Slide nav="Langkah 3" notes="rop_difference negatif = ROP sistem lama lebih kecil dari ROP optimal, ini artinya rawan stockout.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Praktikum
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Langkah 3: ROP Optimal & Selisih
        </h2>
        <div style={{ maxWidth: 900, marginInline: 'auto' }}>
          <CodeWindow
            title="Kode 4.3 (Kalkulasi)"
            code={`# Hitung ROP Optimal
df['optimal_rop'] = (df['daily_demand'] * df['lead_time_days']) + df['optimal_safety_stock']
df['optimal_rop'] = np.ceil(df['optimal_rop'])

# Selisih ROP (Sistem Lama vs Optimal)
df['rop_difference'] = df['reorder_point'] - df['optimal_rop']`}
          />
        </div>
      </Slide>

      {/* SLIDE 10 — Praktikum: Evaluasi */}
      <Slide nav="Langkah 4" notes="Kita menandai item rawan stockout dan mengurutkannya.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Praktikum
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Langkah 4: Evaluasi Keamanan Stok
        </h2>
        <div style={{ maxWidth: 900, marginInline: 'auto' }}>
          <CodeWindow
            title="Kode 4.4 (Kondisional)"
            code={`# Status Keamanan
df['status_rop'] = np.where(df['rop_difference'] < 0, 'Rawan Stockout', 'Aman')

# Tampilkan 10 item rawan terburuk berdasarkan kejadian nyata bulan lalu
top_rawan = df[df['status_rop'] == 'Rawan Stockout'].sort_values(
    by='stockout_count_last_month', 
    ascending=False
)
display(top_rawan[['item_id', 'status_rop', 'rop_difference', 'stockout_count_last_month']].head(10))`}
          />
        </div>
      </Slide>

      {/* SLIDE 11 — Praktikum: Visualisasi */}
      <Slide nav="Langkah 5" notes="Garis diagonal y=x membedakan area di mana sistem overstock vs understock.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Praktikum
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Langkah 5: Scatterplot Evaluasi
        </h2>
        <div style={{ maxWidth: 900, marginInline: 'auto' }}>
          <CodeWindow
            title="Kode 4.5 (Seaborn)"
            code={`plt.figure(figsize=(8,6))
sns.scatterplot(x='optimal_rop', y='reorder_point', hue='status_rop', data=df)

# Garis diagonal y=x (Optimal = Aktual)
max_val = max(df['optimal_rop'].max(), df['reorder_point'].max())
plt.plot([0, max_val], [0, max_val], color='red', linestyle='--')

plt.xscale('symlog')
plt.yscale('symlog')
plt.show()`}
          />
        </div>
      </Slide>

      {/* SLIDE 12 — Praktikum: Sensitivitas SL */}
      <Slide nav="Langkah 6" notes="Membungkus logika dalam fungsi sangat berguna untuk menjalankan simulasi berkali-kali tanpa rewrite kode.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Praktikum
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Langkah 6: Sensitivitas Service Level
        </h2>
        <div style={{ maxWidth: 900, marginInline: 'auto' }}>
          <CodeWindow
            title="Kode 4.6 (Fungsi Simulasi)"
            code={`def hitung_rop(data, sl):
    z = norm.ppf(sl)
    ss = np.ceil(z * data['demand_std_dev'] * np.sqrt(data['lead_time_days']))
    rop_opt = np.ceil((data['daily_demand'] * data['lead_time_days']) + ss)
    rawan = (data['reorder_point'] - rop_opt) < 0
    return rawan.sum()

for sl in [0.90, 0.95, 0.99]:
    jml_rawan = hitung_rop(df, sl)
    print(f"SL {sl*100}% -> Ada {jml_rawan} item Rawan Stockout")`}
          />
        </div>
      </Slide>

      {/* SLIDE 13 — Latihan & Tugas */}
      <Slide nav="Latihan M4" notes="Gunakan fill in the blanks untuk melatih intuisi analitik mahasiswa.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Evaluasi
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Latihan & Tugas Mandiri
        </h2>
        <div style={{ maxWidth: 900, marginInline: 'auto', marginBottom: 20 }}>
          <CodeWindow
            title="Kode 4.7 (Isi Bagian Kosong)"
            code={`# 1. Biaya penyesuaian SS
df['biaya_ss'] = df['optimal_safety_stock'] * df['____']

# 2. Jumlah item rawan per kategori
rawan_per_kategori = df[df['status_rop'] == '____'].groupby('____')['item_id'].count()

# 3. Rata-rata stockout bulan lalu berdasarkan status ROP
mean_stockout = df.groupby('____')['____'].mean()`}
          />
        </div>
        <div style={{ maxWidth: 900, marginInline: 'auto' }}>
          <Steps
            items={[
              { title: 'Tugas 1', body: 'Tulis fungsi Python untuk menghitung secara manual persis seperti contoh di Slide 6.' },
              { title: 'Tugas 2', body: 'Terapkan Service Level berbeda per Kelas ABC (A=99%, B=95%, C=90%).' },
              { title: 'Tugas 3', body: 'Cek korelasi antara selisih ROP dengan stockout_count_last_month.' },
              { title: 'Tugas 4', body: 'Analisislah trade-off kenaikan nilai stok vs perbaikan Service Level.' },
            ]}
          />
        </div>
      </Slide>

      {/* SLIDE 14 — Rubrik */}
      <Slide nav="Rubrik M4" notes="Perhatikan rubrik penilaian untuk Modul 4.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Penilaian
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Rubrik Penilaian Modul 4
        </h2>
        <div style={{ maxWidth: 700, marginInline: 'auto' }}>
          <Table
            columns={['Komponen Penilaian', 'Bobot (%)']}
            rows={[
              ['Ketepatan penulisan kode Python', '30'],
              ['Pengisian latihan terbimbing', '20'],
              ['Analisis sensitivitas & trade-off', '35'],
              ['Fungsi perhitungan manual kustom', '15'],
            ]}
          />
        </div>
      </Slide>

    </Deck>
  );
}
