<template>
  <div>
    <SearchInput
      title="Search Results"
      subtitle="Movies and TV Shows"
      placeholder="Search movies or TV shows..."
      @search="handleSearch"
    />

    <div v-if="!loading && results.length > 0" class="max-w-7xl mx-auto mt-8">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-stretch"
      >
        <MoviePoster
          v-for="item in results"
          :key="`${item.media_type}-${item.id}`"
          :id="item.id"
          :title="item.title || item.name"
          :poster-path="item.poster_path"
          :release-date="item.release_date || item.first_air_date"
          :rating="item.voteAverage || item.vote_average"
          :vote-count="item.vote_count"
          :type="item.media_type === 'tv' ? 'tv' : 'movie'"
        />
      </div>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
    </div>

    <div v-if="!loading && results.length === 0" class="text-center py-12">
      <svg class="w-16 h-16 text-gray-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <h3 class="text-xl font-semibold text-white mb-2">No results found</h3>
      <p class="text-gray-400">Try a different search</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import tmdbService from '../services/tmdb.js'
import SearchInput from '../components/SearchInput.vue'
import MoviePoster from '../components/MoviePoster.vue'

const results = ref([])
const loading = ref(false)

const route = useRoute()

const fetchAll = async (query) => {
  if (!query) {
    results.value = []
    return
  }
  loading.value = true
  try {
    const response = await tmdbService.searchMulti(query, 1)
    results.value = (response.results || []).filter(
      (r) => r.media_type === 'movie' || r.media_type === 'tv',
    )
  } catch {
    results.value = []
  } finally {
    loading.value = false
  }
}

const handleSearch = (payload) => {
  const q = typeof payload === 'object' && payload !== null ? payload.query || '' : payload
  fetchAll(q)
}

onMounted(() => {
  const initial = (route.query?.search || '').toString().trim()
  fetchAll(initial)
})

watch(
  () => route.query.search,
  (val) => {
    const q = (val || '').toString().trim()
    fetchAll(q)
  },
)
</script>

<style scoped></style>
