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

const handleSearch = (payload) => {
  if (typeof payload === 'object' && payload !== null) {
    const q = (payload.query || '').toString()
    if (payload.mediaType === 'tv') {
      router.push({ path: '/tv-shows', query: { search: q } })
      return
    }
    if (payload.mediaType === 'movie') {
      router.push({ path: '/movies', query: { search: q } })
      return
    }
    router.push({ path: '/search', query: { search: q } })
    return
  }
  const q = (payload || '').toString()
  router.push({ path: '/search', query: { search: q } })
}

const handleTrendingClick = (payload) => {
  if (payload?.type === 'tv') {
    router.push('/tv-shows')
  } else {
    router.push('/movies')
  }
}
</script>
