<template>
  <div class="min-h-screen text-white relative">
    <div
      class="fixed inset-0 -z-10 bg-[url('https://hdqwalls.com/download/stranger-things-season-3-2019-4k-5k-38-1920x1080.jpg')] bg-cover bg-center"
    ></div>

    <nav class="sticky top-0 z-50 glass-panel">
      <div class="section-wrap">
        <div
          class="flex flex-col sm:flex-row items-center sm:justify-between gap-2 sm:gap-0 sm:h-20 md:h-24 py-3 sm:py-0"
        >
          <NuxtLink to="/" class="flex items-center space-x-2">
            <div
              class="w-10 h-10 md:w-12 md:h-12 bg-red-600 rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-lg">F</span>
            </div>
            <span class="text-white text-xl font-bold">FexV1</span>
          </NuxtLink>
          <button
            class="sm:hidden p-2 rounded-lg bg-black/40 hover:bg-black/50 transition-colors"
            id="mobile-toggle"
            @click.stop="mobileOpen = !mobileOpen"
            :aria-expanded="mobileOpen ? 'true' : 'false'"
            aria-controls="mobile-nav"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <ul
            class="hidden sm:inline-flex rounded-[25px] items-center justify-center w-full sm:w-auto glass-chip gap-1 flex-nowrap max-w-full"
          >
            <li class="relative shrink-0 group">
              <NuxtLink
                to="/movies/popular"
                class="nav-link"
                :class="{ 'nav-link--active': $route.path.startsWith('/movies') }"
              >
                Filmler
              </NuxtLink>
              <div class="absolute left-0 top-full z-50 pt-2">
                <div
                  class="bg-black/80 backdrop-blur-md rounded-lg p-2 min-w-[220px] shadow-xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible hover:opacity-100 hover:visible transition-opacity duration-150"
                >
                  <NuxtLink
                    to="/movies/popular"
                    class="block px-4 py-2 hover:bg-white/10 rounded-md"
                    >Popular</NuxtLink
                  >
                  <NuxtLink
                    to="/movies/upcoming"
                    class="block px-4 py-2 hover:bg-white/10 rounded-md"
                    >Upcoming</NuxtLink
                  >
                  <NuxtLink
                    to="/movies/top-rated"
                    class="block px-4 py-2 hover:bg-white/10 rounded-md"
                    >Top Rated</NuxtLink
                  >
                </div>
              </div>
            </li>
            <li class="relative shrink-0 group">
              <NuxtLink
                to="/tv/popular"
                class="nav-link"
                :class="{ 'nav-link--active': $route.path.startsWith('/tv') }"
              >
                Diziler
              </NuxtLink>
              <div class="absolute left-0 top-full z-50 pt-2">
                <div
                  class="bg-black/80 backdrop-blur-md rounded-lg p-2 min-w-[220px] shadow-xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible hover:opacity-100 hover:visible transition-opacity duration-150"
                >
                  <NuxtLink to="/tv/popular" class="block px-4 py-2 hover:bg-white/10 rounded-md"
                    >Popular</NuxtLink
                  >
                  <NuxtLink to="/tv/upcoming" class="block px-4 py-2 hover:bg-white/10 rounded-md"
                    >Upcoming</NuxtLink
                  >
                  <NuxtLink to="/tv/top-rated" class="block px-4 py-2 hover:bg-white/10 rounded-md"
                    >Top Rated</NuxtLink
                  >
                </div>
              </div>
            </li>
            <li class="shrink-0">
              <NuxtLink
                to="/favorites"
                class="nav-link"
                :class="{ 'nav-link--active': $route.path === '/favorites' }"
              >
                Favoriler
              </NuxtLink>
            </li>
          </ul>
          <div v-show="mobileOpen" id="mobile-nav" class="sm:hidden w-full mt-3">
            <div class="bg-black/80 backdrop-blur-md rounded-lg p-2 border border-white/10">
              <button
                class="w-full flex items-center justify-between px-4 py-2 rounded-md hover:bg-white/10"
                @click="mobileMoviesOpen = !mobileMoviesOpen"
                :aria-expanded="mobileMoviesOpen ? 'true' : 'false'"
              >
                <span>Filmler</span>
                <span>›</span>
              </button>
              <div v-show="mobileMoviesOpen" class="mt-1 space-y-1">
                <NuxtLink to="/movies/popular" class="block px-6 py-2 rounded-md hover:bg-white/10"
                  >Popular</NuxtLink
                >
                <NuxtLink to="/movies/upcoming" class="block px-6 py-2 rounded-md hover:bg-white/10"
                  >Upcoming</NuxtLink
                >
                <NuxtLink
                  to="/movies/top-rated"
                  class="block px-6 py-2 rounded-md hover:bg-white/10"
                  >Top Rated</NuxtLink
                >
              </div>

              <button
                class="w-full mt-2 flex items-center justify-between px-4 py-2 rounded-md hover:bg-white/10"
                @click="mobileTvOpen = !mobileTvOpen"
                :aria-expanded="mobileTvOpen ? 'true' : 'false'"
              >
                <span>Diziler</span>
                <span>›</span>
              </button>
              <div v-show="mobileTvOpen" class="mt-1 space-y-1">
                <NuxtLink to="/tv/popular" class="block px-6 py-2 rounded-md hover:bg-white/10"
                  >Popular</NuxtLink
                >
                <NuxtLink to="/tv/upcoming" class="block px-6 py-2 rounded-md hover:bg-white/10"
                  >Upcoming</NuxtLink
                >
                <NuxtLink to="/tv/top-rated" class="block px-6 py-2 rounded-md hover:bg-white/10"
                  >Top Rated</NuxtLink
                >
              </div>
              <NuxtLink to="/favorites" class="block mt-2 px-4 py-2 rounded-md hover:bg-white/10"
                >Favoriler</NuxtLink
              >
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <slot />
    </main>
    <footer class="mt-auto bg-black/35 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="text-center text-white-200 text-sm">
          <p>&copy; 2025 FexV1. All rights reserved.</p>
          <p>Go visit www.sbms.blog for more info.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const mobileOpen = ref(false)
const mobileMoviesOpen = ref(false)
const mobileTvOpen = ref(false)

const handleKey = (e) => {
  if (e.key === 'Escape') {
    mobileOpen.value = false
    mobileMoviesOpen.value = false
    mobileTvOpen.value = false
  }
}

const handleClickOutside = (e) => {
  const nav = document.getElementById('mobile-nav')
  const toggle = document.getElementById('mobile-toggle')
  if (mobileOpen.value && nav && !nav.contains(e.target) && toggle && !toggle.contains(e.target)) {
    mobileOpen.value = false
    mobileMoviesOpen.value = false
    mobileTvOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKey)
  window.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKey)
  window.removeEventListener('click', handleClickOutside)
})
</script>
