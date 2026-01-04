# 🇨🇴 COLOMBIA EXPLORER - CONTEXTO DEL PROYECTO

## 📋 INFORMACIÓN GENERAL

### ¿Qué es Colombia Explorer?
Colombia Explorer es una aplicación web moderna que permite explorar información interactiva sobre los departamentos de Colombia a través de un mapa interactivo. Los usuarios pueden:
- Ver un mapa de Colombia con todos sus departamentos
- Hacer clic en cualquier departamento para ver información resumida
- Ver detalles completos de cada departamento
- Obtener automáticamente información de su ubicación actual (si están en Colombia)
- Compartir información de departamentos

### Objetivo del Proyecto
Demostrar conocimientos en:
- React + TypeScript
- Arquitectura Limpia (Clean Architecture)
- Tailwind CSS
- Buenas prácticas de desarrollo
- Consumo de APIs públicas

### API Utilizada
- **API Colombia**: https://api-colombia.com/
- Endpoints principales:
  - `/Department` - Lista de departamentos
  - `/Department/{id}` - Detalle de un departamento específico
  - `/Region` - Lista de regiones
  - `/TouristicAttraction` - Atracciones turísticas

---

## 🏗️ ARQUITECTURA TÉCNICA

### Stack Tecnológico

```json
{
  "framework": "React 18",
  "language": "TypeScript 5",
  "styling": "Tailwind CSS 4",
  "bundler": "Vite 7",
  "routing": "React Router DOM 7",
  "stateManagement": "TanStack Query (React Query)",
  "httpClient": "Axios",
  "maps": "Leaflet + React-Leaflet",
  "geolocation": "@turf/turf (para detectar departamento del usuario)",
  "icons": "Lucide React"
}
```

### Arquitectura Clean Architecture

El proyecto sigue una arquitectura en capas:

```
src/
├── core/                    # 🎯 CAPA DE DOMINIO
│   ├── entities/            # Entidades del negocio
│   │   ├── Department.ts
│   │   ├── Region.ts
│   │   └── TouristicAttraction.ts
│   └── repositories/        # Interfaces (contratos)
│       └── ColombiaRepository.ts
│
├── infrastructure/          # 🔧 CAPA DE INFRAESTRUCTURA
│   ├── api/
│   │   └── axiosInstance.ts
│   └── repositories/        # Implementaciones
│       └── ColombiaRepositoryImpl.ts
│
├── presentation/            # 🎨 CAPA DE PRESENTACIÓN
│   ├── components/
│   │   ├── common/          # Componentes reutilizables
│   │   │   ├── Loading.tsx
│   │   │   ├── ErrorMessage.tsx
│   │   │   └── Modal.tsx
│   │   ├── layout/          # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MainLayout.tsx
│   │   └── features/        # Componentes por feature
│   │       └── departments/
│   │           ├── DepartmentMap.tsx
│   │           └── DepartmentBottomSheet.tsx
│   ├── hooks/               # Custom Hooks
│   │   ├── useDepartments.ts
│   │   ├── useGeolocation.ts
│   │   └── useUserDepartment.ts
│   └── pages/               # Páginas
│       ├── Home/
│       ├── Departments/
│       ├── Regions/
│       └── Tourism/
│
└── app/                     # ⚙️ CONFIGURACIÓN
    ├── router.tsx           # React Router config
    └── providers.tsx        # QueryClient provider
```

---

## 🎨 CARACTERÍSTICAS IMPLEMENTADAS

### 1. Mapa Interactivo de Colombia
- **Librería**: Leaflet + React-Leaflet
- **Funcionalidad**:
  - Muestra el mapa de Colombia con GeoJSON
  - Departamentos clickeables con hover effects
  - Tooltips en desktop (solo hover, NO en click)
  - Marcador de ubicación del usuario
  - Responsive (zoom adaptativo según dispositivo)

**Ubicación**: `src/presentation/components/features/departments/DepartmentMap.tsx`

### 2. Modal de Información de Departamento (Bottom Sheet)
- **Diseño**:
  - Móvil: Bottom sheet desde abajo
  - Desktop: Panel flotante lateral derecho (396px de ancho)
- **Contenido**:
  - Nombre del departamento
  - Capital (con ícono)
  - Población (formato: 6.6M)
  - Clima estimado (24°C)
  - Área (formato: 63k)
  - Botón "Ver detalles" (navega a página de detalle)
  - Botón compartir (abre menú de compartir)
- **Características**:
  - Altura fija (250px) para evitar saltos visuales durante la carga
  - Sin overlay oscuro (el mapa se ve detrás)
  - Se abre automáticamente cuando detecta ubicación del usuario
  - Se cierra con tecla ESC
  - En desktop: botón X para cerrar

**Ubicación**: `src/presentation/components/features/departments/DepartmentBottomSheet.tsx`

### 3. Menú de Compartir
- **Opciones**:
  1. Copiar enlace al portapapeles (con feedback visual)
  2. Compartir nativo (si el navegador lo soporta)
- **Posición**:
  - Móvil: Fixed, centrado horizontalmente, bottom-20
  - Desktop: Absoluto, debajo del botón compartir
- **Características**:
  - Overlay oscuro solo en móvil
  - Se cierra al hacer click fuera (desktop) o en overlay (móvil)
  - Animación suave de entrada/salida

### 4. Geolocalización Automática
- **Hooks**:
  - `useGeolocation`: Obtiene coordenadas del usuario
  - `useUserDepartment`: Detecta en qué departamento está el usuario
