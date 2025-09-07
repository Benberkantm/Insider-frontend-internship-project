import { defineStore } from 'pinia'
import tmdbService from '../services/tmdb.js'

const STORAGE_KEY = 'app_favorites_v1'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function saveToStorage(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (err) {
    if (import.meta.env.DEV) console.warn('Failed to persist favorites to storage', err)
  }
}

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    byKey: loadFromStorage(),
  }),
  getters: {
    favoritesList: (state) => Object.values(state.byKey),
    isFavorite: (state) => {
      return (id, type = 'movie') => Boolean(state.byKey[`${type}:${id}`])
    },
  },
  actions: {
    addFavorite(payload) {
      const {
        id,
        type = 'movie',
        title = '',
        posterPath = null,
        releaseDate = null,
        rating = 0,
        voteCount = 0,
      } = payload || {}
      const key = `${type}:${id}`
      if (!id || this.byKey[key]) return
      this.byKey = {
        ...this.byKey,
        [key]: { id, type, title, posterPath, releaseDate, rating, voteCount },
      }
      saveToStorage(this.byKey)
    },
    removeFavorite(id, type = 'movie') {
      const key = `${type}:${id}`
      if (!this.byKey[key]) return
      const copy = { ...this.byKey }
      delete copy[key]
      this.byKey = copy
      saveToStorage(this.byKey)
    },
    toggleFavorite(payload) {
      const { id, type = 'movie' } = payload || {}
      if (this.isFavorite(id, type)) {
        this.removeFavorite(id, type)
      } else {
        this.addFavorite(payload)
      }
    },
    async hydrateMissingDetails() {
      const entries = Object.values(this.byKey)
      for (const item of entries) {
        const needsHydration = !item || item.rating === 0 || !item.releaseDate || !item.voteCount
        if (!needsHydration) continue
        try {
          const details =
            item.type === 'tv'
              ? await tmdbService.getTVShowDetails(item.id)
              : await tmdbService.getMovieDetails(item.id)

          const rating = Number(details?.vote_average) || item.rating || 0
          const voteCount = Number(details?.vote_count) || item.voteCount || 0
          const releaseDate =
            details?.release_date || details?.first_air_date || item.releaseDate || null
          const posterPath = item.posterPath || details?.poster_path || null

          const key = `${item.type}:${item.id}`
          this.byKey = {
            ...this.byKey,
            [key]: {
              ...this.byKey[key],
              rating,
              voteCount,
              releaseDate,
              posterPath,
            },
          }
        } catch (err) {
          if (import.meta.env.DEV)
            console.warn('Failed to hydrate favorite item', { id: item?.id, type: item?.type }, err)
        }
      }
      saveToStorage(this.byKey)
    },
  },
})
