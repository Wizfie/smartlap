<template>
  <div class="py-6 sm:py-10 max-w-4xl mx-auto px-4 sm:px-6 font-sans">
    <!-- Header Page -->
    <div class="text-center max-w-xl mx-auto mb-6 sm:mb-8">
      <div
        class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3"
      >
        <span class="material-symbols-outlined text-[15px]">local_shipping</span>
        <span>Pelacakan Pesanan Real-Time</span>
      </div>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
        Cek Status Pesanan Anda
      </h1>
      <p class="text-xs sm:text-sm text-slate-500 mt-2">
        Masukkan nomor faktur atau nomor pesanan SmartLap untuk memantau status pembayaran dan proses pengiriman unit laptop Anda.
      </p>
    </div>

    <!-- Search Box Card -->
    <div class="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm mb-6 sm:mb-8">
      <form @submit.prevent="searchOrder" class="flex flex-col sm:flex-row gap-3">
        <div class="relative flex-1">
          <span
            class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            style="font-size: 20px"
          >
            receipt_long
          </span>
          <input
            type="text"
            v-model="inputOrderNumber"
            placeholder="Contoh: SL-20260929-1234"
            class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-bold text-slate-900 placeholder:font-sans placeholder:font-normal placeholder:text-slate-400 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all uppercase"
          />
        </div>
        <button
          type="submit"
          :disabled="loading || !inputOrderNumber.trim()"
          class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span
            v-if="loading"
            class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
          ></span>
          <span v-else class="material-symbols-outlined text-[18px]">search</span>
          <span>Lacak Pesanan</span>
        </button>
      </form>

      <!-- Recent Orders on This Device -->
      <div v-if="recentOrders.length > 0 && !order" class="mt-4 pt-4 border-t border-slate-100">
        <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
          Pesanan Terakhir di Perangkat Ini:
        </span>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="rec in recentOrders"
            :key="rec.order_number"
            @click="quickSelectOrder(rec.order_number)"
            type="button"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 border border-slate-200 rounded-lg text-xs font-mono font-semibold text-slate-700 hover:text-blue-700 transition-colors cursor-pointer"
          >
            <span class="material-symbols-outlined text-slate-400" style="font-size: 14px">history</span>
            <span>{{ rec.order_number }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-if="searched && !loading && !order"
      class="bg-white rounded-2xl border border-rose-200 p-6 sm:p-8 text-center shadow-sm"
    >
      <div class="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto mb-3 text-rose-500">
        <span class="material-symbols-outlined text-[28px]">search_off</span>
      </div>
      <h3 class="text-base font-bold text-slate-900">Pesanan Tidak Ditemukan</h3>
      <p class="text-xs text-slate-500 mt-1 max-w-md mx-auto">
        Nomor pesanan <span class="font-mono font-bold text-slate-700">"{{ searchedQuery }}"</span> tidak ditemukan di database. Pastikan nomor faktur lengkap sesuai bukti pemesanan Anda.
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="py-16 text-center">
      <div class="w-9 h-9 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
      <p class="text-xs font-semibold text-slate-500 font-mono">Mencari data pesanan...</p>
    </div>

    <!-- Order Detail Result -->
    <div v-if="order && !loading" class="space-y-6">
      
      <!-- Top Card: Summary & Status -->
      <div class="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">No. Pesanan:</span>
              <span class="font-mono font-extrabold text-blue-600 text-sm sm:text-base">{{ order.order_number }}</span>
            </div>
            <p class="text-xs text-slate-500">
              Dipesan pada <span class="font-medium text-slate-700">{{ formatDate(order.created_at) }}</span>
            </p>
          </div>

          <!-- Status Badge -->
          <div class="flex items-center gap-2">
            <span
              v-if="order.payment_status === 'paid'"
              class="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 shadow-xs"
            >
              <span class="material-symbols-outlined text-[16px]">verified</span>
              <span>LUNAS (PAID)</span>
            </span>
            <span
              v-else
              class="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5 shadow-xs"
            >
              <span class="material-symbols-outlined text-[16px]">schedule</span>
              <span>MENUNGGU PEMBAYARAN</span>
            </span>
          </div>
        </div>

        <!-- Visual Stepper Progress Tracker -->
        <div class="pt-6">
          <div class="relative flex items-center justify-between">
            <div class="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-100 w-full z-0"></div>
            <div
              class="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 transition-all duration-500 z-0"
              :style="{ width: order.payment_status === 'paid' ? '75%' : '25%' }"
            ></div>

            <!-- Step 1: Pesanan Dibuat -->
            <div class="relative z-10 flex flex-col items-center">
              <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm">
                <span class="material-symbols-outlined text-[14px] sm:text-[16px]">check</span>
              </div>
              <span class="text-[10px] sm:text-[11px] font-bold text-slate-800 mt-1.5 text-center">Pesanan Masuk</span>
            </div>

            <!-- Step 2: Pembayaran -->
            <div class="relative z-10 flex flex-col items-center">
              <div
                class="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-sm transition-colors"
                :class="order.payment_status === 'paid' ? 'bg-blue-600 text-white' : 'bg-amber-500 text-white ring-4 ring-amber-100'"
              >
                <span class="material-symbols-outlined text-[14px] sm:text-[16px]">
                  {{ order.payment_status === 'paid' ? 'check' : 'pending' }}
                </span>
              </div>
              <span
                class="text-[10px] sm:text-[11px] font-bold mt-1.5 text-center"
                :class="order.payment_status === 'paid' ? 'text-slate-800' : 'text-amber-700'"
              >
                {{ order.payment_status === 'paid' ? 'Terbayar' : 'Menunggu' }}
              </span>
            </div>

            <!-- Step 3: Gudang & Packing -->
            <div class="relative z-10 flex flex-col items-center">
              <div
                class="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-sm transition-colors"
                :class="order.payment_status === 'paid' ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 'bg-slate-200 text-slate-400'"
              >
                <span class="material-symbols-outlined text-[14px] sm:text-[16px]">inventory_2</span>
              </div>
              <span class="text-[10px] sm:text-[11px] font-bold mt-1.5 text-center" :class="order.payment_status === 'paid' ? 'text-blue-700' : 'text-slate-400'">
                Dikemas
              </span>
            </div>

            <!-- Step 4: Selesai / Kirim -->
            <div class="relative z-10 flex flex-col items-center">
              <div
                class="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-sm bg-slate-200 text-slate-400"
              >
                <span class="material-symbols-outlined text-[14px] sm:text-[16px]">local_shipping</span>
              </div>
              <span class="text-[10px] sm:text-[11px] font-bold text-slate-400 mt-1.5 text-center">Dikirim</span>
            </div>
          </div>
        </div>

        <!-- Pending Payment Action Box -->
        <div
          v-if="order.payment_status !== 'paid' && order.payment"
          class="mt-6 p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <div class="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-1">
              <span class="material-symbols-outlined text-[16px]">notifications_active</span>
              <span>Selesaikan Pembayaran {{ order.payment.bank_name }}</span>
            </div>
            <p class="text-xs text-amber-800">
              Kode Bayar: <span class="font-mono font-extrabold text-sm text-slate-900 bg-white px-2 py-0.5 rounded border border-amber-300 ml-1 select-all">{{ order.payment.pay_code }}</span>
            </p>
          </div>

          <div class="flex items-center gap-2">
            <button
              @click="copyPayCode(order.payment.pay_code)"
              type="button"
              class="px-3 py-2 bg-white border border-amber-300 hover:bg-amber-100 text-amber-900 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span class="material-symbols-outlined text-[15px]">{{ copied ? 'check' : 'content_copy' }}</span>
              <span>{{ copied ? 'Disalin!' : 'Salin Kode' }}</span>
            </button>
            <button
              @click="simulatePaymentNow"
              :disabled="simulating"
              type="button"
              class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <span v-if="simulating" class="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span v-else class="material-symbols-outlined text-[15px]">credit_score</span>
              <span>Simulasi Bayar Sekarang</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Order Details Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- Left Column: Products List (2 cols) -->
        <div class="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm space-y-4">
          <h3 class="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <span class="material-symbols-outlined text-blue-600 text-[18px]">shopping_bag</span>
            <span>Rincian Laptop yang Dipesan</span>
          </h3>

          <div class="divide-y divide-slate-100">
            <div
              v-for="item in order.items"
              :key="item.id"
              class="py-3.5 flex items-center gap-3.5"
            >
              <div class="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                <img
                  v-if="item.image_url"
                  :src="item.image_url"
                  :alt="item.model"
                  class="w-full h-full object-contain"
                />
                <span v-else class="material-symbols-outlined text-slate-300 text-[24px]">laptop</span>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="font-bold text-xs text-slate-900 truncate">
                  {{ item.brand }} {{ item.model }}
                </h4>
                <p v-if="item.sku" class="text-[11px] font-mono text-slate-400">
                  SKU: {{ item.sku }}
                </p>
                <div class="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <span>{{ item.quantity }} unit x {{ formatIDR(item.unit_price) }}</span>
                </div>
              </div>
              <div class="text-right font-mono font-bold text-xs text-slate-900 shrink-0">
                {{ formatIDR(item.subtotal) }}
              </div>
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
            <span class="font-bold text-slate-500">Total Pembayaran</span>
            <span class="font-mono font-extrabold text-blue-600 text-base">{{ formatIDR(order.total_amount) }}</span>
          </div>
        </div>

        <!-- Right Column: Shipping & Action (1 col) -->
        <div class="space-y-4">
          <div class="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3 text-xs">
            <h3 class="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-100">
              <span class="material-symbols-outlined text-slate-400 text-[16px]">person_pin_circle</span>
              <span>Alamat Pengiriman</span>
            </h3>

            <div>
              <p class="font-bold text-slate-800">{{ order.customer_name }}</p>
              <p class="text-slate-500 font-mono mt-0.5">{{ order.customer_phone }}</p>
              <p class="text-slate-500 mt-0.5">{{ order.customer_email }}</p>
              <p class="text-slate-600 mt-2 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                {{ order.shipping_address }}
              </p>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
            <router-link
              :to="`/pesanan/${order.order_number}`"
              class="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <span class="material-symbols-outlined text-[16px]">receipt</span>
              <span>Buka Faktur Digital Resmi</span>
            </router-link>

            <button
              @click="resetSearch"
              type="button"
              class="w-full py-2 px-3 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span class="material-symbols-outlined text-[16px]">restart_alt</span>
              <span>Cari Pesanan Lain</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

const inputOrderNumber = ref('');
const searchedQuery = ref('');
const searched = ref(false);
const loading = ref(false);
const order = ref(null);
const simulating = ref(false);
const copied = ref(false);
const recentOrders = ref([]);

function formatIDR(val) {
  if (!val) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val);
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleString('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
}

function loadRecentOrders() {
  try {
    const raw = localStorage.getItem('smartlap_recent_orders');
    if (raw) {
      recentOrders.value = JSON.parse(raw);
    }
  } catch (e) {
    recentOrders.value = [];
  }
}

async function fetchOrderDetails(orderNum) {
  const cleanNum = (orderNum || '').trim().toUpperCase();
  if (!cleanNum) return;

  loading.value = true;
  searched.value = true;
  searchedQuery.value = cleanNum;
  order.value = null;

  try {
    const res = await axios.get(`/api/orders/${cleanNum}`);
    if (res.data.success) {
      order.value = res.data.data;
      // Sync to recent orders
      saveToRecentOrders(res.data.data);
    }
  } catch (err) {
    console.error('Error fetching order details:', err);
    order.value = null;
  } finally {
    loading.value = false;
  }
}

function saveToRecentOrders(ord) {
  try {
    const existing = JSON.parse(localStorage.getItem('smartlap_recent_orders') || '[]');
    const updated = [
      {
        order_number: ord.order_number,
        customer_name: ord.customer_name,
        total_amount: ord.total_amount,
        created_at: ord.created_at
      },
      ...existing.filter(o => o.order_number !== ord.order_number)
    ].slice(0, 8);
    localStorage.setItem('smartlap_recent_orders', JSON.stringify(updated));
    recentOrders.value = updated;
  } catch (e) {
    console.error(e);
  }
}

function searchOrder() {
  if (!inputOrderNumber.value.trim()) return;
  router.replace({ query: { q: inputOrderNumber.value.trim().toUpperCase() } });
  fetchOrderDetails(inputOrderNumber.value);
}

function quickSelectOrder(orderNum) {
  inputOrderNumber.value = orderNum;
  searchOrder();
}

function resetSearch() {
  order.value = null;
  searched.value = false;
  inputOrderNumber.value = '';
  router.replace({ query: {} });
}

function copyPayCode(code) {
  if (!code) return;
  navigator.clipboard.writeText(code);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}

async function simulatePaymentNow() {
  if (!order.value) return;
  simulating.value = true;
  try {
    const res = await axios.post(`/api/orders/${order.value.order_number}/simulate-pay`);
    if (res.data.success) {
      alert('Simulasi pembayaran berhasil! Status pesanan Anda kini LUNAS.');
      await fetchOrderDetails(order.value.order_number);
    }
  } catch (err) {
    alert(err.response?.data?.message || 'Gagal memproses simulasi pembayaran');
  } finally {
    simulating.value = false;
  }
}

onMounted(() => {
  loadRecentOrders();
  if (route.query.q) {
    inputOrderNumber.value = route.query.q;
    fetchOrderDetails(route.query.q);
  }
});
</script>
