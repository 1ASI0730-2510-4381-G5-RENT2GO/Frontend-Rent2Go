<template>
  <section class="car-gallery" role="region" aria-label="Car Gallery">
    <header class="gallery-header">
      <button class="btn-secondary" @click="goHome">
        {{ $t('buttons.backToMenu') }}
      </button>
      <button
          class="btn-primary"
          @click="fetchCars"
          :disabled="loading"
          aria-busy="true"
      >
        {{ $t('gallery.refreshCars') }}
      </button>
    </header>

    <div v-if="loading" class="loading" role="status">
      {{ $t('gallery.loading') }}...
    </div>
    <div v-else-if="cars.length === 0" class="empty" role="alert">
      {{ $t('gallery.noCars') }}
    </div>
    <div v-else class="car-list">
      <div
          v-for="car in cars"
          :key="car.id"
          class="car-card"
          role="article"
          :aria-label="car.name"
      >
        <img :src="car.image" :alt="car.name" class="car-image" />
        <h3>{{ car.name }}</h3>
        <p>{{ car.description || '' }}</p>
        <p>{{ $t('gallery.price') }}: ${{ car.price }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();
const cars = ref([]);
const loading = ref(false);

const fetchCars = async () => {
  loading.value = true;
  try {
    const response = await fetch('https://raw.githubusercontent.com/1ASI0730-2510-4381-G5-RENT2GO/rent2go-fake-api/main/db.json');
    const data = await response.json();
    cars.value = data.vehicles || [];
  } catch (error) {
    console.error('Error fetching cars:', error);
    cars.value = [];
  } finally {
    loading.value = false;
  }
};

const goHome = () => {
  router.push('/');
};

onMounted(fetchCars);
</script>

<style scoped>
.car-gallery {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
}

.gallery-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
}

.btn-primary,
.btn-secondary {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  border: none;
  transition: background 0.3s, color 0.3s;
  cursor: pointer;
}

.btn-primary {
  background-color: #006aff;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 106, 255, 0.2);
}

.btn-primary:hover:enabled {
  background-color: #0053cc;
}

.btn-secondary {
  background-color: transparent;
  color: #006aff;
  border: 2px solid #006aff;
}

.btn-secondary:hover {
  background-color: #e6f0ff;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.car-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.car-card {
  background: var(--bg-color, #fff);
  color: var(--text-color, #333);
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.car-card:hover {
  transform: translateY(-4px);
}

.car-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 12px;
}

.loading,
.empty {
  text-align: center;
  font-size: 1.2rem;
  color: var(--text-color, #555);
  padding: 2rem;
}
</style>
