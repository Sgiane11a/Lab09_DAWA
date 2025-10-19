# 🚀 Guía de Despliegue en Render.com

## 📋 Pre-requisitos

1. ✅ Cuenta en [Render.com](https://render.com)
2. ✅ Repositorio de GitHub con el código
3. ✅ API Key de OMDb (opcional, hay una de ejemplo)

## 🎯 Pasos para Desplegar

### 1. **Preparar el Repositorio**
```bash
git add .
git commit -m "Preparado para producción"
git push origin main
```

### 2. **Crear Web Service en Render**
1. Ve a [Render Dashboard](https://dashboard.render.com)
2. Click en "New +" → "Web Service"
3. Conecta tu repositorio de GitHub
4. Render detectará automáticamente `render.yaml`

### 3. **Configurar Variables (Opcional)**
Si quieres usar tu propia API key de OMDb:
- `OMDB_API_KEY`: Tu API key personal
- `NEXT_PUBLIC_OMDB_API_KEY`: La misma API key

### 4. **Desplegar**
- Click "Create Web Service"
- Render comenzará el build automáticamente
- ⏱️ Tiempo estimado: 3-5 minutos

## 🌐 URLs de Ejemplo

Una vez desplegado, tendrás URLs como:
- `https://tu-app.onrender.com` → Página principal (SSR)
- `https://tu-app.onrender.com/search` → Búsqueda (CSR)

## 🔧 Configuración Automática

El archivo `render.yaml` incluye:
- ✅ Build command optimizado
- ✅ Variables de entorno
- ✅ Headers de seguridad
- ✅ Health checks
- ✅ Plan gratuito

## 🐛 Solución de Problemas

### Build Fallido
```bash
# Probar build localmente
npm run build
```

### Variables de Entorno
- Verifica que `NEXT_PUBLIC_OMDB_API_KEY` esté configurada
- Las variables públicas deben tener prefijo `NEXT_PUBLIC_`

### Performance
- El plan gratuito tiene limitaciones
- La app puede "dormir" después de inactividad
- Primer request puede ser lento (cold start)

## 📊 Monitoreo

En Render Dashboard puedes ver:
- 📈 Logs en tiempo real
- 📊 Métricas de rendimiento  
- 🔄 Historial de despliegues
- ⚙️ Variables de entorno

## 🚀 Actualizaciones

Para actualizar la app:
```bash
git add .
git commit -m "Nueva funcionalidad"
git push origin main
```

Render redesplegarÃ¡ automáticamente.

---

¡Tu Galería de Películas estará lista en minutos! 🎬✨