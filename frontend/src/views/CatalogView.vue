<template>
  <main class="flex-grow max-w-[1380px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 font-sans">
    <!-- Breadcrumb & Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4 mb-6 sm:mb-8">
      <div>
        <div class="flex items-center gap-2 text-xs text-slate-500 font-mono mb-1">
          <router-link to="/" class="hover:text-blue-600">Beranda</router-link>
          <span>/</span>
          <span class="text-slate-900 font-medium">Katalog Laptop</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">Katalog Lengkap Laptop</h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">Jelajahi seluruh varian laptop spesifikasi resmi bergaransi Indonesia dengan penilaian kesesuaian.</p>
      </div>

      <!-- Quick Action: Ke Rekomendasi Pintar -->
      <router-link to="/" class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition-all self-start sm:self-auto">
        <span class="material-symbols-outlined text-[18px]">tune</span>
        <span>Bingung Memilih? Gunakan Rekomendasi Pintar</span>
      </router-link>
    </div>

    <!-- 2-Column Grid: Left Filters & Right Products -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
      <!-- Mobile Filter Toggle Button -->
      <div class="lg:hidden col-span-1">
        <button
          type="button"
          @click="showMobileFilter = !showMobileFilter"
          class="w-full py-3 px-4 bg-white border border-slate-300 rounded-xl font-bold text-xs flex items-center justify-between text-slate-800 shadow-xs cursor-pointer hover:border-blue-500 transition-colors"
        >
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[18px] text-blue-600">tune</span>
            <span>Filter & Pencarian Spesifikasi</span>
            <span v-if="activeFilterCount > 0" class="px-2 py-0.5 rounded-full bg-blue-600 text-white font-mono text-[10px] font-bold">
              {{ activeFilterCount }} Aktif
            </span>
          </div>
          <span class="material-symbols-outlined text-[20px] text-slate-500 transition-transform duration-200" :class="{ 'rotate-180': showMobileFilter }">
            expand_more
          </span>
        </button>
      </div>

      <!-- LEFT FILTER PANEL -->
      <aside
        class="lg:col-span-1 space-y-6 transition-all duration-200"
        :class="showMobileFilter ? 'block' : 'hidden lg:block'"
      >
        <!-- Search Input -->
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs uppercase font-bold tracking-wider text-slate-700 font-mono">Pencarian</span>
            <button @click="resetFilters" class="text-xs text-blue-600 font-semibold hover:underline cursor-pointer">Reset</button>
          </div>
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-2.5 text-slate-500" style="font-size: 18px;">search</span>
            <input
              type="text"
              v-model="searchQuery"
              @input="debounceFetch"
              placeholder="Cari nama laptop / seri..."
              class="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 font-medium text-slate-900 placeholder:text-slate-500"
            />
          </div>
        </div>

        <!-- Filter Brand -->
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs uppercase font-bold tracking-wider text-slate-700 font-mono block">Brand Laptop</span>
            <span v-if="selectedBrand !== 'all'" @click="selectedBrand = 'all'; fetchLaptops()" class="text-xs text-blue-600 font-semibold hover:underline cursor-pointer">Semua</span>
          </div>
          <div class="space-y-2 text-sm text-slate-800 max-h-60 overflow-y-auto pr-1">
            <label class="flex items-center gap-2.5 cursor-pointer py-1 px-1.5 rounded hover:bg-slate-50 transition-colors" :class="selectedBrand === 'all' ? 'font-bold text-blue-600 bg-blue-50/50' : 'font-medium'">
              <input
                type="radio"
                name="brandRadio"
                value="all"
                v-model="selectedBrand"
                @change="fetchLaptops"
                class="text-blue-600 focus:ring-blue-500"
              />
              <span>Semua Brand</span>
            </label>

            <label
              v-for="b in brands"
              :key="b"
              class="flex items-center gap-2.5 cursor-pointer py-1 px-1.5 rounded hover:bg-slate-50 transition-colors"
              :class="selectedBrand === b ? 'font-bold text-blue-600 bg-blue-50/50' : 'font-medium'"
            >
              <input
                type="radio"
                name="brandRadio"
                :value="b"
                v-model="selectedBrand"
                @change="fetchLaptops"
                class="text-blue-600 focus:ring-blue-500"
              />
              <span>{{ b }}</span>
            </label>
          </div>
        </div>

        <!-- Filter RAM -->
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <span class="text-xs uppercase font-bold tracking-wider text-slate-700 font-mono block">Kapasitas RAM</span>
          <div class="grid grid-cols-2 gap-2 text-xs sm:text-sm font-mono">
            <button
              type="button"
              @click="toggleRam('')"
              class="py-2 px-3 rounded-lg border text-center transition-all cursor-pointer"
              :class="!selectedRam ? 'border-2 border-blue-600 bg-blue-50 text-blue-700 font-bold' : 'border-slate-300 hover:border-blue-600 font-semibold text-slate-700'"
            >
              Semua
            </button>
            <button
              type="button"
              @click="toggleRam('8')"
              class="py-2 px-3 rounded-lg border text-center transition-all cursor-pointer"
              :class="selectedRam === '8' ? 'border-2 border-blue-600 bg-blue-50 text-blue-700 font-bold' : 'border-slate-300 hover:border-blue-600 font-semibold text-slate-700'"
            >
              ≥ 8 GB
            </button>
            <button
              type="button"
              @click="toggleRam('16')"
              class="py-2 px-3 rounded-lg border text-center transition-all cursor-pointer"
              :class="selectedRam === '16' ? 'border-2 border-blue-600 bg-blue-50 text-blue-700 font-bold' : 'border-slate-300 hover:border-blue-600 font-semibold text-slate-700'"
            >
              ≥ 16 GB
            </button>
            <button
              type="button"
              @click="toggleRam('32')"
              class="py-2 px-3 rounded-lg border text-center transition-all cursor-pointer"
              :class="selectedRam === '32' ? 'border-2 border-blue-600 bg-blue-50 text-blue-700 font-bold' : 'border-slate-300 hover:border-blue-600 font-semibold text-slate-700'"
            >
              ≥ 32 GB
            </button>
          </div>
        </div>

        <!-- Filter Rentang Budget -->
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs uppercase font-bold tracking-wider text-slate-700 font-mono block">Rentang Budget</span>
            <button v-if="maxPrice < 40" @click="maxPrice = 40; fetchLaptops()" class="text-xs text-blue-600 font-semibold hover:underline cursor-pointer">Reset</button>
          </div>
          <input
            type="range"
            min="5"
            max="40"
            step="1"
            v-model.number="maxPrice"
            @change="fetchLaptops"
            class="w-full accent-blue-600 cursor-pointer"
          />
          <div class="flex justify-between text-xs sm:text-sm text-slate-700 font-mono font-medium">
            <span>Rp 5 Jt</span>
            <span class="font-extrabold text-blue-700">Maks. Rp {{ maxPrice }} Jt</span>
          </div>
        </div>

        <!-- Filter Stok Tersedia -->
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <label class="flex items-center gap-2.5 cursor-pointer font-semibold text-slate-800 text-sm select-none">
            <input
              type="checkbox"
              v-model="inStockOnly"
              @change="fetchLaptops"
              class="rounded text-blue-600 focus:ring-blue-500 border-slate-300"
            />
            <span>Hanya Stok Tersedia</span>
          </label>
        </div>
      </aside>

      <!-- RIGHT PRODUCT LISTINGS -->
      <section class="lg:col-span-3 space-y-6">
        <!-- Sorting & Per-Page Controls Bar -->
        <div id="catalog-products-heading" class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div class="text-sm font-medium text-slate-700">
            Menampilkan <span class="font-bold text-slate-900">{{ laptops.length ? startIndex + 1 : 0 }} - {{ endIndex }}</span> dari <span class="font-bold text-slate-900">{{ laptops.length }}</span> Laptop Tersedia
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <div class="flex items-center gap-1.5 text-xs">
              <span class="font-bold text-slate-600">Per Hal:</span>
              <select
                v-model.number="perPage"
                @change="currentPage = 1"
                class="py-1.5 px-2 rounded-lg border border-slate-300 bg-white font-semibold text-slate-800 outline-none cursor-pointer text-xs"
              >
                <option :value="9">9 Item</option>
                <option :value="12">12 Item</option>
                <option :value="18">18 Item</option>
                <option :value="24">24 Item</option>
              </select>
            </div>

            <div class="flex items-center gap-1.5 text-xs">
              <span class="font-bold text-slate-700">Urutkan:</span>
              <select
                v-model="sortBy"
                @change="handleSortChange"
                class="text-xs sm:text-sm py-1.5 pl-2.5 pr-7 rounded-lg border border-slate-300 bg-white font-semibold text-slate-800 focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
              >
                <option value="default">Terbaru</option>
                <option value="bestseller">🔥 Paling Laris (Terpopuler)</option>
                <option value="price_asc">Harga: Termurah ke Termahal</option>
                <option value="price_desc">Harga: Termahal ke Termurah</option>
                <option value="ram_desc">Spesifikasi RAM Terbesar</option>
                <option value="name_asc">Nama Seri A - Z</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="py-20 text-center">
          <div class="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p class="text-sm font-semibold text-slate-600">Memuat katalog laptop...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="laptops.length === 0" class="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
          <span class="material-symbols-outlined text-slate-400 text-[48px] mb-2">search_off</span>
          <h3 class="text-base font-bold text-slate-800">Tidak ada produk ditemukan</h3>
          <p class="text-xs text-slate-500 mt-1 mb-4">Silakan atur kembali kata kunci atau opsi filter Anda.</p>
          <button
            @click="resetFilters"
            class="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-all cursor-pointer"
          >
            Reset Filter
          </button>
        </div>

        <!-- Laptop Cards Grid with Pagination -->
        <div v-else class="space-y-8">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <LaptopCard
              v-for="laptop in paginatedLaptops"
              :key="laptop.id"
              :laptop="laptop"
            />
          </div>

          <!-- Bottom Pagination Controls -->
          <div
            v-if="totalPages > 1"
            class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div class="text-xs font-medium text-slate-500 font-mono">
              Halaman <strong class="text-slate-800">{{ currentPage }}</strong> dari <strong class="text-slate-800">{{ totalPages }}</strong> (Total {{ laptops.length }} Laptop)
            </div>

            <div class="flex items-center gap-1.5 flex-wrap justify-center">
              <button
                @click="prevPage"
                :disabled="currentPage <= 1"
                class="px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-slate-700 transition-all flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <span class="material-symbols-outlined text-[16px]">chevron_left</span>
                <span>Sebelumnya</span>
              </button>

              <div class="flex items-center gap-1">
                <template v-for="(p, idx) in visiblePages" :key="idx">
                  <span v-if="p === '...'" class="w-7 text-center text-xs text-slate-400 font-bold select-none">...</span>
                  <button
                    v-else
                    @click="goToPage(p)"
                    class="w-8 h-8 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shadow-xs"
                    :class="currentPage === p ? 'bg-blue-600 text-white ring-2 ring-blue-600/20' : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700'"
                  >
                    {{ p }}
                  </button>
                </template>
              </div>

              <button
                @click="nextPage"
                :disabled="currentPage >= totalPages"
                class="px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-slate-700 transition-all flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <span>Selanjutnya</span>
                <span class="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Floating Back to Top Button -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4 scale-90"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-4 scale-90"
    >
      <button
        v-if="showBackToTop"
        @click="scrollToTop"
        type="button"
        class="fixed bottom-20 sm:bottom-24 right-6 z-40 p-3 sm:px-4 sm:py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-1.5 cursor-pointer group"
        title="Kembali ke atas halaman"
        aria-label="Kembali ke atas"
      >
        <span class="material-symbols-outlined text-[20px] sm:text-[22px] group-hover:-translate-y-0.5 transition-transform duration-200">
          arrow_upward
        </span>
        <span class="text-xs font-bold hidden sm:inline-block">
          Ke Atas
        </span>
      </button>
    </transition>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import LaptopCard from '../components/LaptopCard.vue';

