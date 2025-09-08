<template>
  <div class="w-full flex items-center gap-1 min-w-0 h-6 leading-none">
    <div class="flex items-center flex-none">
      <div class="flex items-center gap-0.5 flex-none">
        <svg
          v-for="star in 5"
          :key="star"
          class="w-3 h-3 shrink-0"
          :class="star <= filledStars ? 'text-yellow-400' : 'text-gray-600'"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          ></path>
        </svg>
      </div>
      <span
        class="text-gray-300 text-xs sm:text-sm ml-1 font-semibold whitespace-nowrap tabular-nums leading-none flex-none"
      >
        {{ formattedRating }}
      </span>
      <span class="text-gray-400 text-xs sm:text-sm whitespace-nowrap ml-2 flex-none">
        ({{ formatVoteCount(voteCount) }})
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  rating: {
    type: Number,
    default: 0,
  },
  voteCount: {
    type: Number,
    default: 0,
  },
  maxRating: {
    type: Number,
    default: 10,
  },
})

const filledStars = computed(() => {
  const ratingOutOf5 = (props.rating / props.maxRating) * 5
  return Math.round(ratingOutOf5)
})

const formattedRating = computed(() => {
  return props.rating.toFixed(1)
})

const formatVoteCount = (count) => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M'
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K'
  }
  return count.toString()
}
</script>
