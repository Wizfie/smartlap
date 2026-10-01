<template>
  <main class="flex-grow max-w-[1380px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-6 sm:gap-8 font-sans">
    
    <!-- Hero Header -->
    <section class="max-w-3xl">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 mb-3">
        <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
        <span class="text-xs font-semibold tracking-wide">Rekomendasi Cerdas Sesuai Kebutuhan</span>
      </div>
      <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
        Temukan Laptop yang Tepat Sesuai Profil Anda
      </h1>
      <p class="text-sm sm:text-base text-slate-500 mt-2 leading-relaxed">
        Pilih profil aktivitas Anda di bawah ini. Sistem kami akan secara otomatis memprioritaskan spesifikasi terpenting dengan metode Simple Additive Weighting (SAW) agar Anda mendapatkan perangkat terbaik sesuai anggaran.
      </p>
    </section>

    <!-- Persona Selector Grid (3-column Bento Style) -->
    <section>
      <div class="flex items-center justify-between mb-3">
        <span class="text-xs uppercase font-semibold tracking-wider text-slate-400 font-mono">
          Langkah 1: Pilih Profil Penggunaan
        </span>
        <span class="text-xs text-slate-500 font-medium">Prioritas spesifikasi disesuaikan otomatis</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="(profile, idx) in spkStore.profiles"
          :key="profile.id"
          @click="selectProfile(profile.id)"
          class="bg-white rounded-xl p-5 shadow-sm transition-all cursor-pointer flex flex-col justify-between group relative"
          :class="spkStore.selectedProfileId === profile.id 
            ? 'border-2 border-blue-600 ring-4 ring-blue-600/10' 
            : 'border border-slate-200 hover:border-slate-300'"
        >
          <!-- Active Floating Badge -->
          <div v-if="spkStore.selectedProfileId === profile.id" class="absolute -top-3 right-5">
            <span class="bg-blue-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-sm">
              <span class="material-symbols-outlined" style="font-size: 14px;">check</span>
              <span>Profil Dipilih</span>
            </span>
          </div>

          <div>
            <div class="flex items-center justify-between mb-3">
              <div
                class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                :class="spkStore.selectedProfileId === profile.id ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 group-hover:text-blue-600'"
              >
                <span class="material-symbols-outlined">{{ getProfileIcon(profile.name) }}</span>
              </div>
              <span
                class="text-xs font-mono px-2 py-0.5 rounded"
                :class="spkStore.selectedProfileId === profile.id 
                  ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200' 
                  : 'bg-slate-50 text-slate-400 border border-slate-200'"
              >
                {{ spkStore.selectedProfileId === profile.id ? 'Aktif' : `Profil 0${idx + 1}` }}
              </span>
            </div>

            <h3
              class="font-bold text-lg transition-colors"
              :class="spkStore.selectedProfileId === profile.id ? 'text-slate-900' : 'text-slate-800 group-hover:text-blue-600'"
            >
              {{ profile.name }}
            </h3>
            <p class="text-sm text-slate-500 mt-1.5 leading-relaxed">
              {{ profile.description }}
            </p>
          </div>

          <!-- Bottom Priority Badges -->
          <div class="mt-6 pt-4 border-t border-slate-100">
            <span class="text-xs text-slate-400 block mb-2 font-mono">Fokus Prioritas:</span>
            <div class="flex flex-wrap gap-1.5 text-xs font-mono">
              <span
                v-for="(tag, tIdx) in getProfileTags(profile.name)"
                :key="tIdx"
                class="px-2 py-0.5 rounded"
                :class="spkStore.selectedProfileId === profile.id ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200' : 'bg-slate-100 text-slate-700'"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Filter: Budget Range & Brand -->
    <section class="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 sm:gap-6">
      <div class="w-full md:w-1/3">
        <label class="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          Rentang Anggaran Maksimal
        </label>
        <div class="flex items-center gap-3">
          <input
            type="range"
            min="5000000"
            max="40000000"
            step="500000"
            v-model.number="spkStore.filters.max_price"
            @change="triggerCalculation"
            class="w-full accent-blue-600 cursor-pointer"
          />
          <span class="text-xs font-mono font-bold text-slate-900 shrink-0">
            {{ formatIDR(spkStore.filters.max_price) }}
          </span>
        </div>
      </div>

      <div class="w-full md:w-1/3">
        <label class="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
          Preferensi Brand
        </label>
        <select
          v-model="spkStore.filters.brand"
          @change="triggerCalculation"
          class="w-full text-xs py-2.5 px-3 rounded-lg border border-slate-200 bg-slate-50 font-medium focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
        >
          <option value="all">Semua Brand (Semua Merek)</option>
          <option v-for="b in availableBrands" :key="b" :value="b">{{ b }}</option>
        </select>
      </div>

      <div class="w-full md:w-auto md:self-end">
        <button
          @click="triggerCalculation"
          class="w-full md:w-auto h-10 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span class="material-symbols-outlined" style="font-size: 18px;">search</span>
          <span>Tampilkan Rekomendasi</span>
        </button>
      </div>
    </section>

    <!-- Top Recommendations Results Section -->
    <section class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
        <div>
          <h2 class="text-xl font-bold text-slate-900">Hasil Rekomendasi Laptop Terbaik</h2>
          <p class="text-xs text-slate-500 mt-0.5">
            Disesuaikan dengan profil pilihan Anda: <span class="font-semibold text-slate-900">{{ currentProfileName }}</span>
          </p>
        </div>
        <div class="flex items-center gap-3">
          <div class="inline-flex items-center gap-1.5 text-xs font-mono text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span>{{ spkStore.recommendations.length }} Unit Paling Sesuai</span>
          </div>
          <router-link
            to="/katalog"
            class="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>Buka Katalog Lengkap</span>
            <span class="material-symbols-outlined" style="font-size: 16px;">arrow_forward</span>
          </router-link>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="spkStore.loading" class="py-16 text-center bg-white rounded-xl border border-slate-200">
        <div class="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p class="text-sm font-semibold text-slate-600">Menghitung kecocokan rekomendasi terbaik...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="spkStore.recommendations.length === 0" class="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm">
        <span class="material-symbols-outlined text-slate-400 text-[48px] mb-2">sentiment_dissatisfied</span>
        <h3 class="text-base font-bold text-slate-800">Tidak ada laptop yang cocok</h3>
        <p class="text-xs text-slate-500 mt-1 mb-4">
          Coba naikkan batas anggaran Anda atau ubah filter brand untuk melihat pilihan lainnya.
        </p>
        <button
          @click="resetBudget"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all shadow-sm"
        >
          Reset Filter Anggaran
        </button>
      </div>

      <!-- Recommendations Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        <LaptopCard
          v-for="rec in spkStore.recommendations"
          :key="rec.id || rec.laptop_id"
          :laptop="rec.laptop || rec"
          :rank="rec.rank"
          :matchPercentage="rec.matchPercentage"
        />
      </div>
    </section>

  </main>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useSpkStore } from '../stores/spkStore';
