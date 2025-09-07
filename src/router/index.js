import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../components/AppLayout.vue'
import Home from '../views/Home.vue'
import Movies from '../views/Movies.vue'
import TVShows from '../views/TVShows.vue'
import SearchResults from '../views/SearchResults.vue'
import Favorites from '../views/Favorites.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '',
          name: 'Home',
          component: Home,
        },
        {
          path: 'movies',
          name: 'Movies',
          component: Movies,
        },
        {
          path: 'tv-shows',
          name: 'TVShows',
          component: TVShows,
        },
        {
          path: 'search',
          name: 'SearchResults',
          component: SearchResults,
        },
        {
          path: 'favorites',
          name: 'Favorites',
          component: Favorites,
        },
      ],
    },
  ],
})

export default router