const laptops = ref([]);
const brands = ref([]);
const loading = ref(false);

const searchQuery = ref('');
const selectedBrand = ref('all');
const selectedRam = ref('');
const maxPrice = ref(40);
const inStockOnly = ref(false);
const sortBy = ref('default');
const showMobileFilter = ref(false);

const activeFilterCount = computed(() => {
  let count = 0;
  if (searchQuery.value && searchQuery.value.trim() !== '') count++;
  if (selectedBrand.value && selectedBrand.value !== 'all') count++;
  if (selectedRam.value && selectedRam.value !== '') count++;
  if (Number(maxPrice.value) < 40) count++;
  if (inStockOnly.value) count++;
  return count;
});

// Pagination State
const currentPage = ref(1);
const perPage = ref(12);

const totalPages = computed(() => {
  return Math.ceil(laptops.value.length / perPage.value) || 1;
});

const startIndex = computed(() => {
  return (currentPage.value - 1) * perPage.value;
});

const endIndex = computed(() => {
  return Math.min(startIndex.value + perPage.value, laptops.value.length);
});

const paginatedLaptops = computed(() => {
  return laptops.value.slice(startIndex.value, endIndex.value);
});

// Smart page window (e.g., 1, 2, 3, ..., 9)
const visiblePages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages = [];
  pages.push(1);
  if (current > 3) {
    pages.push('...');
  }
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  if (current < total - 2) {
    pages.push('...');
  }
  pages.push(total);
  return pages;
});

