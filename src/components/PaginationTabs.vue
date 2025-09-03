<template>
  <div class="bg-gray-800 rounded-lg p-4 mb-6">
    <div class="flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div class="flex space-x-1 bg-gray-700 rounded-lg p-1">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="selectTab(tab.key)"
          class="px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200"
          :class="{
            'bg-red-600 text-white': activeTab === tab.key,
            'text-gray-300 hover:text-white hover:bg-gray-600': activeTab !== tab.key,
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
import { ref, watch } from 'vue'

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
})

const emit = defineEmits(['tab-change'])

const activeTab = ref('popular')

const tabs = ref([
  { key: 'popular', label: 'Popular' },
  { key: 'top-rated', label: 'Top Rated' },
])

const selectTab = (tabKey) => {
  activeTab.value = tabKey
  emit('tab-change', tabKey)
}

watch(
  () => props.type,
  () => {
    activeTab.value = 'popular'
  },
)
</script>
