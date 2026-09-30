import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os

# Set style
plt.style.use('seaborn-v0_8-whitegrid')
sns.set_palette("Set2")

# Read dataset
df = pd.read_csv('/run/media/andy/512/Pengajaran/2026-Ganjil/TI-Analisan Big Data/Dataset/archive/logistics_dataset.csv')

# Create a figure with 2 subplots
fig, axes = plt.subplots(1, 2, figsize=(14, 6))

# Plot 1: Histogram of stock level
sns.histplot(df['stock_level'], bins=30, kde=True, ax=axes[0])
axes[0].set_title('Distribusi Level Stok')
axes[0].set_xlabel('Stock Level')
axes[0].set_ylabel('Frekuensi')

# Plot 2: Boxplot of stock level by Zone
sns.boxplot(x='zone', y='stock_level', data=df, ax=axes[1])
axes[1].set_title('Sebaran Stok Berdasarkan Zona')
axes[1].set_xlabel('Zona Gudang')
axes[1].set_ylabel('Stock Level')

plt.tight_layout()

# Ensure public directory exists and save plot
output_dir = '/run/media/andy/512/Pengajaran/2026-Ganjil/TI-Analisan Big Data/MateriAnalisaBigData/public'
os.makedirs(output_dir, exist_ok=True)
plt.savefig(os.path.join(output_dir, 'eda_plot.png'), dpi=150)
print("Plot berhasil disimpan sebagai eda_plot.png")
