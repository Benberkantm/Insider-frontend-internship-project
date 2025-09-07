<template>
  <div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-2xl font-bold text-white mb-6">Favorites</h1>
      <div
        v-if="list.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-stretch"
      >
        <MoviePoster
          v-for="item in list"
          :key="`${item.type}-${item.id}`"
          :id="item.id"
          :title="item.title"
          :poster-path="item.posterPath"
          :release-date="item.releaseDate"
          :rating="item.rating || 0"
          :vote-count="item.voteCount || 0"
          :type="item.type"
        />
      </div>
      <div v-else class="text-center py-12">
        <p class="text-gray-400">You haven't added any favorites yet.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useFavoritesStore } from '../stores/favorites.js'
import MoviePoster from '../components/MoviePoster.vue'

const store = useFavoritesStore()
const list = computed(() => store.favoritesList)

onMounted(() => {
  store.hydrateMissingDetails()
})

defineOptions({
  name: 'FavoritesView',
})
</script>

<style scoped></style>
