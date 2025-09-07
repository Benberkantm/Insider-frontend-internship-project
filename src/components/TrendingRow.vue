<template>
  <div class="mt-10">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl font-bold text-white">Ana Akım</h2>
      <div class="flex bg-gray-800 rounded-lg p-1">
        <button
          class="px-3 py-1 text-sm rounded-md"
          :class="timeWindow === 'day' ? 'bg-red-600 text-white' : 'text-gray-300 hover:text-white'"
          @click="changeWindow('day')"
        >
          Bugün
        </button>
        <button
          class="px-3 py-1 text-sm rounded-md"
          :class="
            timeWindow === 'week' ? 'bg-red-600 text-white' : 'text-gray-300 hover:text-white'
          "
          @click="changeWindow('week')"
        >
          Bu Hafta
        </button>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
    </div>

    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 items-stretch"
    >
      <MoviePoster
        v-for="item in items"
        :key="item.id + '-' + (item.media_type || type)"
        :id="item.id"
        :title="item.title || item.name"
        :poster-path="item.poster_path"
        :release-date="item.release_date || item.first_air_date"
        :rating="item.vote_average || 0"
        :vote-count="item.vote_count || 0"
        :type="item.media_type === 'tv' ? 'tv' : 'movie'"
        @click="emit('item-click', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import tmdbService from '../services/tmdb.js'
import MoviePoster from './MoviePoster.vue'

const props = defineProps({
  type: {
    type: String,
    default: 'all',
  },
  initialWindow: {
    type: String,
    default: 'day',
  },
})

const emit = defineEmits(['item-click'])

const items = ref([])
const loading = ref(false)
const timeWindow = ref(props.initialWindow)

const fetchTrending = async () => {
  loading.value = true
  try {
    const res = await tmdbService.getTrending(props.type, timeWindow.value, 1)
    items.value = res.results || []
  } catch (e) {
    console.error('Failed to fetch trending items:', e)
    items.value = []
  } finally {
    loading.value = false
  }
}

const changeWindow = (val) => {
  if (timeWindow.value !== val) {
    timeWindow.value = val
  }
}

watch(timeWindow, fetchTrending)
onMounted(fetchTrending)
</script>
