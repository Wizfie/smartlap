<template>
  <footer class="mt-auto py-6 border-t border-slate-200 bg-white text-xs text-slate-500 font-sans print:hidden">
    <div class="max-w-[1380px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
      <span>© 2026 SmartLap. Toko Laptop & Rekomendasi Pintar.</span>
      <div class="flex flex-wrap justify-center items-center gap-3 sm:gap-6 font-medium">
        <router-link to="/" class="hover:text-blue-600 transition-colors">Beranda</router-link>
        <router-link to="/katalog" class="hover:text-blue-600 transition-colors">Katalog</router-link>
        <router-link to="/cek-pesanan" class="hover:text-blue-600 transition-colors">Cek Pesanan</router-link>
        <router-link to="/login" class="hover:text-blue-600 transition-colors">Masuk Admin</router-link>
      </div>
    </div>
  </footer>
</template>
