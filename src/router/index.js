import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '../components/AppLayout.vue'
import Home from '../views/Home.vue'
import Movies from '../views/Movies.vue'
import TVShows from '../views/TVShows.vue'

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
      ],
    },
  ],
})

export default router
