<template>
  <div>
    <SearchInput
      title="Dizileri Keşfet"
      subtitle="Bir sonraki favori dizini bul"
      placeholder="Dizi ara..."
      restrict-type="tv"
      @search="handleSearch"
    />
    <FilterSortBar class="mt-6" @change="applyFilters" />
    <div class="glass-panel p-3 sm:p-4 section-gap">
      <PaginationTabs type="tv-shows" :loading="loading" @tab-change="handleTabChange" />
      <div
        v-if="!loading && items.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-stretch"
      >
        <MoviePoster
          v-for="m in displayed"
          :key="m.id"
          :id="m.id"
          :title="m.name || m.title"
          :poster-path="m.poster_path"
          :release-date="m.first_air_date || m.release_date"
          :rating="m.vote_average"
          :vote-count="m.vote_count"
          :type="'tv'"
        />
      </div>
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
      <div v-if="!loading && items.length === 0" class="text-center py-12 text-gray-300">
        Sonuç bulunamadı
      </div>
      <div v-if="!loading && hasMorePages" class="text-center mt-8">
        <button
          @click="loadMore"
          class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Daha Fazla Göster
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
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
const isDiscoverActive = ref(false)

const filters = ref({
  sortKey: 'rating_desc',
  minYear: undefined,
  maxYear: undefined,
  minVotes: undefined,
})

const fetchUpcoming = async () => {
  const res = await tmdb.getUpcomingTVShows(page.value)
  return res
}

const fetchSearch = async (query) => {
  const res = await tmdb.searchTVShows(query, page.value)
  return res
}

const fetchPage = async (query) => {
  loading.value = true
  try {
    const res = query ? await fetchSearch(query) : await fetchUpcoming()
    const results = res.results || []
    if (page.value === 1) items.value = results
    else items.value.push(...results)
    totalPages.value = res.total_pages || 1
  } finally {
    loading.value = false
  }
}

const applyFilters = async (payload) => {
  filters.value = payload
  page.value = 1
  isDiscoverActive.value = true
  loading.value = true
  try {
    const res = await tmdb.discoverTV({
      sortKey: filters.value.sortKey,
      minYear: filters.value.minYear,
      maxYear: filters.value.maxYear,
      minVotes: filters.value.minVotes,
      page: page.value,
    })
    items.value = res.results || []
    totalPages.value = res.total_pages || 1
  } finally {
    loading.value = false
  }
}

const handleTabChange = (tab) => {
  if (tab === 'popular') router.push('/tv/popular')
  else if (tab === 'top-rated') router.push('/tv/top-rated')
}

const displayed = computed(() => {
  let list = [...items.value]
  if (filters.value.minYear)
    list = list.filter(
      (i) => new Date(i.first_air_date || i.release_date).getFullYear() >= filters.value.minYear,
    )
  if (filters.value.maxYear)
    list = list.filter(
      (i) => new Date(i.first_air_date || i.release_date).getFullYear() <= filters.value.maxYear,
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
          new Date(a.first_air_date || a.release_date) -
          new Date(b.first_air_date || b.release_date),
      )
      break
    case 'date_desc':
      list.sort(
        (a, b) =>
          new Date(b.first_air_date || b.release_date) -
          new Date(a.first_air_date || a.release_date),
      )
      break
    case 'title_asc':
      list.sort((a, b) => (a.name || a.title || '').localeCompare(b.name || b.title || ''))
      break
  }
  return list
})

const loadMore = async () => {
  if (!loading.value && hasMorePages.value) {
    page.value += 1
    if (isDiscoverActive.value) {
      loading.value = true
      try {
        const res = await tmdb.discoverTV({
          sortKey: filters.value.sortKey,
          minYear: filters.value.minYear,
          maxYear: filters.value.maxYear,
          minVotes: filters.value.minVotes,
          page: page.value,
        })
        items.value.push(...(res.results || []))
        totalPages.value = res.total_pages || totalPages.value
      } finally {
        loading.value = false
      }
    } else {
      fetchPage(currentQuery.value)
    }
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
