<template>
  <div>
    <SearchInput
      title="Dizileri Keşfet"
      subtitle="Bir sonraki favori dizini bul"
      placeholder="Dizi ara..."
      restrict-type="tv"
      @search="handleSearch"
    />

    <div class="glass-panel p-3 sm:p-4 section-gap">
      <PaginationTabs type="tv-shows" :loading="loading" @tab-change="handleTabChange" />
      <div
        v-if="!loading && tvShows.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-stretch"
      >
        <MoviePoster
          v-for="show in tvShows"
          :key="show.id"
          :id="show.id"
          :title="show.name || show.title"
          :poster-path="show.poster_path"
          :release-date="show.first_air_date || show.release_date"
          :rating="show.vote_average"
          :vote-count="show.vote_count"
          :type="show.media_type || 'tv'"
        />
      </div>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <div v-if="!loading && tvShows.length === 0" class="text-center py-12">
      <svg class="w-16 h-16 text-gray-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <h3 class="text-xl font-semibold text-white mb-2">No TV shows found</h3>
      <p class="text-gray-400">Try adjusting your search or filters</p>
    </div>
    <div v-if="!loading && tvShows.length > 0 && hasMorePages" class="text-center mt-8">
      <button
        @click="loadMore"
        class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold tracking-wide transition-colors duration-200"
      >
        Daha Fazla Dizi Yükle
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import tmdbService from '../services/tmdb.js'
import SearchInput from '../components/SearchInput.vue'
import PaginationTabs from '../components/PaginationTabs.vue'
import MoviePoster from '../components/MoviePoster.vue'

const tvShows = ref([])
const loading = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)
const currentTab = ref('popular')
const searchQuery = ref('')
const isSearching = ref(false)

const hasMorePages = computed(() => currentPage.value < totalPages.value)
const fetchTVShows = async (page = 1, tab = 'popular') => {
  loading.value = true
  try {
    let response
    if (isSearching.value && searchQuery.value) {
      response = await tmdbService.searchTVShows(searchQuery.value, page)
    } else {
      if (tab === 'popular') {
        response = await tmdbService.getPopularTVShows(page)
      } else {
        response = await tmdbService.getTopRatedTVShows(page)
      }
    }

    const results = response.results || []
    if (page === 1) {
      tvShows.value = results
    } else {
      tvShows.value.push(...results)
    }

    currentPage.value = response.page
    totalPages.value = response.total_pages
  } catch (error) {
    console.error('Error fetching TV shows:', error)
    tvShows.value = []
  } finally {
    loading.value = false
  }
}

const handleTabChange = (tab) => {
  currentTab.value = tab
  isSearching.value = false
  searchQuery.value = ''
  currentPage.value = 1
  fetchTVShows(1, tab)
}

const handleSearch = (payload) => {
  const query = typeof payload === 'object' && payload !== null ? payload.query || '' : payload
  searchQuery.value = query
  isSearching.value = true
  currentPage.value = 1
  fetchTVShows(1, currentTab.value)
}

const loadMore = () => {
  if (hasMorePages.value && !loading.value) {
    fetchTVShows(currentPage.value + 1, currentTab.value)
  }
}

onMounted(() => {
  const route = useRoute()
  const initial = (route.query?.search || '').toString().trim()
  if (initial.length >= 1) {
    searchQuery.value = initial
    isSearching.value = true
    fetchTVShows(1, currentTab.value)
  } else {
    fetchTVShows(1, 'popular')
  }
})

const route = useRoute()
watch(
  () => route.query.search,
  (val) => {
    const q = (val || '').toString().trim()
    if (q) {
      handleSearch(q)
    }
  },
)
</script>
