<template>
  <div class="glass-panel p-3 sm:p-4 mb-6">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label class="block text-sm text-gray-300 mb-1">Sırala</label>
        <select v-model="sortKey" class="w-full bg-black/40 text-white px-3 py-2 rounded-lg pr-9">
          <option value="rating_desc">Puan ↓</option>
          <option value="rating_asc">Puan ↑</option>
          <option value="votes_desc">Oy ↓</option>
          <option value="votes_asc">Oy ↑</option>
          <option value="date_desc">Tarih ↓</option>
          <option value="date_asc">Tarih ↑</option>
          <option value="title_asc">Başlık A→Z</option>
        </select>
      </div>
      <div>
        <label class="block text-sm text-gray-300 mb-1">En Erken Yıl</label>
        <input
          v-model.number="minYear"
          type="number"
          class="w-full bg-black/40 text-white px-3 py-2 rounded-lg no-spin"
          @wheel.prevent
        />
      </div>
      <div>
        <label class="block text-sm text-gray-300 mb-1">En Geç Yıl</label>
        <input
          v-model.number="maxYear"
          type="number"
          class="w-full bg-black/40 text-white px-3 py-2 rounded-lg no-spin"
          @wheel.prevent
        />
      </div>
      <div>
        <label class="block text-sm text-gray-300 mb-1">En Az Oy</label>
        <input
          v-model.number="minVotes"
          type="number"
          class="w-full bg-black/40 text-white px-3 py-2 rounded-lg no-spin"
          @wheel.prevent
        />
      </div>
    </div>
    <div class="mt-4 flex gap-3">
      <button
        @click="emitChange"
        class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
      >
        Uygula
      </button>
      <button @click="reset" class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
        Sıfırla
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['change'])

const sortKey = ref('rating_desc')
const minYear = ref(undefined)
const maxYear = ref(undefined)
const minVotes = ref(undefined)

const emitChange = () => {
  emit('change', {
    sortKey: sortKey.value,
    minYear: minYear.value,
    maxYear: maxYear.value,
    minVotes: minVotes.value,
  })
}

const reset = () => {
  sortKey.value = 'rating_desc'
  minYear.value = undefined
  maxYear.value = undefined
  minVotes.value = undefined
  emitChange()
}
</script>

<style scoped>
.no-spin::-webkit-outer-spin-button,
.no-spin::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.no-spin[type='number'] {
  -moz-appearance: textfield;
}
</style>
