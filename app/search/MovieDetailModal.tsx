"use client"

import { useEffect, useState } from 'react'
import axios from 'axios'

interface MovieDetail {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Array<{ Source: string; Value: string }>
  imdbRating: string
  imdbVotes: string
  BoxOffice?: string
  Production?: string
  Website?: string
}

export default function MovieDetailModal({ imdbID, onClose }: { imdbID: string; onClose: () => void }) {
  const [detail, setDetail] = useState<MovieDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true)
      try {
        const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY || 'f1def80d'
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`
        const res = await axios.get(url)
        if (res.data) setDetail(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDetail()
  }, [imdbID])

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
            <span className="ml-4 text-slate-600">Cargando detalles...</span>
          </div>
        ) : detail ? (
          <div>
            {/* Header con botón cerrar */}
            <div className="sticky top-0 bg-white/95 backdrop-blur p-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">{detail.Title}</h2>
              <button 
                onClick={onClose} 
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Contenido principal */}
            <div className="p-6">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Poster */}
                <div className="lg:col-span-1">
                  <img 
                    src={detail.Poster !== 'N/A' ? detail.Poster : '/poster-placeholder.svg'} 
                    alt={detail.Title}
                    className="w-full rounded-xl shadow-lg" 
                  />
                  
                  {/* Ratings */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">⭐</span>
                      <span className="font-semibold text-lg">{detail.imdbRating}/10</span>
                      <span className="text-sm text-slate-500">({detail.imdbVotes} votos)</span>
                    </div>
                    {detail.Ratings && detail.Ratings.length > 0 && (
                      <div className="space-y-1">
                        {detail.Ratings.slice(0, 3).map((rating, idx) => (
                          <div key={idx} className="text-sm">
                            <span className="font-medium">{rating.Source}:</span> {rating.Value}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Información detallada */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">{detail.Title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{detail.Year}</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">{detail.Rated}</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">{detail.Runtime}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {detail.Genre.split(', ').map((genre, idx) => (
                        <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-sm">{genre}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Sinopsis</h4>
                    <p className="text-slate-700 leading-relaxed">{detail.Plot}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-semibold text-slate-800">Director</h5>
                        <p className="text-slate-600">{detail.Director}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-800">Escritores</h5>
                        <p className="text-slate-600">{detail.Writer}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-800">Actores principales</h5>
                        <p className="text-slate-600">{detail.Actors}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h5 className="font-semibold text-slate-800">Fecha de estreno</h5>
                        <p className="text-slate-600">{detail.Released}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-800">Idioma</h5>
                        <p className="text-slate-600">{detail.Language}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-800">País</h5>
                        <p className="text-slate-600">{detail.Country}</p>
                      </div>
                      {detail.BoxOffice && (
                        <div>
                          <h5 className="font-semibold text-slate-800">Taquilla</h5>
                          <p className="text-slate-600">{detail.BoxOffice}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {detail.Awards !== 'N/A' && (
                    <div>
                      <h5 className="font-semibold text-slate-800 mb-2">Premios y reconocimientos</h5>
                      <p className="text-slate-600 bg-yellow-50 p-3 rounded-lg border border-yellow-200">{detail.Awards}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-slate-400 text-6xl mb-4">🎬</div>
            <p className="text-slate-600">No se encontraron detalles para esta película.</p>
            <button 
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
