# Insider Frontend Internship Project

A modern Nuxt 3 movie and TV show discovery application with TMDB API integration.

## Features

- 🎬 **Movies**: Popular, Top Rated, Upcoming
- 📺 **TV Shows**: Popular, Top Rated (on-the-air mapped for upcoming)
- 🔎 **Search**: Movies and TV; query-aware navigation
- 🧮 **Filter & Sort**: Year range, min votes; sort by rating, votes, date, title
- ⭐ **Favorites**: Local storage with quick toggle on posters
- 📱 **Responsive UI**: Mobile hamburger menu + desktop hover popovers
- 🎨 **Tailwind UI**: Glass effects and modern layout

## Tech Stack

- **Nuxt 3** (Vue 3, Nitro)
- **Tailwind CSS**
- **Pinia** (state management)
- **TMDB API**

## API Configuration

The app uses TMDB API for movie and TV show data. The API key is configured in `nuxt3/app/services/tmdb.js`.

## Project Structure

```
nuxt3/
├── app/
│   ├── components/           # UI components (MoviePoster, FilterSortBar, ...)
│   ├── layouts/              # Default layout (navbar + popovers + mobile menu)
│   ├── pages/                # Pages (movies, tv, search, favorites, index)
│   ├── services/             # TMDB service
│   ├── stores/               # Pinia stores (favorites)
│   └── assets/css/main.css   # Tailwind entry
├── public/                   # Static assets (icons, images)
└── nuxt.config.ts            # Nuxt configuration
```

Notes:

- Active app lives under `nuxt3/`. The legacy Vite app under `src/` is kept for reference.
