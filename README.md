# 🎬 Galería de Películas y Series - Lab09

Una aplicación completa que demuestra las diferencias entre **Server-Side Rendering (SSR)** y **Client-Side Rendering (CSR)** usando Next.js y la API de OMDb.

## 🚀 Funcionalidades

### ✅ Página Principal (SSR)
- **URL**: `/`
- **Tecnología**: Server-Side Rendering con `async/await`
- **Contenido**: Lista de películas populares de Marvel
- **Características**:
  - Renderizado completo en el servidor
  - Datos pre-cargados antes del envío del HTML
  - SEO optimizado
  - Carga inicial rápida

### ✅ Búsqueda Interactiva (CSR)
- **URL**: `/search`
- **Tecnología**: Client-Side Rendering con React Hooks
- **Características**:
  - Búsqueda en tiempo real con debounce (400ms)
  - Resultados sin recargar la página
  - Interfaz completamente interactiva
  - Usa `useState`, `useEffect` y `useRef`

### ✅ Modal de Detalles
- **Funcionalidad**: Ventana modal con información completa
- **Datos mostrados**:
  - Poster, título, año, género, duración
  - Sinopsis completa
  - Director, escritores, actores principales
  - Calificaciones (IMDb, Rotten Tomatoes, Metacritic)
  - Premios y reconocimientos
  - Fecha de estreno, idioma, país
  - Taquilla (si disponible)

## 🛠 Tecnologías Utilizadas

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático para mejor desarrollo
- **Tailwind CSS** - Framework CSS utility-first
- **Axios** - Cliente HTTP para peticiones a la API
- **OMDb API** - Base de datos de películas y series

## 📋 Criterios Técnicos Cumplidos

### ✅ Uso correcto de 'use client' directive
- `app/search/ClientSearch.tsx` - Componente cliente para búsqueda interactiva
- `app/search/MovieDetailModal.tsx` - Modal cliente para detalles

### ✅ Uso de async/await
- `app/page.tsx` - Función `fetchPopular()` con async/await en servidor
- `app/search/ClientSearch.tsx` - Peticiones asíncronas en useEffect
- `app/search/MovieDetailModal.tsx` - Carga de detalles asíncrona

### ✅ UI atractiva con Tailwind CSS
- Gradientes y transiciones suaves
- Cards con hover effects y sombras
- Modal responsive con backdrop blur
- Grid layout responsive
- Componentes con estados de loading
- Sistema de colores consistente

### ✅ Manejo de hooks useState y useEffect
- **useState**: 
  - `query` - Estado de búsqueda
  - `results` - Resultados de búsqueda
  - `loading` - Estados de carga
  - `selected` - Película seleccionada para modal
  - `detail` - Detalles de la película en modal

- **useEffect**: 
  - Búsqueda con debounce en ClientSearch
  - Carga de detalles en MovieDetailModal
  - Cleanup de timeouts

## 🎯 Justificación SSR vs CSR

### 🟢 Server-Side Rendering (Página Principal)

**¿Por qué SSR?**
1. **SEO Optimizado**: Los motores de búsqueda pueden indexar el contenido inmediatamente
2. **Carga Inicial Rápida**: El HTML llega completo al navegador
3. **Mejor Performance**: Especialmente en dispositivos lentos o conexiones pobres
4. **Contenido Estático**: Las películas populares no cambian frecuentemente
5. **First Contentful Paint**: El usuario ve contenido inmediatamente

**Implementación**:
```typescript
// Server Component - se ejecuta en el servidor
async function fetchPopular(): Promise<MovieSummary[]> {
  const apiKey = process.env.OMDB_API_KEY || 'f1def80d'
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=marvel`
  const res = await axios.get(url)
  return res.data.Search || []
}

export default async function HomePage() {
  const movies = await fetchPopular() // Datos pre-cargados
  return <div>{/* HTML renderizado en servidor */}</div>
}
```

### 🟡 Client-Side Rendering (Búsqueda)

**¿Por qué CSR?**
1. **Interactividad Total**: Búsqueda en tiempo real sin recargas
2. **Experiencia Fluida**: Transiciones suaves entre estados
3. **Menos Carga del Servidor**: Las búsquedas se manejan en el cliente
4. **Personalización**: Cada usuario tiene su propia experiencia de búsqueda
5. **Estado Dinámico**: Manejo complejo de estados (query, results, loading, selected)

**Implementación**:
```typescript
'use client' // Directiva que marca el componente como cliente

export default function ClientSearch() {
  const [query, setQuery] = useState('') // Estado de búsqueda
  const [results, setResults] = useState<MovieSummary[]>([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    // Debounce para evitar demasiadas peticiones
    const debounceTimer = setTimeout(async () => {
      if (query) {
        setLoading(true)
        const res = await axios.get(apiUrl)
        setResults(res.data.Search || [])
        setLoading(false)
      }
    }, 400)
    
    return () => clearTimeout(debounceTimer) // Cleanup
  }, [query])
}
```

## 🚀 Instalación y Uso

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Abrir en navegador
http://localhost:3000
```

### 🔑 API Key
El proyecto usa una API key de ejemplo. Para uso en producción:
1. Visita: https://www.omdbapi.com/apikey.aspx
2. Crea una cuenta gratuita (1000 requests/día)
3. Reemplaza `f1def80d` por tu API key en el código

## 📁 Estructura de Archivos

```
project09/
├── app/
│   ├── layout.tsx          # Layout principal con navegación
│   ├── page.tsx           # 🟢 Página principal (SSR)
│   ├── search/
│   │   ├── page.tsx       # Wrapper para componente CSR
│   │   ├── ClientSearch.tsx    # 🟡 Búsqueda (CSR)
│   │   └── MovieDetailModal.tsx # 🟡 Modal detalles (CSR)
│   └── globals.css
├── public/
│   └── poster-placeholder.svg  # Placeholder para posters
└── package.json
```

---

**Desarrollado como parte del Lab09 - Comparación SSR vs CSR**
