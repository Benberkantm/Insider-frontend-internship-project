const API_KEY = '348088421ad3fb3a9d6e56bb6a9a8f80'
const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

class TMDBService {
  constructor() {
    this.apiKey = API_KEY
    this.baseUrl = BASE_URL
    this.imageBaseUrl = IMAGE_BASE_URL
  }

  async makeRequest(endpoint, params = {}, options = {}) {
    const url = new URL(`${this.baseUrl}${endpoint}`)
    url.searchParams.append('api_key', this.apiKey)

    Object.keys(params).forEach((key) => {
      if (params[key] !== null && params[key] !== undefined) {
        url.searchParams.append(key, params[key])
      }
    })

    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('TMDB API Error:', error)
      throw error
    }
  }

  async getPopularMovies(page = 1) {
    return this.makeRequest('/movie/popular', { page })
  }

  async getTopRatedMovies(page = 1) {
    return this.makeRequest('/movie/top_rated', { page })
  }

  async getUpcomingMovies(page = 1) {
    return this.makeRequest('/movie/upcoming', { page })
  }

  async searchMovies(query, page = 1, options = {}) {
    return this.makeRequest('/search/movie', { query, page }, options)
  }

  async searchMulti(query, page = 1, options = {}) {
    return this.makeRequest('/search/multi', { query, page }, options)
  }

  async getMovieDetails(movieId) {
    return this.makeRequest(`/movie/${movieId}`)
  }

  async getMovieCredits(movieId) {
    return this.makeRequest(`/movie/${movieId}/credits`)
  }

  async getPopularTVShows(page = 1) {
    return this.makeRequest('/tv/popular', { page })
  }

  async getTopRatedTVShows(page = 1) {
    return this.makeRequest('/tv/top_rated', { page })
  }

  async getUpcomingTVShows(page = 1) {
    return this.makeRequest('/tv/on_the_air', { page })
  }

  async getTrending(type = 'all', timeWindow = 'day', page = 1) {
    return this.makeRequest(`/trending/${type}/${timeWindow}`, { page })
  }

  async discoverMovies(options = {}) {
    const { sortKey = 'rating_desc', minYear, maxYear, minVotes, page = 1 } = options

    const sortMap = {
      rating_desc: 'vote_average.desc',
      rating_asc: 'vote_average.asc',
      votes_desc: 'vote_count.desc',
      votes_asc: 'vote_count.asc',
      date_desc: 'primary_release_date.desc',
      date_asc: 'primary_release_date.asc',
      title_asc: 'original_title.asc',
    }

    const params = {
      sort_by: sortMap[sortKey] || sortMap.rating_desc,
      include_adult: false,
      page,
    }
    if (minYear) params['primary_release_date.gte'] = `${minYear}-01-01`
    if (maxYear) params['primary_release_date.lte'] = `${maxYear}-12-31`
    if (minVotes) params['vote_count.gte'] = minVotes

    return this.makeRequest('/discover/movie', params)
  }

  async discoverTV(options = {}) {
    const { sortKey = 'rating_desc', minYear, maxYear, minVotes, page = 1 } = options

    const sortMap = {
      rating_desc: 'vote_average.desc',
      rating_asc: 'vote_average.asc',
      votes_desc: 'vote_count.desc',
      votes_asc: 'vote_count.asc',
      date_desc: 'first_air_date.desc',
      date_asc: 'first_air_date.asc',
      title_asc: 'name.asc',
    }

    const params = {
      sort_by: sortMap[sortKey] || sortMap.rating_desc,
      include_adult: false,
      page,
    }
    if (minYear) params['first_air_date.gte'] = `${minYear}-01-01`
    if (maxYear) params['first_air_date.lte'] = `${maxYear}-12-31`
    if (minVotes) params['vote_count.gte'] = minVotes

    return this.makeRequest('/discover/tv', params)
  }

  async searchTVShows(query, page = 1, options = {}) {
    return this.makeRequest('/search/tv', { query, page }, options)
  }

  async getTVShowDetails(tvId) {
    return this.makeRequest(`/tv/${tvId}`)
  }

  async getTVShowCredits(tvId) {
    return this.makeRequest(`/tv/${tvId}/credits`)
  }

  getImageUrl(path, size = 'w500') {
    if (!path) return null
    return `${this.imageBaseUrl}/${size}${path}`
  }

  getBackdropUrl(path, size = 'w1280') {
    if (!path) return null
    return `${this.imageBaseUrl}/${size}${path}`
  }

  getPosterUrl(path, size = 'w500') {
    if (!path) return null
    return `${this.imageBaseUrl}/${size}${path}`
  }
}

export default new TMDBService()
