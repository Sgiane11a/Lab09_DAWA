import ClientSearch from './ClientSearch'

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">🔎 Búsqueda (CSR)</h1>
        <ClientSearch />
      </div>
    </div>
  )
}
