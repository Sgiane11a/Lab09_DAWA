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
        
        {/* Info adicional */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">📊 ¿Por qué SSR aquí?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🚀</div>
              <h4 className="font-semibold text-slate-800 mb-2">Carga Rápida</h4>
              <p className="text-sm text-slate-600">El contenido está listo al cargar la página, sin esperas</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🔍</div>
              <h4 className="font-semibold text-slate-800 mb-2">SEO Optimizado</h4>
              <p className="text-sm text-slate-600">Los motores de búsqueda pueden indexar el contenido fácilmente</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📱</div>
              <h4 className="font-semibold text-slate-800 mb-2">Mejor UX</h4>
              <p className="text-sm text-slate-600">Funciona perfecto en conexiones lentas y dispositivos antiguos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

