<template>
  <div class="rounded-2xl p-4 mb-6">
    <div class="flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div class="flex space-x-1 rounded-lg p-1 bg-black/40 backdrop-blur-md">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="selectTab(tab.key)"
          class="px-3 py-1 text-sm rounded-md transition-colors duration-200"
          :class="{
            'bg-red-600 text-white': props.active === tab.key,
            'text-gray-300 hover:text-white': props.active !== tab.key,
          }"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['movies', 'tv-shows'].includes(value),
  },
  loading: {
    type: Boolean,
    default: false,
  },
  active: {
    type: String,
    default: 'popular',
    validator: (value) => ['popular', 'top-rated', 'upcoming'].includes(value),
  },
})

const emit = defineEmits(['tab-change'])

const tabs = computed(() => {
  const base = [
    { key: 'popular', label: 'Popüler' },
    { key: 'top-rated', label: 'En Yüksek Puanlı' },
  ]
  if (props.type === 'movies') {
    base.push({ key: 'upcoming', label: 'Yakında' })
  }
  return base
})

const selectTab = (tabKey) => {
  emit('tab-change', tabKey)
}
</script>
