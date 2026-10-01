<template>
  <div class="min-h-[80vh] flex items-center justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8 font-sans">
    <div class="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      
      <!-- Logo & Title -->
      <div class="text-center mb-8">
        <div class="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white mx-auto mb-3 shadow-md shadow-blue-500/20">
          <span class="material-symbols-outlined text-[24px]">lock</span>
        </div>
        <h2 class="text-2xl font-extrabold text-slate-900 tracking-tight">Portal Masuk Administrator</h2>
        <p class="text-xs text-slate-500 mt-1">
          Akses manajemen produk, bobot profil SAW, dan rekap transaksi.
        </p>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
        <span class="material-symbols-outlined text-[18px]">error</span>
        <span>{{ errorMessage }}</span>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Email Administrator
          </label>
          <input
            type="email"
            v-model="email"
            required
            placeholder="admin@smartlap.com"
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
          />
        </div>

        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Kata Sandi
          </label>
          <input
            type="password"
            v-model="password"
            required
            placeholder="••••••••"
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
          />
        </div>

        <!-- Hint Box -->
        <div class="p-3 rounded-xl bg-blue-50/60 border border-blue-100 text-[11px] text-blue-700">
          <span class="font-bold">Akun Uji Coba:</span> admin@smartlap.com / admin123
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <span v-if="loading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          <span>Masuk Administrator</span>
        </button>
      </form>

      <!-- Guest Option -->
      <div class="mt-6 pt-6 border-t border-slate-100 text-center">
        <router-link
          to="/"
          class="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors inline-flex items-center gap-1"
        >
          <span class="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Lanjut Berbelanja Tanpa Login (Tamu)</span>
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('admin@smartlap.com');
const password = ref('admin123');
const loading = ref(false);
const errorMessage = ref('');

async function handleLogin() {
  loading.value = true;
  errorMessage.value = '';
  try {
    const res = await authStore.login(email.value, password.value);
    if (res.success) {
      router.push('/admin');
    } else {
      errorMessage.value = res.message || 'Login gagal';
    }
  } catch (err) {
    errorMessage.value = 'Terjadi kesalahan sistem';
  } finally {
    loading.value = false;
  }
}
</script>
