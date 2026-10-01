<template>
  <div
    class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative"
    :class="rank === 1 ? 'border-2 border-blue-600/70 ring-2 ring-blue-600/10' : 'border border-slate-200 hover:border-slate-300'"
  >
    <div>
      <!-- Image Area -->
      <div class="relative bg-slate-100 p-4 h-52 flex items-center justify-center border-b border-slate-200 overflow-hidden">
        <!-- Rank / Match Badge for SPK -->
        <span
          v-if="rank"
          class="absolute top-3 left-3 text-xs font-mono font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm z-10"
          :class="rank === 1 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-white'"
        >
          <span class="material-symbols-outlined" style="font-size: 14px;">verified</span>
          Peringkat {{ rank }} <span v-if="matchPercentage">({{ matchPercentage }}%)</span>
        </span>

        <!-- Terjual Badge (Top Right) -->
        <span
          v-if="laptop.total_sold && laptop.total_sold > 0"
          class="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full z-10 shadow-xs flex items-center gap-1 bg-amber-500 text-white font-mono"
          :title="`Total ${laptop.total_sold} unit berhasil terjual`"
        >
          <span class="material-symbols-outlined text-[13px] leading-none">local_fire_department</span>
          <span>Terjual {{ laptop.total_sold }}</span>
        </span>

        <!-- Stock Badge (Bottom Right) -->
        <span
          class="absolute bottom-2.5 right-2.5 text-xs font-bold px-2.5 py-1 rounded-full z-10 font-mono shadow-xs"
          :class="laptop.stock > 0 ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' : 'bg-rose-50 text-rose-800 border border-rose-300'"
        >
          {{ laptop.stock > 0 ? `Stok: ${laptop.stock} Unit` : 'Stok Habis' }}
        </span>

        <img
          v-if="laptop.image_url"
          :src="laptop.image_url"
          :alt="laptop.model"
          class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        <div v-else class="flex flex-col items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors">
          <span class="material-symbols-outlined text-[72px] font-light">laptop_mac</span>
          <span class="text-xs font-bold tracking-wide uppercase mt-1 text-slate-600">{{ laptop.brand }}</span>
        </div>
      </div>

      <!-- Details Body -->
      <div class="p-5">
        <!-- Brand & Warranty / SKU -->
        <div class="text-xs font-mono text-slate-600 mb-1.5 flex items-center justify-between">
          <span class="uppercase tracking-wider font-bold text-slate-700">{{ laptop.brand }} • Garansi Resmi</span>
          <span v-if="laptop.sku" class="truncate max-w-[120px] font-medium text-slate-500">{{ laptop.sku }}</span>
        </div>

        <!-- Model Title -->
        <router-link :to="`/laptop/${laptop.id || laptop.laptop_id}`" class="block">
          <h3 class="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1" :title="laptop.model">
            {{ laptop.model }}
          </h3>
        </router-link>

        <!-- Price & Credit Teaser -->
        <div class="mt-1.5 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
          <p class="font-mono text-xl font-black text-slate-900">
            {{ formatIDR(laptop.price) }}
          </p>
          <button
            type="button"
            @click="showCreditModal = true"
            class="text-[11px] font-bold text-blue-700 hover:text-blue-900 hover:underline flex items-center gap-0.5 cursor-pointer self-start sm:self-auto"
            title="Buka kalkulator simulasi kredit"
          >
            <span class="material-symbols-outlined text-[13px]">calculate</span>
            <span>Cicilan {{ formatIDR(Math.round(laptop.price / 12)) }}/bln</span>
          </button>
        </div>

        <!-- Specs Badges (High Legibility) -->
        <div class="flex flex-wrap gap-1.5 mt-3 text-xs">
          <span class="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-semibold border border-slate-200/80 truncate max-w-[150px]" :title="laptop.processor_name">
            {{ laptop.processor_name }}
          </span>
          <span class="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-semibold border border-slate-200/80">
            {{ laptop.ram_gb }}GB RAM
          </span>
          <span class="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-semibold border border-slate-200/80 truncate max-w-[130px]" :title="laptop.storage_desc">
            {{ laptop.storage_desc }}
          </span>
          <span v-if="laptop.weight_kg" class="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-semibold border border-slate-200/80">
            {{ laptop.weight_kg }} kg
          </span>
          <span v-if="laptop.battery_hours" class="px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 font-bold border border-blue-200">
            Baterai {{ laptop.battery_hours }} Jam
          </span>
        </div>

        <!-- Match Bar (When matchPercentage is provided) -->
        <div v-if="matchPercentage" class="mt-4 pt-3 border-t border-slate-100">
          <div class="flex justify-between items-center text-xs mb-1">
            <span class="text-slate-700 font-bold">Tingkat Kecocokan</span>
            <span class="font-extrabold text-sm" :class="rank === 1 ? 'text-blue-600' : 'text-slate-900'">{{ matchPercentage }}%</span>
          </div>
          <div class="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              class="h-full rounded-full transition-all duration-500"
              :class="rank === 1 ? 'bg-blue-600' : 'bg-slate-700'"
              :style="{ width: `${matchPercentage}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="p-5 pt-0 grid grid-cols-2 gap-2 mt-2">
      <router-link
        :to="`/laptop/${laptop.id || laptop.laptop_id}`"
        class="inline-flex items-center justify-center gap-1.5 h-10 px-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 text-sm font-bold transition-colors shadow-xs"
      >
        <span class="material-symbols-outlined" style="font-size: 17px;">info</span>
        <span>Detail Spek</span>
      </router-link>
      <button
        @click="handleAddToCart(laptop, $event)"
        :disabled="laptop.stock <= 0"
        class="inline-flex items-center justify-center gap-1.5 h-10 px-3 rounded-lg text-white text-sm font-bold shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        :class="isAdded ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'"
      >
        <span class="material-symbols-outlined" style="font-size: 17px;">{{ isAdded ? 'check' : 'add_shopping_cart' }}</span>
        <span>{{ isAdded ? 'Ditambahkan' : '+ Keranjang' }}</span>
      </button>
    </div>

    <!-- Credit Simulation Modal -->
    <CreditSimulationModal
      :is-open="showCreditModal"
      :laptop="laptop"
      @close="showCreditModal = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '../stores/cartStore';
import { useCartAnimation } from '../composables/useCartAnimation';
import { useRouter } from 'vue-router';
import CreditSimulationModal from './CreditSimulationModal.vue';

const props = defineProps({
  laptop: {
    type: Object,
    required: true
  },
  rank: {
    type: Number,
    default: null
  },
  matchPercentage: {
    type: [Number, String],
    default: null
  }
});

const cartStore = useCartStore();
const router = useRouter();
const { triggerFlyToCart } = useCartAnimation();
const isAdded = ref(false);
const showCreditModal = ref(false);

function formatIDR(val) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val);
}

function handleAddToCart(laptop, event) {
  triggerFlyToCart(event, laptop);
  isAdded.value = true;
  setTimeout(() => {
    isAdded.value = false;
  }, 1200);
}
</script>
