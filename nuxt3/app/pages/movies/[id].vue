<template>
  <div>
    <div v-if="loading" class="flex justify-center items-center py-16">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
    </div>

    <div v-else-if="error" class="text-center py-16">
      <h1 class="text-2xl font-semibold mb-2">Film bulunamadı.</h1>
      <p class="text-gray-400">Lütfen daha sonra tekrar deneyin.</p>
    </div>

    <div v-else class="glass-panel p-3 sm:p-4">
      <div class="flex flex-col md:flex-row gap-6">
        <div class="w-full md:w-1/3">
          <img v-if="posterUrl" :src="posterUrl" :alt="movie.title" class="w-full rounded-lg" />
          <div v-else class="w-full aspect-[2/3] bg-gray-700 rounded-lg"></div>
        </div>
        <div class="w-full md:w-2/3">
          <h1 class="text-2xl md:text-3xl font-bold mb-2">{{ movie.title }}</h1>
          <p class="text-gray-400 mb-4">{{ year }} • {{ runtime }} • {{ genres }}</p>

          <div class="flex items-center gap-4 mb-6">
            <RatingDisplay :rating="movie.vote_average" :vote-count="movie.vote_count" />
            <button
              class="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
              @click="toggleFavorite"
            >
              {{ isFaved ? 'Favorilerden kaldır' : 'Favorilere ekle' }}
            </button>
          </div>

          <h2 class="text-xl font-semibold mb-2">Özet</h2>
          <p class="text-gray-300 mb-6">{{ movie.overview || 'Özet bulunamadı.' }}</p>

          <div v-if="cast.length" class="mb-6">
            <h2 class="text-xl font-semibold mb-3">Oyuncular</h2>
            <div class="flex gap-3 overflow-x-auto pb-2">
              <div
                v-for="person in cast"
                :key="person.cast_id || person.credit_id"
                class="min-w-[110px] max-w-[110px]"
              >
                <img
                  v-if="person.profile_path"
                  :src="profileUrl(person.profile_path)"
                  :alt="person.name"
                  class="w-full h-[150px] object-cover rounded-md"
                />
                <div v-else class="w-full h-[150px] bg-gray-700 rounded-md"></div>
                <p class="text-sm mt-2 font-semibold line-clamp-2">{{ person.name }}</p>
                <p class="text-xs text-gray-400 line-clamp-2">{{ person.character }}</p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 class="font-semibold">Durum</h3>
              <p class="text-gray-300">{{ movie.status || 'Unknown' }}</p>
            </div>
            <div>
              <h3 class="font-semibold">Yayın Tarihi</h3>
              <p class="text-gray-300">{{ movie.release_date || 'N/A' }}</p>
            </div>
            <div>
              <h3 class="font-semibold">Orjinal Dil</h3>
              <p class="text-gray-300 uppercase">{{ movie.original_language }}</p>
            </div>
            <div>
              <h3 class="font-semibold">Bütçe</h3>
              <p class="text-gray-300">{{ formatCurrency(movie.budget) }}</p>
            </div>
            <div>
              <h3 class="font-semibold">Gelir</h3>
              <p class="text-gray-300">{{ formatCurrency(movie.revenue) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import tmdb from '~/services/tmdb'
import RatingDisplay from '~/components/RatingDisplay.vue'
import { useFavoritesStore } from '~/stores/favorites'

defineOptions({ name: 'MovieDetailsPage' })

const route = useRoute()
const favorites = useFavoritesStore()

const loading = ref(true)
const error = ref(false)
const movie = ref({})
const cast = ref([])

const fetchData = async (id) => {
  loading.value = true
  error.value = false
  try {
    const [details, credits] = await Promise.all([
      tmdb.getMovieDetails(id),
      tmdb.getMovieCredits(id),
    ])
    movie.value = details || {}
    cast.value = (credits?.cast || []).slice(0, 12)
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

const id = computed(() => route.params.id)

onMounted(() => {
  if (id.value) fetchData(id.value)
})

watch(
  () => id.value,
  (val) => {
    if (val) fetchData(val)
  },
)

const posterUrl = computed(() => tmdb.getPosterUrl(movie.value?.poster_path, 'w500'))
const profileUrl = (path) => tmdb.getImageUrl(path, 'w185')
const year = computed(() =>
  movie.value?.release_date ? new Date(movie.value.release_date).getFullYear() : 'N/A',
)
const runtime = computed(() => {
  const min = Number(movie.value?.runtime || 0)
  if (!min) return 'N/A'
  const h = Math.floor(min / 60)
  const m = min % 60
  return `${h}h ${m}m`
})
const genres = computed(() => (movie.value?.genres || []).map((g) => g.name).join(', '))

const isFaved = computed(() => favorites.isFavorite(id.value, 'movie'))
const toggleFavorite = () => {
  favorites.toggleFavorite({
    id: Number(id.value),
    type: 'movie',
    title: movie.value?.title || '',
    posterPath: movie.value?.poster_path || null,
    releaseDate: movie.value?.release_date || null,
    rating: Number(movie.value?.vote_average || 0),
    voteCount: Number(movie.value?.vote_count || 0),
  })
}

function formatCurrency(val) {
  const n = Number(val || 0)
  if (!n) return 'N/A'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  hyphens: auto;
}
</style>
