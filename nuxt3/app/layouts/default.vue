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
          <ul
            class="rounded-[25px] inline-flex items-center justify-center w-full sm:w-auto glass-chip gap-1 flex-nowrap max-w-full"
          >
            <li class="shrink-0">
              <NuxtLink
                to="/movies"
                class="nav-link"
                :class="{ 'nav-link--active': $route.path === '/movies' }"
              >
                Filmler
              </NuxtLink>
            </li>
            <li class="shrink-0">
              <NuxtLink
                to="/tv-shows"
                class="nav-link"
                :class="{ 'nav-link--active': $route.path === '/tv-shows' }"
              >
                Diziler
              </NuxtLink>
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