function goToPage(page) {
  if (page === '...' || page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  scrollToProductTop();
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    scrollToProductTop();
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    scrollToProductTop();
  }
}

function scrollToProductTop() {
  const el = document.getElementById('catalog-products-heading');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function handleSortChange() {
  currentPage.value = 1;
  fetchLaptops();
}

let fetchTimer = null;
function debounceFetch() {
  clearTimeout(fetchTimer);
  fetchTimer = setTimeout(() => {
    currentPage.value = 1;
    fetchLaptops();
  }, 300);
}

function toggleRam(ram) {
  selectedRam.value = selectedRam.value === ram ? '' : ram;
  currentPage.value = 1;
  fetchLaptops();
}

async function fetchLaptops() {
  loading.value = true;
  try {
    const params = {};
    if (searchQuery.value) params.search = searchQuery.value;
    if (selectedBrand.value && selectedBrand.value !== 'all') params.brand = selectedBrand.value;
    if (selectedRam.value) params.min_ram = selectedRam.value;
    if (maxPrice.value && maxPrice.value < 40) params.max_price = maxPrice.value * 1000000;
    if (inStockOnly.value) params.in_stock = 'true';
    if (sortBy.value !== 'default') params.sort = sortBy.value;

    const res = await axios.get('/api/laptops', { params });
    if (res.data.success) {
      laptops.value = res.data.data;
      if (res.data.brands && brands.value.length === 0) {
        brands.value = res.data.brands;
      }
      if (currentPage.value > totalPages.value) {
        currentPage.value = 1;
      }
    }
  } catch (err) {
    console.error('Error fetching laptops:', err);
  } finally {
    loading.value = false;
  }
}

function resetFilters() {
  searchQuery.value = '';
  selectedBrand.value = 'all';
  selectedRam.value = '';
  maxPrice.value = 40;
  inStockOnly.value = false;
  sortBy.value = 'default';
  currentPage.value = 1;
  fetchLaptops();
}

// Floating Back to Top State & Handlers
const showBackToTop = ref(false);

function handleScroll() {
  showBackToTop.value = window.scrollY > 300;
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

onMounted(() => {
  fetchLaptops();
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