import LaptopCard from '../components/LaptopCard.vue';

const spkStore = useSpkStore();

const availableBrands = computed(() => {
  if (spkStore.brands && spkStore.brands.length > 0) {
    return spkStore.brands;
  }
  return ['Acer', 'Advan', 'Apple', 'Asus', 'Axioo', 'Dell', 'HP', 'Huawei', 'Lenovo', 'MSI'];
});

const currentProfileName = computed(() => {
  const p = spkStore.profiles.find(x => x.id === spkStore.selectedProfileId);
  return p ? p.name : 'Pekerja & Profesional';
});

function getProfileIcon(name) {
  if (!name) return 'laptop';
  const lower = name.toLowerCase();
  if (lower.includes('pelajar') || lower.includes('mahasiswa')) return 'school';
  if (lower.includes('pekerja') || lower.includes('profesional')) return 'work';
  if (lower.includes('gamer') || lower.includes('kreator')) return 'sports_esports';
  return 'devices';
}

function getProfileTags(name) {
  if (!name) return ['Harga Terjangkau', 'Performa Baik'];
  const lower = name.toLowerCase();
  if (lower.includes('pelajar') || lower.includes('mahasiswa')) {
    return ['Harga Terjangkau', 'Baterai Awet', 'Portabel'];
  }
  if (lower.includes('pekerja') || lower.includes('profesional')) {
    return ['CPU Kencang', 'RAM 16GB', 'Bodi Tipis'];
  }
  if (lower.includes('gamer') || lower.includes('kreator')) {
    return ['Kartu Grafis GPU', 'RAM 16-32GB', 'Layar 120Hz+'];
  }
  return ['Spesifikasi Seimbang', 'Garansi Resmi'];
}

function selectProfile(id) {
  spkStore.setProfile(id);
}

function triggerCalculation() {
  spkStore.calculateRecommendations();
}

function resetBudget() {
  spkStore.filters.max_price = 35000000;
  spkStore.filters.brand = 'all';
  spkStore.calculateRecommendations();
}

function formatIDR(val) {
  if (!val) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val);
}

onMounted(async () => {
  if (spkStore.profiles.length === 0) {
    await spkStore.fetchProfiles();
  }
  await spkStore.fetchBrands();
  spkStore.calculateRecommendations();
});
</script>
