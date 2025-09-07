<template>
  <div class="min-h-screen bg-gray-900">
    <nav class="bg-gray-800 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <router-link to="/" class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-lg">F</span>
              </div>
              <span class="text-white text-xl font-bold">FexV1</span>
            </router-link>
          </div>
          <div class="flex items-center space-x-8">
            <router-link
              to="/movies"
              class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              :class="{ 'text-white bg-gray-700': $route.path === '/movies' }"
            >
              Filmler
            </router-link>
            <router-link
              to="/tv-shows"
              class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              :class="{ 'text-white bg-gray-700': $route.path === '/tv-shows' }"
            >
              Diziler
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <router-view />
    </main>
    <footer class="bg-gray-800 mt-auto">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="text-center text-gray-400 text-sm">
          <p>&copy; 2024 FexV1. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
defineOptions({ name: 'AppLayout' })
</script>