- **Funcionamiento**:
  1. Solicita permiso de geolocalización
  2. Obtiene coordenadas (lat, lng)
  3. Usa @turf/turf para verificar si el punto está dentro de algún departamento
  4. Si está en Colombia, abre automáticamente el bottom sheet con su departamento
- **Manejo de errores**:
  - Permiso denegado
  - Tiempo de espera agotado
  - Ubicación no disponible

**Ubicación**:
- `src/presentation/hooks/useGeolocation.ts`
- `src/presentation/hooks/useUserDepartment.ts`

---

## 🎨 DISEÑO Y ESTILOS

### Tema de Colores

```css
/* Colores de Colombia */
--color-colombia-yellow: #FCD116
--color-colombia-blue: #003893
--color-colombia-red: #CE1126

/* Dark Mode */
--color-dark-700: #2C2C2E
--color-dark-800: #1C1C1E
```

### Modo Oscuro
- Activado por defecto (clase `dark` en `<html>`)
- Todos los componentes tienen variantes dark
- Modal con fondo `bg-gray-50 dark:bg-dark-700`
- Borde visible para mejor separación: `border-gray-200 dark:border-gray-600`

### Responsive Design
- **Mobile First**: Diseño optimizado primero para móvil
- **Breakpoints**:
  - `sm`: 640px
  - `md`: 768px (punto de cambio principal)
  - `lg`: 1024px
  - `xl`: 1280px

---

## 🔑 PUNTOS CLAVE DE IMPLEMENTACIÓN

### 1. Z-Index Hierarchy
```
Mapa: z-index: 1-3
Modal Bottom Sheet: z-50
Overlay menú compartir (móvil): z-55
Menú compartir: z-60
```

### 2. Estado de la Modal
- No usa overlay oscuro (el mapa siempre visible)
- Altura fija durante loading (250px) para evitar saltos
- Solo bloquea scroll en móvil

### 3. Normalización de Nombres
Los departamentos del GeoJSON y de la API pueden tener nombres ligeramente diferentes. Se usa normalización:
```typescript
const normalize = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // Quita tildes
};
```

### 4. Formato de Números
```typescript
// Población: 6.6M
// Área: 63k
const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'k';
  return num.toString();
};
```

---

## 📂 ARCHIVOS IMPORTANTES

### Configuración
- `vite.config.ts` - Configuración de Vite
- `tsconfig.json` - Configuración de TypeScript
- `tailwind.config.js` - Configuración de Tailwind
- `.eslintrc.cjs` - Reglas de ESLint
- `.prettierrc` - Formato de código

### Rutas
- `/` - Home
- `/departments` - Mapa de departamentos (página principal)
- `/departments/:id` - Detalle de un departamento
- `/regions` - Lista de regiones
- `/tourism` - Atracciones turísticas

### Variables de Entorno
```env
VITE_API_BASE_URL=https://api-colombia.com/api/v1
```

---

## 🚀 COMANDOS ÚTILES

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview del build
npm run preview

# Linting
npm run lint

# TypeScript check
npx tsc --noEmit
```

---

## 📝 CONVENCIONES DE CÓDIGO

### Naming
- **Componentes**: PascalCase (`DepartmentMap.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useDepartments.ts`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Funciones**: camelCase (`formatNumber`)

### TypeScript
- Tipado estricto: NO usar `any`
- Interfaces para objetos
- Types para unions/utilities
- Props con sufijo `Props`

### Tailwind CSS
- Mobile-first
- Usar `clsx` para clases condicionales
- Orden: Layout → Display → Spacing → Sizing → Typography → Visual → Effects

---

## 🐛 PROBLEMAS CONOCIDOS Y SOLUCIONES

### 1. Overlay del menú compartir ocultaba el mapa
**Solución**: Overlay solo en móvil con `md:hidden`

### 2. Modal cambiaba de tamaño durante loading
**Solución**: Altura fija de 250px con `h-[250px] flex flex-col`

### 3. Modal no aparecía en desktop
**Solución**: Usar `md:bottom-auto md:left-auto` para resetear posiciones

### 4. Navegador advertía sobre `navigator.share`
**Solución**: Cambiar a `'share' in navigator`

---

## 📊 DATOS IMPORTANTES

### Departamentos de Colombia
- Total: 32 departamentos + 1 distrito capital
- API devuelve información completa: población, municipios, superficie, etc.
- Temperaturas son estimadas (no vienen de la API)

### GeoJSON
- Fuente: https://gist.githubusercontent.com/john-guerra/43c7656821069d00dcbc/raw/colombia.geo.json
- Propiedades importantes:
  - `NOMBRE_DPT`: Nombre del departamento
  - `DPTO`: Código DANE del departamento

---

## 🎯 PRÓXIMAS MEJORAS SUGERIDAS

- [ ] Implementar búsqueda de departamentos
- [ ] Agregar filtros por región
- [ ] Modo claro/oscuro toggle (actualmente solo oscuro)
- [ ] Guardar departamentos favoritos en localStorage
- [ ] Agregar página de detalle con más información
- [ ] Implementar caché de GeoJSON
- [ ] Tests unitarios con Vitest
- [ ] PWA capabilities
- [ ] Animaciones con Framer Motion

---

## 📞 DEBUGGING

### Ver datos de geolocalización
1. Abrir DevTools
2. Application → Local Storage
3. Verificar permisos en Settings → Privacy

### Ver requests de API
1. Network tab en DevTools
2. Filtrar por "Department"
3. Verificar response status y data

### Verificar z-index
1. Elements tab
2. Computed styles
3. Buscar `z-index`

---

**Última actualización**: Enero 2026
**Estado**: Funcional - MVP completado
**Mantenedor**: Equipo Colombia Explorer
