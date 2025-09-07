<template>
  <div
    class="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-all duration-300 cursor-pointer group"
    @click="handleClick"
  >
    <div class="aspect-[2/3] relative overflow-hidden">
      <img
        v-if="posterPath"
        :src="posterUrl"
        :alt="title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        @error="handleImageError"
      />
      <div v-else class="w-full h-full bg-gray-700 flex items-center justify-center">
        <svg class="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <div
        class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center"
      >
        <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 5v10l8-5-8-5z"></path>
          </svg>
        </div>
      </div>
    </div>

    <div class="p-4 flex flex-col min-h-[8rem]">
      <h3
        class="text-white font-semibold mb-1 line-clamp-2 group-hover:text-red-400 transition-colors duration-200 flex-shrink-0"
      >
        {{ title }}
      </h3>

      <p class="text-gray-400 text-sm mb-2 flex-shrink-0">
        {{ formatDate(releaseDate) }}
      </p>
      <div class="mt-auto">
        <RatingDisplay :rating="rating" :vote-count="voteCount" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import tmdbService from '../services/tmdb.js'
import RatingDisplay from './RatingDisplay.vue'

const props = defineProps({
  id: {
    type: [Number, String],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  posterPath: {
    type: String,
    default: null,
  },
  releaseDate: {
    type: String,
    default: null,
  },
  rating: {
    type: Number,
    default: 0,
  },
  voteCount: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    default: 'movie',
    validator: (value) => ['movie', 'tv'].includes(value),
  },
})

const emit = defineEmits(['click'])

const posterUrl = computed(() => {
  if (!props.posterPath) return null
  return tmdbService.getPosterUrl(props.posterPath, 'w500')
})

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.getFullYear()
}

const handleClick = () => {
  emit('click', {
    id: props.id,
    title: props.title,
    type: props.type,
  })
}

const handleImageError = (event) => {
  event.target.style.display = 'none'
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  hyphens: auto;
}

.group {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
