<template>
  <div>
    <SearchInput
      title="Discover Movies"
      subtitle="Find your next favorite movie"
      placeholder="Search for movies..."
      @search="handleSearch"
    />

    <PaginationTabs type="movies" :loading="loading" @tab-change="handleTabChange" />
    <div
      v-if="!loading && movies.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-stretch"
    >
      <MoviePoster
        v-for="movie in movies"
        :key="movie.id"
        :id="movie.id"
        :title="movie.title"
        :poster-path="movie.poster_path"
        :release-date="movie.release_date"
        :rating="movie.vote_average"
        :vote-count="movie.vote_count"
        type="movie"
        @click="handleMovieClick"
      />
    </div>

    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
    </div>

    <div v-if="!loading && movies.length === 0" class="text-center py-12">
      <svg class="w-16 h-16 text-gray-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <h3 class="text-xl font-semibold text-white mb-2">No movies found</h3>
      <p class="text-gray-400">Try adjusting your search or filters</p>
    </div>
    <div v-if="!loading && movies.length > 0 && hasMorePages" class="text-center mt-8">
      <button
        @click="loadMore"
        class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
      >
        Load More Movies
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import tmdbService from '../services/tmdb.js'
import SearchInput from '../components/SearchInput.vue'
import PaginationTabs from '../components/PaginationTabs.vue'
import MoviePoster from '../components/MoviePoster.vue'

const movies = ref([])
const loading = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)
const currentTab = ref('popular')
const searchQuery = ref('')
const isSearching = ref(false)

const hasMorePages = computed(() => currentPage.value < totalPages.value)
const fetchMovies = async (page = 1, tab = 'popular') => {
  loading.value = true
  try {
    let response
    if (isSearching.value && searchQuery.value) {
      response = await tmdbService.searchMovies(searchQuery.value, page)
    } else {
      if (tab === 'popular') {
        response = await tmdbService.getPopularMovies(page)
      } else {
        response = await tmdbService.getTopRatedMovies(page)
      }
    }

    if (page === 1) {
      movies.value = response.results
    } else {
      movies.value.push(...response.results)
    }

    currentPage.value = response.page
    totalPages.value = response.total_pages
  } catch (error) {
    console.error('Error fetching movies:', error)
    movies.value = []
  } finally {
    loading.value = false
  }
}

const handleTabChange = (tab) => {
  currentTab.value = tab
  isSearching.value = false
  searchQuery.value = ''
  currentPage.value = 1
  fetchMovies(1, tab)
}

const handleSearch = (query) => {
  searchQuery.value = query
  isSearching.value = true
  currentPage.value = 1
  fetchMovies(1, currentTab.value)
}

const loadMore = () => {
  if (hasMorePages.value && !loading.value) {
    fetchMovies(currentPage.value + 1, currentTab.value)
  }
}

const handleMovieClick = (movie) => {
  // Handle movie click
}
onMounted(() => {
  fetchMovies(1, 'popular')
})
</script>
