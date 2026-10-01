<template>
  <div class="py-8 sm:py-12 print:py-0 print:m-0 bg-slate-100/60 print:bg-white min-h-screen">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 print:max-w-full print:px-0 print:mx-0">
      
      <!-- Loading State -->
      <div v-if="loading" class="py-20 text-center">
        <div class="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p class="text-sm font-semibold text-slate-600">Memuat faktur pesanan...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="!order" class="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm">
        <span class="material-symbols-outlined text-slate-400 text-[48px] mb-2">receipt_long</span>
        <h2 class="text-lg font-bold text-slate-800">Faktur Tidak Ditemukan</h2>
        <p class="text-xs text-slate-500 mt-1 mb-6">Nomor pesanan yang Anda tuju tidak terdaftar di sistem kami.</p>
        <router-link to="/" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all">
          Kembali ke Beranda
        </router-link>
      </div>

      <!-- Invoice Receipt Paper -->
      <div
        v-else
        class="bg-white rounded-3xl border border-slate-200 p-4 sm:p-10 shadow-md space-y-6 sm:space-y-7 print:border-none print:shadow-none print:p-0 print:space-y-5 print:rounded-none"
      >
        
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b-2 border-slate-200">
          <div class="flex items-center gap-3.5">
            <div class="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shrink-0">
              <span class="material-symbols-outlined text-[26px]">laptop_mac</span>
            </div>
            <div>
              <span class="text-xl font-black text-slate-900 tracking-tight block">SmartLap Official Store</span>
              <span class="text-xs text-slate-500 font-medium block">Faktur Penjualan Digital Resmi</span>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <span
              v-if="order.payment_status === 'paid'"
              class="px-4 py-1.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 shadow-xs"
            >
              <span class="material-symbols-outlined text-[16px]">verified</span>
              <span>LUNAS / PAID</span>
            </span>
            <span
              v-else-if="order.payment_status === 'cancelled'"
              class="px-4 py-1.5 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1.5"
            >
              <span class="material-symbols-outlined text-[16px]">cancel</span>
              <span>DIBATALKAN</span>
            </span>
            <span
              v-else
              class="px-4 py-1.5 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5"
            >
              <span class="material-symbols-outlined text-[16px]">schedule</span>
              <span>MENUNGGU PEMBAYARAN</span>
            </span>
          </div>
        </div>

        <!-- Meta Info (2 Columns) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/80 print:bg-transparent print:border-slate-300 print:p-3">
          <div>
            <span class="font-bold text-slate-500 uppercase tracking-wider block mb-1 font-mono text-[10px]">
              Tujuan Penerima & Pengiriman
            </span>
            <h4 class="font-black text-slate-900 text-sm sm:text-base">{{ order.customer_name }}</h4>
            <p class="text-slate-700 font-medium mt-0.5">{{ order.customer_phone }} • {{ order.customer_email }}</p>
            <p class="text-slate-600 mt-1.5 leading-relaxed">{{ order.shipping_address }}</p>
          </div>

          <div class="sm:text-right space-y-1.5">
            <span class="font-bold text-slate-500 uppercase tracking-wider block mb-1 font-mono text-[10px]">
              Detail Informasi Transaksi
            </span>
            <div>
              <span class="text-slate-500">Nomor Faktur:</span>
              <span class="font-mono font-black text-slate-900 ml-1.5 text-sm">{{ order.order_number }}</span>
            </div>
            <div>
              <span class="text-slate-500">Tanggal Order:</span>
              <span class="font-medium text-slate-800 ml-1.5">{{ formatDate(order.created_at) }}</span>
            </div>
            <div>
              <span class="text-slate-500">Metode Bayar:</span>
              <span class="font-bold text-slate-800 uppercase ml-1.5">{{ order.payment?.bank_name || order.payment_method }}</span>
            </div>
            <div v-if="order.paid_at">
              <span class="text-slate-500">Waktu Pelunasan:</span>
              <span class="font-bold text-emerald-700 ml-1.5">{{ formatDate(order.paid_at) }}</span>
            </div>
          </div>
        </div>

        <!-- Items Table (Crisp & Clean for 1 or Many Items) -->
        <div>
          <div class="flex items-center justify-between mb-2.5">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-600 font-mono flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px] text-blue-600">inventory_2</span>
              <span>Rincian Barang Dipesan ({{ order.items?.length || 0 }} Item • {{ totalUnits }} Unit)</span>
            </span>
          </div>

          <div class="overflow-x-auto print:overflow-visible rounded-xl border border-slate-200">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-slate-100/80 border-b border-slate-200 text-slate-700 uppercase tracking-wider font-mono text-[11px]">
                  <th class="py-2.5 px-3 font-bold w-12 text-center">No.</th>
                  <th class="py-2.5 px-3 font-bold">Produk Laptop & Spesifikasi</th>
                  <th class="py-2.5 px-3 text-center font-bold w-20">Jumlah</th>
                  <th class="py-2.5 px-3 text-right font-bold w-36">Harga Satuan</th>
                  <th class="py-2.5 px-3 text-right font-bold w-36">Subtotal</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200/80">
                <tr
                  v-for="(item, idx) in order.items"
                  :key="item.id || idx"
                  class="break-inside-avoid print:break-inside-avoid transition-colors"
                  :class="idx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'"
                >
                  <td class="py-3 px-3 text-center font-mono font-bold text-slate-500 text-[11px] align-top">
                    {{ idx + 1 }}
                  </td>
                  <td class="py-3 px-3 align-top">
                    <div class="font-extrabold text-slate-900 text-sm leading-snug">
                      {{ item.brand }} {{ item.model }}
                    </div>
                    <div class="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5 text-[11px] text-slate-500 font-mono">
                      <span v-if="item.sku" class="font-semibold text-slate-600">SKU: {{ item.sku }}</span>
                      <span v-if="item.screen_desc">• {{ item.screen_desc }}</span>
                    </div>
                  </td>
                  <td class="py-3 px-3 text-center font-bold font-mono text-slate-900 align-top">
                    {{ item.quantity }}
                  </td>
                  <td class="py-3 px-3 text-right font-medium font-mono text-slate-700 align-top">
                    {{ formatIDR(item.unit_price) }}
                  </td>
                  <td class="py-3 px-3 text-right font-bold font-mono text-slate-900 align-top">
                    {{ formatIDR(item.subtotal) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Totals & Payment Summary Box -->
        <div class="border-t-2 border-slate-200 pt-4 flex flex-col sm:flex-row justify-between items-start gap-6 break-inside-avoid print:break-inside-avoid">
          <!-- Left: Official Legal Note -->
          <div class="text-xs text-slate-500 max-w-sm space-y-1.5">
            <div class="flex items-center gap-1 text-slate-800 font-bold">
              <span class="material-symbols-outlined text-[16px] text-emerald-600">verified</span>
              <span>Dokumen Bukti Transaksi Resmi</span>
            </div>
            <p class="leading-relaxed text-[11px] text-slate-600">
              Faktur ini diterbitkan secara otomatis dan terverifikasi oleh server SmartLap. Dokumen ini sah sebagai tanda terima pembelian tanpa tanda tangan basah.
            </p>
            <p class="text-[10px] font-mono text-slate-400">
              Dicetak pada: {{ currentPrintDate }}
            </p>
          </div>

          <!-- Right: Numeric Totals Box -->
          <div class="w-full sm:w-80 space-y-2 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200 print:bg-transparent print:border-none print:p-0">
            <div class="flex justify-between text-slate-600 font-medium">
              <span>Subtotal Produk ({{ totalUnits }} Unit):</span>
              <span class="font-mono font-bold text-slate-900">{{ formatIDR(order.total_amount) }}</span>
            </div>
            <div class="flex justify-between text-slate-600 font-medium">
              <span>Ongkos Kirim & Asuransi:</span>
              <span class="font-mono font-bold text-emerald-600">Rp 0 (Gratis)</span>
            </div>
            <div class="flex justify-between text-slate-600 font-medium">
              <span>Biaya Layanan Sistem:</span>
              <span class="font-mono font-bold text-emerald-600">Rp 0</span>
            </div>
            <div class="flex justify-between pt-2.5 border-t border-slate-200 text-sm font-bold text-slate-900">
              <span>Total Tagihan:</span>
              <span class="font-mono text-xl font-black text-blue-600">{{ formatIDR(order.total_amount) }}</span>
            </div>
          </div>
        </div>

        <!-- Print & Navigation Actions (Hidden on Print) -->
        <div class="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
          <router-link
            to="/katalog"
            class="text-xs font-bold text-slate-600 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
          >
            <span class="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Kembali ke Katalog</span>
          </router-link>

          <div class="flex items-center gap-3">
            <router-link
              :to="`/cek-pesanan`"
              class="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <span class="material-symbols-outlined text-[16px]">search</span>
              <span>Lacak Pesanan</span>
            </router-link>

            <button
              @click="printInvoice"
              type="button"
              class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
            >
              <span class="material-symbols-outlined text-[18px]">print</span>
              <span>Cetak / Simpan PDF</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const order = ref(null);
const loading = ref(true);

const totalUnits = computed(() => {
  if (!order.value || !order.value.items) return 0;
  return order.value.items.reduce((sum, item) => sum + (parseInt(item.quantity, 10) || 1), 0);
});

const currentPrintDate = computed(() => {
  const d = new Date();
  return d.toLocaleString('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
});

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

function printInvoice() {
  window.print();
}

async function fetchOrder() {
  loading.value = true;
  try {
    const res = await axios.get(`/api/orders/${route.params.orderNumber}`);
    if (res.data.success) {
      order.value = res.data.data;
    }
  } catch (err) {
    console.error('Error fetching order invoice:', err);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchOrder();
});
</script>
