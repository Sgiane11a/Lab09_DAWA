"use client"

import { useState } from 'react'
import MovieDetailModal from './search/MovieDetailModal'

interface MovieSummary {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

interface MoviesGridProps {
  movies: MovieSummary[]
}

export default function MoviesGrid({ movies }: MoviesGridProps) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <>
      {/* Grid de películas */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie, index) => (
          <article key={movie.imdbID} className="group">
            <div 
              className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
              onClick={() => setSelected(movie.imdbID)}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={movie.Poster !== 'N/A' ? movie.Poster : '/poster-placeholder.svg'} 
                  alt={movie.Title} 
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-lg text-sm font-medium">
                  #{index + 1}
                </div>
              </div>
              <div className="p-5">
                <h2 className="font-bold text-xl text-slate-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {movie.Title}
                </h2>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                    {movie.Year}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium capitalize">
                    {movie.Type}
                  </span>
                </div>
                <div className="flex items-center text-sm text-slate-500">
                  <span>🎭 Renderizado en servidor</span>
                </div>
                <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Ver detalles →
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modal de detalles */}
      {selected && (
        <MovieDetailModal imdbID={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}