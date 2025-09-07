<template>
  <div>
    <SearchInput
      title="Hoş Geldiniz!"
      subtitle="Keşfedilecek milyonlarca film, TV şovu ve kişi. Şimdi keşfedin."
      placeholder="Film, dizi veya kişi ara..."
      @search="handleSearch"
    />
    <div class="max-w-7xl mx-auto mt-10">
      <TrendingRow type="all" @item-click="handleTrendingClick" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import SearchInput from '../components/SearchInput.vue'
import TrendingRow from '../components/TrendingRow.vue'

defineOptions({
  name: 'HomeView',
})

const router = useRouter()

const handleSearch = (query) => {
  router.push({ path: '/movies', query: { search: query } })
}

const handleTrendingClick = (payload) => {
  if (payload?.type === 'tv') {
    router.push('/tv-shows')
  } else {
    router.push('/movies')
  }
}
</script>
