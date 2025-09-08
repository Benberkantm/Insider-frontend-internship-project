<template>
  <div>
    <SearchInput
      title="Filmleri Keşfet"
      subtitle="Bir sonraki favori filmini bul"
      placeholder="Film ara..."
      restrict-type="movie"
      @search="handleSearch"
    />
    <FilterSortBar class="mt-6" @change="applyFilters" />
    <div class="glass-panel p-3 sm:p-4 section-gap">
      <PaginationTabs
        type="movies"
        :loading="loading"
        :active="'popular'"
        @tab-change="handleTabChange"
      />
      <div
        v-if="!loading && items.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-stretch"
      >
        <MoviePoster
          v-for="m in displayed"
          :key="m.id"
          :id="m.id"
          :title="m.title || m.name"
          :poster-path="m.poster_path"
          :release-date="m.release_date || m.first_air_date"
          :rating="m.vote_average"
          :vote-count="m.vote_count"
          :type="'movie'"
        />
      </div>
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
      <div v-if="!loading && items.length === 0" class="text-center py-12 text-gray-300">
        No results
      </div>
      <div v-if="!loading && hasMorePages" class="text-center mt-8">
        <button
          @click="loadMore"
          class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Load More
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'MoviesPopularPage' })
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import tmdb from '~/services/tmdb'
import MoviePoster from '~/components/MoviePoster.vue'
import FilterSortBar from '~/components/FilterSortBar.vue'
import SearchInput from '~/components/SearchInput.vue'
import PaginationTabs from '~/components/PaginationTabs.vue'

const loading = ref(false)
const items = ref([])
const page = ref(1)
const totalPages = ref(1)
const hasMorePages = computed(() => page.value < totalPages.value)
const router = useRouter()

const filters = ref({
  sortKey: 'rating_desc',
  minYear: undefined,
  maxYear: undefined,
  minVotes: undefined,
})

const fetchPopular = async () => {
  const res = await tmdb.getPopularMovies(page.value)
  return res
}

const fetchSearch = async (query) => {
  const res = await tmdb.searchMovies(query, page.value)
  return res
}

const fetchPage = async (query) => {
  loading.value = true
  try {
    const res = query ? await fetchSearch(query) : await fetchPopular()
    const results = res.results || []
    if (page.value === 1) items.value = results
    else items.value.push(...results)
    totalPages.value = res.total_pages || 1
  } finally {
    loading.value = false
  }
}

const applyFilters = (payload) => {
  filters.value = payload
}

const handleTabChange = (tab) => {
  if (tab === 'popular') router.push('/movies/popular')
  else if (tab === 'top-rated') router.push('/movies/top-rated')
  else if (tab === 'upcoming') router.push('/movies/upcoming')
}

const displayed = computed(() => {
  let list = [...items.value]
  if (filters.value.minYear)
    list = list.filter(
      (i) => new Date(i.release_date || i.first_air_date).getFullYear() >= filters.value.minYear,
    )
  if (filters.value.maxYear)
    list = list.filter(
      (i) => new Date(i.release_date || i.first_air_date).getFullYear() <= filters.value.maxYear,
    )
  if (filters.value.minVotes)
    list = list.filter((i) => (i.vote_count || 0) >= filters.value.minVotes)
  switch (filters.value.sortKey) {
    case 'rating_asc':
      list.sort((a, b) => (a.vote_average || 0) - (b.vote_average || 0))
      break
    case 'rating_desc':
      list.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0))
      break
    case 'votes_asc':
      list.sort((a, b) => (a.vote_count || 0) - (b.vote_count || 0))
      break
    case 'votes_desc':
      list.sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0))
      break
    case 'date_asc':
      list.sort(
        (a, b) =>
          new Date(a.release_date || a.first_air_date) -
          new Date(b.release_date || b.first_air_date),
      )
      break
    case 'date_desc':
      list.sort(
        (a, b) =>
          new Date(b.release_date || b.first_air_date) -
          new Date(a.release_date || a.first_air_date),
      )
      break
    case 'title_asc':
      list.sort((a, b) => (a.title || a.name || '').localeCompare(b.title || b.name || ''))
      break
  }
  return list
})

const loadMore = () => {
  if (!loading.value && hasMorePages.value) {
    page.value += 1
    fetchPage(currentQuery.value)
  }
}

const currentQuery = ref('')
const handleSearch = (payload) => {
  const q = typeof payload === 'object' && payload !== null ? payload.query || '' : payload
  currentQuery.value = q
  page.value = 1
  items.value = []
  fetchPage(currentQuery.value)
}

onMounted(() => {
  page.value = 1
  fetchPage()
})
</script>
