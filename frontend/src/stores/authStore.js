import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('smartlap_token') || null);
  const savedUser = localStorage.getItem('smartlap_user');
  const user = ref(savedUser ? JSON.parse(savedUser) : null);

  const isAdmin = computed(() => {
    return user.value?.role === 'admin';
  });

  async function login(email, password) {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      if (res.data.success) {
        token.value = res.data.data.token;
        user.value = res.data.data;
        localStorage.setItem('smartlap_token', token.value);
        localStorage.setItem('smartlap_user', JSON.stringify(user.value));
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Login gagal, periksa email dan password Anda.'
      };
    }
  }

  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem('smartlap_token');
    localStorage.removeItem('smartlap_user');
  }

  return {
    token,
    user,
    isAdmin,
    login,
    logout
  };
});
