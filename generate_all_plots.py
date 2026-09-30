import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import os

# Set style
plt.style.use('seaborn-v0_8-whitegrid')
sns.set_palette("Set2")

output_dir = '/run/media/andy/512/Pengajaran/2026-Ganjil/TI-Analisan Big Data/MateriAnalisaBigData/public'
os.makedirs(output_dir, exist_ok=True)
df = pd.read_csv('/run/media/andy/512/Pengajaran/2026-Ganjil/TI-Analisan Big Data/Dataset/archive/logistics_dataset.csv')

# --- MODUL 2: Dead Stock ---
# Assuming turnover_ratio < 1.0 is dead stock (based on previous slides)
# Calculate financial loss: holding_cost_per_unit_day * stock_level * 30 (monthly)
df['monthly_holding_cost'] = df['holding_cost_per_unit_day'] * df['stock_level'] * 30
dead_stock = df[df['turnover_ratio'] < 1.0]
total_loss = dead_stock['monthly_holding_cost'].sum()

fig, ax = plt.subplots(figsize=(8, 5))
sns.scatterplot(x='turnover_ratio', y='monthly_holding_cost', data=df, hue=(df['turnover_ratio'] < 1.0), palette={True: 'red', False: 'blue'}, alpha=0.6, ax=ax)
ax.axvline(1.0, color='red', linestyle='--', label='Batas Dead Stock')
ax.set_title('Turnover Ratio vs Holding Cost')
ax.set_xlabel('Turnover Ratio')
ax.set_ylabel('Monthly Holding Cost ($)')
ax.legend(title='Dead Stock')
plt.tight_layout()
plt.savefig(os.path.join(output_dir, 'modul2_plot.png'), dpi=150)
plt.close()

# --- MODUL 3: ABC Classification ---
# Calculate annual usage value (A.U.V) or total value = stock_level * unit_price
df['total_value'] = df['stock_level'] * df['unit_price']
df_sorted = df.sort_values(by='total_value', ascending=False).copy()
df_sorted['cumulative_value'] = df_sorted['total_value'].cumsum()
df_sorted['cumulative_percent'] = df_sorted['cumulative_value'] / df_sorted['total_value'].sum()

def classify_abc(percent):
    if percent <= 0.80: return 'A'
    elif percent <= 0.95: return 'B'
    else: return 'C'
df_sorted['ABC_Class'] = df_sorted['cumulative_percent'].apply(classify_abc)

fig, ax = plt.subplots(figsize=(8, 5))
sns.countplot(x='ABC_Class', data=df_sorted, order=['A', 'B', 'C'], palette='viridis', ax=ax)
ax.set_title('Jumlah Item per Kelas (A, B, C)')
ax.set_xlabel('Kelas ABC')
ax.set_ylabel('Jumlah SKU')
plt.tight_layout()
plt.savefig(os.path.join(output_dir, 'modul3_plot.png'), dpi=150)
plt.close()

# --- MODUL 4: ROP & Safety Stock ---
# Calculate Lead Time Demand = daily_demand * lead_time_days
# Safety Stock = Z (1.65 for 95%) * demand_std_dev * sqrt(lead_time_days)
# ROP = LTD + SS
df['LTD'] = df['daily_demand'] * df['lead_time_days']
df['SS'] = 1.65 * df['demand_std_dev'] * np.sqrt(df['lead_time_days'])
df['calculated_ROP'] = df['LTD'] + df['SS']

fig, ax = plt.subplots(figsize=(8, 5))
sns.histplot(df['calculated_ROP'] - df['reorder_point'], bins=40, kde=True, ax=ax, color='purple')
ax.set_title('Selisih ROP Kalkulasi vs ROP Aktual (Sistem Lama)')
ax.set_xlabel('Selisih ROP (Hitung - Sistem)')
ax.set_ylabel('Frekuensi')
plt.tight_layout()
plt.savefig(os.path.join(output_dir, 'modul4_plot.png'), dpi=150)
plt.close()

print(f"Modul 2 Loss: {total_loss}")
