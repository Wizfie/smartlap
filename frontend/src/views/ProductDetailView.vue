<template>
  <div class="py-4 sm:py-8 font-sans">
    <div class="max-w-[1380px] w-full mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
      
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-xs font-mono text-slate-500 overflow-x-auto no-scrollbar py-1">
        <router-link to="/" class="hover:text-blue-600 transition-colors shrink-0">Beranda</router-link>
        <span class="shrink-0">/</span>
        <router-link to="/katalog" class="hover:text-blue-600 transition-colors shrink-0">Katalog</router-link>
        <span class="shrink-0">/</span>
        <span class="text-slate-900 font-semibold truncate">{{ laptop?.brand }} {{ laptop?.model }}</span>
      </nav>

      <!-- Loading State -->
      <div v-if="loading" class="py-24 text-center bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div class="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p class="text-sm font-semibold text-slate-600">Memuat rincian laptop...</p>
      </div>

      <!-- Not Found -->
      <div v-else-if="!laptop" class="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto shadow-sm">
        <span class="material-symbols-outlined text-slate-400 text-[48px] mb-2">error</span>
        <h3 class="text-base font-bold text-slate-800">Laptop tidak ditemukan</h3>
        <router-link to="/katalog" class="inline-block mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-blue-700 transition-colors">
          Kembali ke Katalog
        </router-link>
      </div>

      <!-- Product Detail Content -->
      <div v-else class="space-y-6 sm:space-y-8">
        
        <!-- Product Showcase (2-Column) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 bg-white p-4 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
          
          <!-- Left Column: Product Image Gallery -->
          <div class="lg:col-span-6 space-y-4">
            <div class="bg-slate-100 rounded-xl p-4 sm:p-8 h-64 sm:h-96 flex items-center justify-center border border-slate-200 relative overflow-hidden group">
              <span class="absolute top-3 left-3 sm:top-4 sm:left-4 bg-blue-600 text-white text-[11px] sm:text-xs font-mono font-bold px-2.5 py-1 sm:px-3 sm:py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <span class="material-symbols-outlined" style="font-size: 14px;">verified</span>
                Produk Resmi & Bergaransi
              </span>
              
              <img
                v-if="laptop.image_url"
                :src="laptop.image_url"
                :alt="laptop.model"
                class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <span v-else class="material-symbols-outlined text-slate-300" style="font-size: 150px;">laptop_mac</span>
            </div>

            <!-- Mini Spec Thumbnails / Feature Icons -->
            <div class="grid grid-cols-4 gap-3">
              <div class="border-2 border-blue-600 rounded-lg p-2.5 bg-blue-50/50 flex flex-col items-center justify-center text-center">
                <span class="material-symbols-outlined text-blue-600 text-[24px]">laptop_mac</span>
                <span class="text-[10px] font-mono font-semibold text-slate-600 mt-1 uppercase">{{ laptop.brand }}</span>
              </div>
              <div class="border border-slate-200 rounded-lg p-2.5 bg-slate-50 flex flex-col items-center justify-center text-center">
                <span class="material-symbols-outlined text-slate-500 text-[24px]">memory</span>
                <span class="text-[10px] font-mono text-slate-600 mt-1 truncate max-w-full">{{ laptop.ram_gb }}GB RAM</span>
              </div>
              <div class="border border-slate-200 rounded-lg p-2.5 bg-slate-50 flex flex-col items-center justify-center text-center">
                <span class="material-symbols-outlined text-slate-500 text-[24px]">hard_drive</span>
                <span class="text-[10px] font-mono text-slate-600 mt-1 truncate max-w-full">SSD</span>
              </div>
              <div class="border border-slate-200 rounded-lg p-2.5 bg-slate-50 flex flex-col items-center justify-center text-center">
                <span class="material-symbols-outlined text-slate-500 text-[24px]">battery_5_bar</span>
                <span class="text-[10px] font-mono text-slate-600 mt-1">{{ laptop.battery_hours }} Jam</span>
              </div>
            </div>
          </div>

          <!-- Right Column: Specs & Purchasing CTAs -->
          <div class="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xs font-mono font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                  Garansi Resmi {{ laptop.brand }} 2 Tahun
                </span>
                <span v-if="laptop.sku" class="text-xs font-mono text-slate-400">SKU: {{ laptop.sku }}</span>
              </div>
              <h1 class="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
                {{ laptop.brand }} {{ laptop.model }}
              </h1>
              <p class="text-sm text-slate-500 mt-2 leading-relaxed">
                {{ laptop.description || 'Laptop resmi berkinerja tinggi dengan spesifikasi seimbang untuk mendukung produktivitas, tugas kuliah, dan kebutuhan komputasi harian Anda secara maksimal.' }}
              </p>

              <!-- Price & Stock -->
              <div class="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-baseline justify-between">
                <div>
                  <span class="text-xs text-slate-400 font-mono block">Harga Resmi Tunai</span>
                  <span class="text-2xl lg:text-3xl font-bold font-mono text-slate-900">
                    {{ formatIDR(laptop.price) }}
                  </span>
                </div>
                <div class="text-right">
                  <span
                    v-if="laptop.stock > 0"
                    class="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-medium bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    Stok Tersedia ({{ laptop.stock }} Unit)
                  </span>
                  <span
                    v-else
                    class="inline-flex items-center gap-1.5 text-xs text-rose-700 font-medium bg-rose-50 px-3 py-1 rounded-full border border-rose-200"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                    Stok Habis
                  </span>
                </div>
              </div>

              <!-- Credit / Installment Simulation Banner -->
              <div class="mt-3 p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <span class="material-symbols-outlined text-[18px]">credit_card</span>
                  </div>
                  <div>
                    <span class="text-slate-800 font-medium block">
                      Cicilan mulai <strong class="text-blue-700 font-extrabold font-mono text-sm">{{ formatIDR(Math.round(laptop.price / 12)) }}</strong> / bulan
                    </span>
                    <span class="text-slate-500 text-[11px] block">Tersedia Cicilan 0% s/d 24 Bulan & Paylater</span>
                  </div>
                </div>
                <button
                  type="button"
                  @click="showCreditModal = true"
                  class="w-full sm:w-auto justify-center px-3.5 py-2.5 sm:py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <span class="material-symbols-outlined text-[16px]">calculate</span>
                  <span>Simulasi Kredit</span>
                </button>
              </div>

              <!-- Quick Spec Highlights -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mt-4 text-xs font-mono">
                <div class="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span class="text-slate-400 block text-[11px]">Prosesor:</span>
                  <span class="font-semibold text-slate-800">{{ laptop.processor_name }}</span>
                </div>
                <div class="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span class="text-slate-400 block text-[11px]">Grafis (GPU):</span>
                  <span class="font-semibold text-slate-800">{{ laptop.gpu_name }}</span>
                </div>
                <div class="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span class="text-slate-400 block text-[11px]">RAM & Storage:</span>
                  <span class="font-semibold text-slate-800">{{ laptop.ram_gb }}GB / {{ laptop.storage_desc }}</span>
                </div>
                <div class="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span class="text-slate-400 block text-[11px]">Bobot & Baterai:</span>
                  <span class="font-semibold text-slate-800">{{ laptop.weight_kg }} kg / {{ laptop.battery_hours }} Jam</span>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="pt-6 border-t border-slate-200 space-y-3">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <router-link
                  to="/katalog"
                  class="inline-flex items-center justify-center gap-2 h-12 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-800 text-sm font-semibold transition-all"
                >
                  <span class="material-symbols-outlined" style="font-size: 18px;">arrow_back</span>
                  <span>Katalog</span>
                </router-link>
                <button
                  @click="addToCart($event)"
                  :disabled="laptop.stock <= 0"
                  class="inline-flex items-center justify-center gap-2 h-12 rounded-lg border text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  :class="isAddedTemporarily ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-blue-600 bg-blue-50 text-blue-700 hover:bg-blue-100'"
                >
                  <span class="material-symbols-outlined" style="font-size: 18px;">{{ isAddedTemporarily ? 'check_circle' : 'add_shopping_cart' }}</span>
                  <span>{{ isAddedTemporarily ? 'Ditambahkan ke Keranjang!' : '+ Keranjang' }}</span>
                </button>
                <button
                  @click="buyNow"
                  :disabled="laptop.stock <= 0"
                  class="inline-flex items-center justify-center gap-2 h-12 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span class="material-symbols-outlined" style="font-size: 18px;">shopping_bag</span>
                  <span>Beli Sekarang</span>
                </button>
              </div>

              <!-- Trust Badges -->
              <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] sm:text-xs text-slate-500 font-mono pt-2">
                <span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-blue-600" style="font-size: 16px;">verified</span> Garansi Resmi 2 Tahun</span>
                <span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-emerald-600" style="font-size: 16px;">local_shipping</span> Gratis Ongkir</span>
                <span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-slate-600" style="font-size: 16px;">lock</span> Pembayaran Aman Sandbox</span>
              </div>
            </div>

          </div>

        </div>

        <!-- Technical Specs Table (Full Detail) -->
        <div class="bg-white p-4 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 class="text-xl font-bold text-slate-900 tracking-tight">Spesifikasi Lengkap Hardware</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm divide-y md:divide-y-0">
            <div class="space-y-4">
              <div class="flex justify-between py-2 border-b border-slate-100">
                <span class="text-slate-500">Prosesor (CPU)</span>
                <span class="font-semibold text-slate-900 font-mono text-right">{{ laptop.processor_name }}</span>
              </div>
              <div class="flex justify-between py-2 border-b border-slate-100">
                <span class="text-slate-500">Kartu Grafis (GPU)</span>
                <span class="font-semibold text-slate-900 font-mono text-right">{{ laptop.gpu_name }}</span>
              </div>
              <div class="flex justify-between py-2 border-b border-slate-100">
                <span class="text-slate-500">Memori (RAM)</span>
                <span class="font-semibold text-slate-900 font-mono text-right">{{ laptop.ram_gb }} GB High-Speed</span>
              </div>
              <div class="flex justify-between py-2 border-b border-slate-100">
                <span class="text-slate-500">Penyimpanan (Storage)</span>
                <span class="font-semibold text-slate-900 font-mono text-right">{{ laptop.storage_desc }}</span>
              </div>
            </div>

            <div class="space-y-4">
              <div class="flex justify-between py-2 border-b border-slate-100">
                <span class="text-slate-500">Layar (Display)</span>
                <span class="font-semibold text-slate-900 font-mono text-right">{{ laptop.screen_desc || '14.0" IPS Anti-Glare' }}</span>
              </div>
              <div class="flex justify-between py-2 border-b border-slate-100">
                <span class="text-slate-500">Kapasitas Baterai</span>
                <span class="font-semibold text-slate-900 font-mono text-right">Daya tahan hingga {{ laptop.battery_hours }} Jam</span>
              </div>
              <div class="flex justify-between py-2 border-b border-slate-100">
                <span class="text-slate-500">Bobot Perangkat</span>
                <span class="font-semibold text-slate-900 font-mono text-right">{{ laptop.weight_kg }} kg</span>
              </div>
              <div class="flex justify-between py-2 border-b border-slate-100">
                <span class="text-slate-500">Ketersediaan Stok</span>
                <span class="font-semibold text-slate-900 font-mono text-right">{{ laptop.stock }} Unit Tersedia</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Credit Simulation Modal -->
      <CreditSimulationModal
        :is-open="showCreditModal"
        :laptop="laptop"
        @close="showCreditModal = false"
      />

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useCartStore } from '../stores/cartStore';
import { useCartAnimation } from '../composables/useCartAnimation';
import CreditSimulationModal from '../components/CreditSimulationModal.vue';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const { triggerFlyToCart } = useCartAnimation();

const laptop = ref(null);
const loading = ref(true);
const isAddedTemporarily = ref(false);
const showCreditModal = ref(false);

function formatIDR(val) {
  if (!val) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val);
}

async function fetchLaptop() {
  loading.value = true;
  try {
    const res = await axios.get(`/api/laptops/${route.params.id}`);
    if (res.data.success) {
      laptop.value = res.data.data;
    }
  } catch (err) {
    console.error('Error fetching laptop detail:', err);
  } finally {
    loading.value = false;
  }
}

function addToCart(event) {
  if (laptop.value) {
    triggerFlyToCart(event, laptop.value);
    isAddedTemporarily.value = true;
    setTimeout(() => {
      isAddedTemporarily.value = false;
    }, 1500);
  }
}

function buyNow() {
  if (laptop.value) {
    cartStore.addItem(laptop.value, 1);
    router.push('/checkout');
  }
}

onMounted(() => {
  fetchLaptop();
});
</script>
