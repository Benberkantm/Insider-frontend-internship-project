<template>
  <div class="relative">
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-lg"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    >
      <div class="absolute inset-0 bg-black bg-opacity-60 rounded-lg"></div>
    </div>

    <div class="relative z-10 p-8 md:p-12 lg:p-16">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          {{ title }}
        </h1>
        <p class="text-lg md:text-xl text-gray-200 mb-8">
          {{ subtitle }}
        </p>
        <div class="relative max-w-2xl mx-auto">
          <div class="flex">
            <input
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              type="text"
              :placeholder="placeholder"
              class="flex-1 px-6 py-4 text-lg bg-white bg-opacity-90 text-gray-900 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white placeholder-gray-500"
            />
            <button
              @click="handleSearch"
              class="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-r-lg transition-colors duration-200 flex items-center"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Discover Amazing Content',
  },
  subtitle: {
    type: String,
    default: 'Search for movies and TV shows',
  },
  placeholder: {
    type: String,
    default: 'Search for movies, TV shows...',
  },
  backgroundImage: {
    type: String,
    default:
      'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/wwemzKWzjKYJFfCeiB57q3r4Bcm.png',
  },
})

const emit = defineEmits(['search'])

const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value.trim())
  }
}
</script>

<style scoped>
/* Custom styles for search component */
</style>
