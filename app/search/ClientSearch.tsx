"use client"

import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Image from 'next/image'
import MovieDetailModal from './MovieDetailModal'

interface MovieSummary {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export default function ClientSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<MovieSummary[]>([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)

  const debounceRef = useRef<number | null>(null)

  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }

    setLoading(true)
    if (debounceRef.current) window.clearTimeout(debounceRef.current)
    debounceRef.current = window.setTimeout(async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY || 'f1def80d'
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`
        const res = await axios.get(url)
        if (res.data && res.data.Search) setResults(res.data.Search)
        else setResults([])
      } catch (err) {
        console.error(err)
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 400)

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current)
    }
  }, [query])

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Buscador */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-slate-100">
          <label className="block text-lg font-semibold text-slate-800 mb-3">🔍 Buscar películas o series</label>
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ej. Batman, Suits, The Office, Marvel..."
              className="w-full p-4 pr-12 rounded-xl border-2 border-slate-200 focus:border-blue-400 focus:outline-none text-lg"
            />
            {loading && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
        </div>

        {/* Resultados */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-100 overflow-hidden">
          {!query ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎬</div>
              <p className="text-slate-500">Escribe algo para buscar películas y series</p>
            </div>
          ) : loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500 mx-auto mb-4"></div>
              <p className="text-slate-600">Buscando contenido...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">😔</div>
              <p className="text-slate-500">No se encontraron resultados para &quot;{query}&quot;</p>
              <p className="text-sm text-slate-400 mt-2">Intenta con otro término de búsqueda</p>
            </div>
          ) : (
            <div>
              <div className="bg-slate-50 px-6 py-3 border-b">
                <p className="text-sm text-slate-600">Se encontraron {results.length} resultado{results.length !== 1 ? 's' : ''}</p>
              </div>
              <div className="p-6">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                  {results.map((r) => (
                    <div key={r.imdbID} className="flex gap-4 p-4 border-2 border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer group">
                      <div className="w-24 h-36 relative rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                        <Image
                          src={r.Poster !== 'N/A' ? r.Poster : '/poster-placeholder.svg'}
                          alt={r.Title}
                          fill
                          sizes="(max-width: 768px) 96px, 150px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-700 transition-colors">{r.Title}</h3>
                        <div className="flex gap-2 mt-1 mb-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">{r.Year}</span>
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full capitalize">{r.Type}</span>
                        </div>
                        <button 
                          onClick={() => setSelected(r.imdbID)} 
                          className="w-full mt-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          Ver detalles completos →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {selected && (
        <MovieDetailModal imdbID={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}
