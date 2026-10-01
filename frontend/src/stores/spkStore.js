import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useSpkStore = defineStore('spk', () => {
  const profiles = ref([]);
  const selectedProfileId = ref(1);
  const filters = ref({
    max_price: 35000000,
    brand: 'all',
    min_ram: null
  });

  const recommendations = ref([]);
  const brands = ref([]);
  const minMaxReference = ref(null);
  const rawMatrix = ref([]);
  const normalizedMatrix = ref([]);
  const criteria = ref([]);
  const currentWeights = ref({});
  const loading = ref(false);
  const error = ref(null);

  async function fetchProfiles() {
    try {
      const res = await axios.get('/api/profiles');
      if (res.data.success) {
        profiles.value = res.data.data;
      }
    } catch (err) {
      console.error('Error fetching profiles:', err);
    }
  }

  async function fetchBrands() {
    try {
      const res = await axios.get('/api/brands');
      if (res.data.success && Array.isArray(res.data.data)) {
        brands.value = res.data.data;
      }
    } catch (err) {
      console.error('Error fetching brands:', err);
    }
  }

  async function calculateRecommendations(customWeights = null) {
    loading.value = true;
    error.value = null;
    try {
      const payload = {
        profile_id: selectedProfileId.value,
        filters: {
          max_price: filters.value.max_price,
          brand: filters.value.brand,
          min_ram: filters.value.min_ram
        }
      };

      if (customWeights) {
        payload.custom_weights = customWeights;
      }

      const res = await axios.post('/api/spk/recommend', payload);
      if (res.data.success) {
        recommendations.value = res.data.results || [];
        if (res.data.brands && Array.isArray(res.data.brands)) {
          brands.value = res.data.brands;
        }
        minMaxReference.value = res.data.minMaxReference;
        rawMatrix.value = res.data.rawMatrix || [];
        normalizedMatrix.value = res.data.normalizedMatrix || [];
        criteria.value = res.data.criteria || [];
        currentWeights.value = res.data.weights || {};
      } else {
        error.value = res.data.message;
      }
    } catch (err) {
      error.value = err.response?.data?.message || err.message;
      console.error('Error running SPK calculation:', err);
    } finally {
      loading.value = false;
    }
  }

  function setProfile(id) {
    selectedProfileId.value = id;
    calculateRecommendations();
  }

  return {
    profiles,
    selectedProfileId,
    filters,
    brands,
    recommendations,
    minMaxReference,
    rawMatrix,
    normalizedMatrix,
    criteria,
    currentWeights,
    loading,
    error,
    fetchProfiles,
    fetchBrands,
    calculateRecommendations,
    setProfile
  };
});
