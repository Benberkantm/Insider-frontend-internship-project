<template>
  <div class="relative">
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-lg"
      :style="{ backgroundImage: `url('/series-movies.png')` }"
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
              @input="onInput"
              @keyup.enter="handleSearch"
              type="text"
              id="search-input"
              name="search"
              aria-label="Search query"
              :placeholder="placeholder"
              class="flex-1 px-6 py-4 text-lg bg-white bg-opacity-90 text-gray-900 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white placeholder-gray-500"
            />
            <button
              @click="handleSearch"
              class="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-r-lg transition-colors duration-200 flex items-center"
              aria-label="Search"
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
          <div
            v-if="showSuggestions"
            class="absolute left-0 right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20 text-left max-h-80 overflow-auto"
            role="listbox"
          >
            <ul class="divide-y divide-gray-200">
              <li v-if="isLoading" class="px-4 py-3 text-gray-500">Loading…</li>
              <li
                v-for="item in suggestions"
                :key="`${item.media_type}-${item.id}`"
                class="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                @click="handleSelect(item)"
                role="option"
              >
                <span class="shrink-0">
                  <img
                    v-if="item.media_type === 'movie'"
                    src="/icons/movie.png"
                    class="w-4 h-4"
                    alt="Film"
                  />
                  <img
                    v-else-if="item.media_type === 'tv'"
                    src="/icons/tv.png"
                    class="w-4 h-4"
                    alt="Dizi"
                  />
                </span>
                <div class="min-w-0">
                  <div class="text-gray-900 truncate">{{ item.title || item.name }}</div>
                  <div class="text-xs text-gray-500">
                    {{ item.media_type === 'movie' ? 'Filmler' : 'Diziler' }}
                  </div>
                </div>
              </li>
              <li v-if="!isLoading && suggestions.length === 0" class="px-4 py-3 text-gray-500">
                No results
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import tmdbService from '../services/tmdb.js'

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
  restrictType: {
    type: String,
    default: null,
    validator: (v) => v === null || v === 'movie' || v === 'tv',
  },
})

const emit = defineEmits(['search'])

const searchQuery = ref('')
const suggestions = ref([])
const showSuggestions = ref(false)
const isLoading = ref(false)
let debounceTimer = null
let abortController = null

const fetchSuggestions = async (query) => {
  try {
    if (abortController) {
      abortController.abort()
    }
    abortController = new AbortController()
    isLoading.value = true
    const response = await tmdbService.searchMulti(query, 1, { signal: abortController.signal })
    let items = response?.results || []
    items = items.filter((r) => r.media_type === 'movie' || r.media_type === 'tv')
    if (props.restrictType) {
      items = items.filter((r) => r.media_type === props.restrictType)
    }
    suggestions.value = items.slice(0, 10)
    showSuggestions.value = true
  } catch {
    suggestions.value = []
    showSuggestions.value = true
  }
  isLoading.value = false
}

const onInput = () => {
  showSuggestions.value = true
  suggestions.value = []
  isLoading.value = false
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  const value = searchQuery.value.trim()
  if (value.length >= 3) {
    debounceTimer = setTimeout(() => {
      fetchSuggestions(value)
    }, 500)
  } else {
    showSuggestions.value = false
  }
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value.trim())
    showSuggestions.value = false
    suggestions.value = []
  }
}

const handleSelect = (item) => {
  const text = item.title || item.name || ''
  if (text) {
    searchQuery.value = text
    emit('search', { query: text, mediaType: item.media_type })
  }
  showSuggestions.value = false
  suggestions.value = []
}
</script>

<style scoped></style>
