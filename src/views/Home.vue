<template>
  <div>
    <SearchInput
      title="Welcome to FexV1"
      subtitle="Discover amazing movies and TV shows"
      placeholder="Search for movies and TV shows..."
      @search="handleSearch"
    />
    <div class="max-w-4xl mx-auto mt-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <router-link
          to="/movies"
          class="group bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200"
        >
          <div class="text-center">
            <div
              class="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500 transition-colors duration-200"
            >
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"
                ></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Movies</h3>
            <p class="text-gray-400">Browse our collection of movies</p>
          </div>
        </router-link>

        <router-link
          to="/tv-shows"
          class="group bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200"
        >
          <div class="text-center">
            <div
              class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 transition-colors duration-200"
            >
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">TV Shows</h3>
            <p class="text-gray-400">Explore popular TV series</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import SearchInput from '../components/SearchInput.vue'

const router = useRouter()

const handleSearch = (query) => {
  router.push({ path: '/movies', query: { search: query } })
}
</script>
