import axios from 'axios'
import MoviesGrid from './MoviesGrid'

interface MovieSummary {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

async function fetchPopular(): Promise<MovieSummary[]> {
  const apiKey = process.env.OMDB_API_KEY || 'f1def80d'
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=marvel`
  const res = await axios.get(url)
  if (res.data && res.data.Search) return res.data.Search as MovieSummary[]
  return []
}

export default async function HomePage() {
  const movies = await fetchPopular()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100">
      <div className="max-w-6xl mx-auto p-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-800 mb-4">🎬 Galería de Películas</h1>
          <p className="text-xl text-slate-600 mb-6">Películas populares de Marvel</p>
          
        </div>

        {/* Grid de películas con funcionalidad de modal */}
        <MoviesGrid movies={movies} />
       
      </div>
    </div>
  )
}

