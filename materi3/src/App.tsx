import Deck from './deck/Deck';
import Slide from './deck/Slide';
import Section from './components/Section';
import Steps from './components/Steps';
import CodeWindow from './components/CodeWindow';
import Contrast from './components/Contrast';
import Table from './components/Table';
import Build from './deck/Build';

export default function App() {
  return (
    <Deck>
      {/* SLIDE PEMBUKA */}
      <Section
        nav="Modul 2"
        n={2}
        kicker="Modul 2"
        title={
          <>
            Analisis <span className="accent-text">Dead Stock</span>
          </>
        }
        subtitle="Mengendapkan modal, biaya simpan, dan strategi penanganan"
        notes="Selamat datang di Modul 2. Kita akan mengidentifikasi dan menangani barang yang mengendap (dead stock) di gudang."
      />

      {/* SLIDE 1 — Tujuan */}
      <Steps
        nav="Tujuan M2"
        kicker="Tujuan Praktikum"
        title="Apa yang Akan Kita Capai?"
        notes="Estimasi waktu praktikum ini sekitar 100–120 menit."
        items={[
          { title: 'Konsep Persediaan', body: 'Memahami konsep dasar persediaan & holding cost.' },
          { title: 'Kriteria Dead Stock', body: 'Menentukan kriteria dead stock berbasis ambang batas (threshold).' },
          { title: 'Hitung Kerugian', body: 'Menghitung kerugian finansial akibat barang mengendap.' },
          { title: 'Agregasi Data', body: 'Agregasi kerugian per kategori barang.' },
          { title: 'Uji Sensitivitas', body: 'Melakukan uji sensitivitas terhadap ambang batas.' },
        ]}
      />

      {/* SLIDE 2 — Teori: Dua Sisi Persediaan */}
      <Slide nav="Teori M2" notes="Manajemen persediaan adalah tentang mencari titik keseimbangan optimal.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Teori
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Dua Sisi Persediaan
        </h2>
        <Contrast
          left={{
            label: 'Understocking',
            title: 'Stok Terlalu Sedikit',
            points: ['Kehilangan penjualan.', 'Pelanggan kecewa (dibahas Modul 4).'],
          }}
          right={{
            label: 'Overstocking',
            title: 'Stok Terlalu Banyak',
            points: ['Modal tertahan.', 'Biaya simpan tinggi.', 'Risiko usang (Modul 2 ini).'],
          }}
        />
      </Slide>

      {/* SLIDE 3 — Teori: Holding Cost */}
      <Slide nav="Holding Cost" notes="Biaya simpan (holding cost) seringkali tidak terlihat secara langsung, namun perlahan menggerus profitabilitas.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Teori
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Holding Cost (Biaya Simpan)
        </h2>
        <div style={{ maxWidth: 700, marginInline: 'auto', marginBottom: 40 }}>
          <CodeWindow
            title="Rumus Kalkulasi"
            code={`Holding Cost = Stok × Biaya Simpan/Unit/Hari × Jumlah Hari`}
          />
        </div>
        <div style={{ maxWidth: 800, marginInline: 'auto', textAlign: 'center', fontSize: '20px', lineHeight: '1.6', background: 'var(--surface-2)', padding: '20px', borderRadius: '12px' }}>
          <b>Komponen biaya meliputi:</b> Modal yang tertahan, biaya ruang (gudang), biaya penanganan, asuransi, serta risiko rusak/kadaluarsa.
        </div>
      </Slide>

      {/* SLIDE 4 — Teori: Inventory Turnover */}
      <Slide nav="Turnover" notes="Turnover yang rendah berarti barang sangat lambat terjual.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Teori
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Inventory Turnover
        </h2>
        <div style={{ maxWidth: 600, marginInline: 'auto', marginBottom: 30 }}>
          <CodeWindow
            title="Rumus Rasio Perputaran"
            code={`Turnover = HPP ÷ Rata-rata Nilai Persediaan
Days of Inventory = 365 ÷ Turnover`}
          />
        </div>
        <Build at={1}>
          <div style={{ maxWidth: 800, marginInline: 'auto', textAlign: 'center', fontSize: '20px', lineHeight: '1.6', borderLeft: '4px solid var(--primary)', paddingLeft: '20px' }}>
            <b>Contoh Kasus:</b> Jika turnover bernilai 1,5 per tahun, berarti barang tersebut membutuhkan waktu ~243 hari (hampir 8 bulan) untuk terjual!
          </div>
        </Build>
      </Slide>

      {/* SLIDE 5 — Teori: Kriteria Dead Stock */}
      <Slide nav="Kriteria" notes="Waspadai false positive: barang musiman, item baru, suku cadang kritis yang memang lambat tapi wajib ada.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Teori
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Kriteria Dead Stock
        </h2>
        <div style={{ maxWidth: 700, marginInline: 'auto', marginBottom: 40 }}>
          <CodeWindow
            title="Kriteria Rule-Based (Logika AND)"
            code={`turnover_ratio < 1,5
total_orders_last_month < 100`}
          />
        </div>
        <Contrast
          left={{
            label: 'Catatan Manajerial',
            title: 'Sifat Ambang Batas',
            points: ['Ambang batas = keputusan manajerial.', 'Bukan kebenaran mutlak.'],
          }}
          right={{
            label: 'Peringatan',
            title: 'Waspadai False Positive',
            points: ['Barang musiman.', 'Item baru (baru launching).', 'Suku cadang kritis.'],
          }}
        />
      </Slide>

      {/* SLIDE 6 — Praktikum: Filter */}
      <Slide nav="Langkah 1" notes="Gunakan & bukan and. Wajib .copy() untuk mencegah SettingWithCopyWarning.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Praktikum
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Langkah 1: Filter Dead Stock
        </h2>
        <div style={{ maxWidth: 900, marginInline: 'auto' }}>
          <CodeWindow
            title="Kode 2.1 (Python Pandas)"
            code={`BATAS_TURNOVER = 1.5
BATAS_ORDER = 100

dead_stock_condition = (
    (df['turnover_ratio'] < BATAS_TURNOVER) & 
    (df['total_orders_last_month'] < BATAS_ORDER)
)

df_dead_stock = df[dead_stock_condition].copy()`}
          />
        </div>
      </Slide>

      {/* SLIDE 7 — Praktikum: Kerugian */}
      <Slide nav="Langkah 2" notes="Kerugian ini dihitung berdasarkan hari diam, misalnya 30 hari.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Praktikum
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Langkah 2: Menghitung Kerugian
        </h2>
        <div style={{ maxWidth: 900, marginInline: 'auto' }}>
          <CodeWindow
            title="Kode 2.2 (Python Pandas)"
            code={`durasi_diam_hari = 30

df_dead_stock['wasted_holding_cost'] = (
    df_dead_stock['stock_level'] * 
    df_dead_stock['holding_cost_per_unit_day'] * 
    durasi_diam_hari
)

total_kerugian = df_dead_stock['wasted_holding_cost'].sum()`}
          />
        </div>
      </Slide>

      {/* SLIDE 8 — Praktikum: Top 5 Item */}
      <Slide nav="Langkah 3" notes="Perhatikan kategori & zona item tersebut untuk melihat pola (misal: apakah semua dead stock berkumpul di zona tertentu?).">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Praktikum
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Langkah 3: Identifikasi Top 5 Item Terburuk
        </h2>
        <div style={{ maxWidth: 900, marginInline: 'auto' }}>
          <CodeWindow
            title="Kode 2.3 (Python Pandas)"
            code={`top_5_dead_stock = df_dead_stock.sort_values(
    by='wasted_holding_cost', 
    ascending=False
).head()

display(top_5_dead_stock[['item_id', 'category', 'wasted_holding_cost']])`}
          />
        </div>
      </Slide>

      {/* SLIDE 9 — Praktikum: Kerugian per Kategori */}
      <Slide nav="Langkah 4" notes="Kita mengelompokkan (groupby) berdasarkan kategori untuk melihat kategori mana penyumbang kerugian terbesar.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Praktikum
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Langkah 4: Agregasi per Kategori
        </h2>
        <div style={{ maxWidth: 900, marginInline: 'auto' }}>
          <CodeWindow
            title="Kode 2.4 (Python Pandas & Seaborn)"
            code={`kerugian_kategori = df_dead_stock.groupby('category')['wasted_holding_cost'].sum().sort_values(ascending=False)
print(kerugian_kategori)

# Visualisasi
import seaborn as sns
import matplotlib.pyplot as plt

sns.barplot(x=kerugian_kategori.index, y=kerugian_kategori.values)`}
          />
        </div>
      </Slide>

      {/* SLIDE 10 — Praktikum: Sensitivitas */}
      <Slide nav="Langkah 5" notes="Jika hasil sangat berubah untuk selisih ambang kecil, keputusan manajerial perlu diambil dengan sangat hati-hati.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Praktikum
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Langkah 5: Uji Sensitivitas
        </h2>
        <div style={{ maxWidth: 900, marginInline: 'auto' }}>
          <CodeWindow
            title="Kode 2.5 (Python Looping)"
            code={`# Loop ambang batas untuk melihat dampaknya
for b_turnover in [1.0, 1.5, 2.0]:
    for b_order in [50, 100, 150]:
        kondisi = (df['turnover_ratio'] < b_turnover) & (df['total_orders_last_month'] < b_order)
        rugi = df[kondisi]['stock_level'] * df[kondisi]['holding_cost_per_unit_day'] * 30
        print(f"T={b_turnover}, O={b_order} -> Rugi: {rugi.sum()}")`}
          />
        </div>
        <Build at={1}>
          <div style={{ maxWidth: 900, marginInline: 'auto', marginTop: 15, padding: 15, background: 'var(--surface-2)', borderRadius: 8 }}>
            💡 Jika hasil sangat fluktuatif hanya karena selisih kecil pada ambang batas, berhati-hatilah dalam membuat keputusan cut-off.
          </div>
        </Build>
      </Slide>

      {/* SLIDE 11 — Latihan & Tugas */}
      <Slide nav="Latihan M2" notes="Minta mahasiswa melengkapi sintaks pandas untuk berlatih filter mandiri.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Evaluasi
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Latihan & Tugas Mandiri
        </h2>
        <div style={{ maxWidth: 900, marginInline: 'auto' }}>
          <CodeWindow
            title="Kode 2.6 (Isi Bagian Kosong)"
            code={`# Filter dead stock berdasarkan aturan zona khusus
zona_kritis = df[(df['____'] == 'A') & (df['____'] < 1.0)].____()`}
          />
        </div>
        <div style={{ maxWidth: 900, marginInline: 'auto', marginTop: 30 }}>
          <Steps
            items={[
              { title: 'Tugas 1', body: 'Tetapkan ambang versi sendiri dan rasionalisasinya.' },
              { title: 'Tugas 2', body: 'Usulkan tindakan untuk 5 item dead stock terburuk.' },
              { title: 'Tugas 3', body: 'Hitung total kerugian jika dibiarkan 30, 60, dan 90 hari.' },
              { title: 'Tugas 4', body: 'Sebutkan 3 keterbatasan dari kriteria rule-based sederhana ini.' },
            ]}
          />
        </div>
      </Slide>

      {/* SLIDE 12 — Rubrik */}
      <Slide nav="Rubrik M2" notes="Perhatikan rubrik penilaian untuk Modul 2.">
        <div className="kicker" style={{ marginBottom: 12, textAlign: 'center' }}>
          Penilaian
        </div>
        <h2 className="headline" style={{ textAlign: 'center', marginBottom: 30 }}>
          Rubrik Penilaian Modul 2
        </h2>
        <div style={{ maxWidth: 700, marginInline: 'auto' }}>
          <Table
            columns={['Komponen Penilaian', 'Bobot (%)']}
            rows={[
              ['Ketepatan kode & output', '30'],
              ['Pengisian latihan terbimbing', '25'],
              ['Analisis, sensitivitas & rekomendasi', '35'],
              ['Kerapian format laporan', '10'],
            ]}
          />
        </div>
      </Slide>

    </Deck>
  );
}
