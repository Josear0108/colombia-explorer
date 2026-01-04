# 🇨🇴 COLOMBIA EXPLORER - PLAN DE PROYECTO COMPLETO

## 📋 INFORMACIÓN GENERAL

### Objetivo del Proyecto
Desarrollar una aplicación web moderna con React + TypeScript que consuma la API pública de Colombia (https://api-colombia.com/), aplicando arquitectura limpia, buenas prácticas de desarrollo, Clean Code y Tailwind CSS.

### Propósito
- Aprender y demostrar conocimientos en React, TypeScript y Tailwind CSS
- Aplicar arquitectura limpia y buenas prácticas de desarrollo
- Crear un proyecto sólido para portafolio profesional
- Prepararse para aplicar a vacantes de Desarrollador React

### Referencias del Proyecto
- **API**: https://api-colombia.com/
- **Documentación API**: https://docs.api-colombia.com/
- **Diseño Base**: Google Stitch (https://stitch.withgoogle.com/projects/14445274492848800154)

---

## 🎯 TECNOLOGÍAS Y DEPENDENCIAS

### Stack Tecnológico Principal
```json
{
  "framework": "React 18",
  "language": "TypeScript 5",
  "styling": "Tailwind CSS 3",
  "bundler": "Vite 5",
  "routing": "React Router DOM 6",
  "stateManagement": "React Query (TanStack Query)",
  "httpClient": "Axios",
  "testing": "Vitest + React Testing Library"
}
```

### Dependencias de Producción
```bash
# Core
npm install react react-dom
npm install typescript @types/react @types/react-dom

# Routing
npm install react-router-dom
npm install -D @types/react-router-dom

# HTTP Client
npm install axios

# State Management & Data Fetching
npm install @tanstack/react-query

# UI & Styling
npm install tailwindcss postcss autoprefixer
npm install clsx # Para manejo condicional de clases CSS
```

### Dependencias de Desarrollo
```bash
# Build Tools
npm install -D vite @vitejs/plugin-react

# TypeScript
npm install -D typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser

# Linting & Formatting
npm install -D eslint eslint-config-prettier eslint-plugin-react
npm install -D prettier

# Testing
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm install -D @testing-library/user-event jsdom
```

---

## 🏗️ ARQUITECTURA DEL PROYECTO

### Principios Arquitectónicos

#### 1. Clean Architecture (Arquitectura Limpia)
Separación en capas con dependencias unidireccionales:
```
Presentation Layer (UI) → Application Layer (Use Cases) → Domain Layer (Entities)
                ↓
Infrastructure Layer (API, DB, External Services)
```

**Reglas de Dependencia:**
- Las capas externas dependen de las internas, NUNCA al revés
- El dominio (core) NO conoce la UI ni la infraestructura
- La infraestructura implementa interfaces definidas en el dominio

#### 2. SOLID Principles

**S - Single Responsibility Principle (SRP)**
- Cada módulo/clase/función tiene UNA sola razón para cambiar
- Ejemplo: `DepartmentCard` solo renderiza la tarjeta, no maneja lógica de negocio

**O - Open/Closed Principle (OCP)**
- Abierto para extensión, cerrado para modificación
- Usa composición e interfaces en lugar de modificar código existente

**L - Liskov Substitution Principle (LSP)**
- Los tipos derivados deben ser sustituibles por sus tipos base
- Si usas interfaces, todas las implementaciones deben funcionar igual

**I - Interface Segregation Principle (ISP)**
- Interfaces específicas mejor que interfaces generales
- No obligues a implementar métodos que no se usan

**D - Dependency Inversion Principle (DIP)**
- Depende de abstracciones, no de implementaciones concretas
- Usa interfaces y dependency injection

#### 3. DRY (Don't Repeat Yourself)
- NO dupliques código
- Extrae lógica común en funciones/hooks reutilizables
- Usa componentes genéricos cuando sea posible

#### 4. KISS (Keep It Simple, Stupid)
- Soluciones simples sobre complejas
- Evita over-engineering
- Si algo se puede hacer en 5 líneas, no uses 50

#### 5. YAGNI (You Aren't Gonna Need It)
- No implementes funcionalidad "por si acaso"
- Desarrolla solo lo que necesitas AHORA
- Refactoriza cuando realmente lo necesites

---

## 📁 ESTRUCTURA DE CARPETAS OBLIGATORIA

```
colombia-explorer/
├── public/                           # Archivos estáticos
│   ├── favicon.ico
│   └── assets/
│       └── images/
├── src/
│   ├── app/                         # Configuración de aplicación
│   │   ├── App.tsx                  # Componente raíz
│   │   ├── router.tsx               # Configuración de rutas
│   │   └── providers.tsx            # Providers globales (QueryClient, etc)
│   │
│   ├── core/                        # ⭐ CAPA DE DOMINIO (Business Logic)
│   │   ├── entities/                # Entidades del dominio
│   │   │   ├── Department.ts
│   │   │   ├── Region.ts
│   │   │   ├── TouristicAttraction.ts
│   │   │   ├── City.ts
│   │   │   ├── President.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── repositories/            # Interfaces de repositorios (contratos)
│   │   │   ├── ColombiaRepository.ts
│   │   │   └── index.ts
│   │   │
│   │   └── usecases/                # Casos de uso (lógica de negocio)
│   │       ├── getDepartments.ts
│   │       ├── getDepartmentById.ts
│   │       ├── getRegions.ts
│   │       ├── getTouristicAttractions.ts
│   │       └── index.ts
│   │
│   ├── infrastructure/              # ⭐ CAPA DE INFRAESTRUCTURA
│   │   ├── api/                     # Configuración de API
│   │   │   ├── axiosInstance.ts     # Configuración de Axios
│   │   │   ├── endpoints.ts         # URLs de endpoints
│   │   │   └── interceptors.ts      # Interceptores de request/response
│   │   │
│   │   ├── repositories/            # Implementaciones de repositorios
│   │   │   ├── ColombiaRepositoryImpl.ts
│   │   │   └── index.ts
│   │   │
│   │   └── services/                # Servicios externos (si aplica)
│   │       └── storageService.ts
│   │
│   ├── presentation/                # ⭐ CAPA DE PRESENTACIÓN (UI)
│   │   ├── components/
│   │   │   ├── common/              # Componentes reutilizables
│   │   │   │   ├── Button/
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Button.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Card/
│   │   │   │   ├── Input/
│   │   │   │   ├── Loading/
│   │   │   │   ├── ErrorMessage/
│   │   │   │   ├── Modal/
│   │   │   │   ├── Pagination/
│   │   │   │   └── SearchBar/
│   │   │   │
│   │   │   ├── layout/              # Componentes de layout
│   │   │   │   ├── Header/
│   │   │   │   ├── Footer/
│   │   │   │   ├── Sidebar/
│   │   │   │   └── MainLayout/
│   │   │   │
│   │   │   └── features/            # Componentes por feature
│   │   │       ├── departments/
│   │   │       │   ├── DepartmentCard.tsx
│   │   │       │   ├── DepartmentList.tsx
│   │   │       │   ├── DepartmentFilters.tsx
│   │   │       │   └── DepartmentMap.tsx
│   │   │       ├── regions/
│   │   │       │   ├── RegionCard.tsx
│   │   │       │   └── RegionList.tsx
│   │   │       └── tourism/
│   │   │           ├── AttractionCard.tsx
│   │   │           ├── AttractionList.tsx
│   │   │           └── AttractionDetail.tsx
│   │   │
│   │   ├── pages/                   # Páginas de la aplicación
│   │   │   ├── Home/
│   │   │   │   ├── HomePage.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Departments/
│   │   │   │   ├── DepartmentsPage.tsx
│   │   │   │   ├── DepartmentDetailPage.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Regions/
│   │   │   ├── Tourism/
│   │   │   └── NotFound/
│   │   │
│   │   ├── hooks/                   # Custom hooks
│   │   │   ├── useDepartments.ts
│   │   │   ├── useDepartmentById.ts
│   │   │   ├── useRegions.ts
│   │   │   ├── useTourism.ts
│   │   │   ├── useSearch.ts
│   │   │   ├── usePagination.ts
│   │   │   └── useDebounce.ts
│   │   │
│   │   ├── styles/                  # Estilos globales
│   │   │   ├── index.css            # Import de Tailwind
│   │   │   └── globals.css          # Estilos globales custom
│   │   │
│   │   └── utils/                   # Utilidades de presentación
│   │       ├── formatters.ts        # Formateo de datos para UI
│   │       ├── validators.ts        # Validaciones
│   │       └── constants.ts         # Constantes de UI
│   │
│   ├── shared/                      # Código compartido entre capas
│   │   ├── types/                   # Tipos compartidos
│   │   │   ├── api.types.ts
│   │   │   └── common.types.ts
│   │   ├── constants/               # Constantes globales
│   │   │   └── app.constants.ts
│   │   └── utils/                   # Utilidades generales
│   │       ├── helpers.ts
│   │       └── logger.ts
│   │
│   ├── main.tsx                     # Entry point
│   └── vite-env.d.ts               # Tipos de Vite
│
├── tests/                           # Tests de integración
│   └── setup.ts
│
├── .env.example                     # Variables de entorno ejemplo
├── .env                            # Variables de entorno (no commitear)
├── .eslintrc.cjs                   # Configuración ESLint
├── .prettierrc                     # Configuración Prettier
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json                   # Configuración TypeScript
├── tsconfig.node.json
├── tailwind.config.js              # Configuración Tailwind
├── postcss.config.js
├── vite.config.ts                  # Configuración Vite
└── README.md
```

---

## 📝 REGLAS DE CÓDIGO (OBLIGATORIAS)

### TypeScript Rules

#### 1. Tipado Estricto
```typescript
// ✅ CORRECTO
interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): Promise<User> {
  // implementation
}

// ❌ INCORRECTO
function getUser(id: any): any {
  // implementation
}
```

#### 2. No usar `any`
```typescript
// ✅ CORRECTO
type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
}

// ❌ INCORRECTO
type ApiResponse = {
  data: any;
  status: any;
}
```

#### 3. Interfaces sobre Types (cuando sea posible)
```typescript
// ✅ CORRECTO - Para objetos
interface Department {
  id: number;
  name: string;
}

// ✅ CORRECTO - Para unions/utilities
type Status = 'loading' | 'success' | 'error';
type ReadonlyDepartment = Readonly<Department>;
```

#### 4. Usar Utility Types
```typescript
// Partial, Required, Readonly, Pick, Omit, Record, etc.
type PartialDepartment = Partial<Department>;
type DepartmentWithoutId = Omit<Department, 'id'>;
```

### React Rules

#### 1. Componentes Funcionales SIEMPRE
```typescript
// ✅ CORRECTO
export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};

// ❌ INCORRECTO (no usar class components)
class Button extends React.Component {
  // ...
}
```

#### 2. Props con TypeScript
```typescript
// ✅ CORRECTO
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false
}) => {
  // implementation
};
```

#### 3. Hooks Rules
```typescript
// ✅ CORRECTO
export const useDepartments = () => {
  const [data, setData] = useState<Department[]>([]);
  
  useEffect(() => {
    // Solo lógica relacionada con este efecto
  }, [dependencies]);
  
  return { data, setData };
};

// ❌ INCORRECTO - Hook sin tipo de retorno claro
export const useDepartments = () => {
  // sin tipos claros
};
```

#### 4. Custom Hooks Naming
```typescript
// ✅ CORRECTO - Siempre empezar con "use"
export const useDebounce = (value: string, delay: number) => {
  // implementation
};

// ❌ INCORRECTO
export const debounce = (value: string, delay: number) => {
  // implementation
};
```

### Clean Code Rules

#### 1. Nombres Descriptivos
```typescript
// ✅ CORRECTO
const fetchDepartmentById = async (departmentId: number) => {
  // implementation
};

const isUserAuthenticated = () => boolean;

const MAX_RETRY_ATTEMPTS = 3;

// ❌ INCORRECTO
const fetchData = async (id: number) => {};
const check = () => boolean;
const max = 3;
```

#### 2. Funciones Pequeñas (máx 20-30 líneas)
```typescript
// ✅ CORRECTO - Función enfocada
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ❌ INCORRECTO - Función que hace muchas cosas
const processUser = (user: any) => {
  // 100 líneas de código haciendo muchas cosas
};
```

#### 3. Evitar Comentarios Obvios
```typescript
// ✅ CORRECTO - Código auto-explicativo
const calculateTotalPrice = (items: Item[]): number => {
  return items.reduce((total, item) => total + item.price, 0);
};

// ❌ INCORRECTO
const calc = (items: any[]): number => {
  // Loop through items and add prices
  let t = 0; // total
  for (let i = 0; i < items.length; i++) {
    t += items[i].p; // add price
  }
  return t;
};
```

#### 4. Early Returns
```typescript
// ✅ CORRECTO
const getDepartmentName = (dept: Department | null): string => {
  if (!dept) return 'Unknown';
  if (!dept.name) return 'Unnamed';
  return dept.name;
};

// ❌ INCORRECTO
const getDepartmentName = (dept: Department | null): string => {
  let name = 'Unknown';
  if (dept) {
    if (dept.name) {
      name = dept.name;
    }
  }
  return name;
};
```

#### 5. Constantes sobre Magic Numbers
```typescript
// ✅ CORRECTO
const ITEMS_PER_PAGE = 12;
const MAX_SEARCH_RESULTS = 50;

const paginatedItems = items.slice(0, ITEMS_PER_PAGE);

// ❌ INCORRECTO
const paginatedItems = items.slice(0, 12);
```

### Tailwind CSS Rules

#### 1. Orden de Clases (usar plugin prettier-plugin-tailwindcss)
```typescript
// ✅ CORRECTO - Orden: Layout → Display → Spacing → Sizing → Typography → Visual → Effects
<div className="flex items-center justify-between p-4 w-full text-lg font-bold text-blue-600 bg-white rounded-lg shadow-md hover:shadow-xl">

// ❌ INCORRECTO - Sin orden
<div className="text-blue-600 w-full shadow-md p-4 bg-white flex rounded-lg">
```

#### 2. Usar clsx para Clases Condicionales
```typescript
import clsx from 'clsx';

// ✅ CORRECTO
<button 
  className={clsx(
    'px-4 py-2 rounded-lg font-medium',
    variant === 'primary' && 'bg-blue-600 text-white',
    variant === 'secondary' && 'bg-gray-200 text-gray-800',
    disabled && 'opacity-50 cursor-not-allowed'
  )}
>

// ❌ INCORRECTO
<button 
  className={`px-4 py-2 ${variant === 'primary' ? 'bg-blue-600' : 'bg-gray-200'} ${disabled ? 'opacity-50' : ''}`}
>
```

#### 3. Extraer Componentes para Estilos Repetidos
```typescript
// ✅ CORRECTO
const Card: React.FC<CardProps> = ({ children }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
    {children}
  </div>
);

// ❌ INCORRECTO - Repetir las mismas clases en múltiples lugares
```

#### 4. Responsive Design Mobile-First
```typescript
// ✅ CORRECTO
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

// ❌ INCORRECTO - Desktop first
<div className="grid grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
```

---

## 🎨 CONVENCIONES DE CÓDIGO

### Naming Conventions

#### Archivos
```
PascalCase: Componentes React
  - Button.tsx
  - DepartmentCard.tsx
  - HomePage.tsx

camelCase: Utilities, hooks, functions
  - useDepartments.ts
  - formatters.ts
  - helpers.ts

kebab-case: Estilos (si aplica)
  - custom-styles.css
```

#### Variables y Funciones
```typescript
// camelCase para variables y funciones
const userName = 'John';
const getUserById = (id: number) => {};

// PascalCase para componentes, clases, interfaces, types
interface UserProfile {}
type ApiResponse = {};
const UserCard: React.FC = () => {};

// UPPER_SNAKE_CASE para constantes
const API_BASE_URL = 'https://api-colombia.com';
const MAX_RETRY_ATTEMPTS = 3;
```

### Imports Order
```typescript
// 1. Dependencias externas
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// 2. Imports internos (absolutos)
import { Department } from '@/core/entities';
import { useDepartments } from '@/presentation/hooks';

// 3. Imports relativos
import { Button } from '../common/Button';
import './styles.css';

// 4. Tipos
import type { ButtonProps } from './types';
```

### Exports
```typescript
// ✅ CORRECTO - Named exports (preferido)
export const Button: React.FC<ButtonProps> = () => {};
export const Card: React.FC<CardProps> = () => {};

// ✅ CORRECTO - Default export (solo para páginas/componentes principales)
export default HomePage;

// ❌ INCORRECTO - Mezclar sin sentido
export default Button;
export { Card };
```

---

## 🔧 CONFIGURACIÓN DE ARCHIVOS

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,

    /* Path Aliases */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/core/*": ["src/core/*"],
      "@/infrastructure/*": ["src/infrastructure/*"],
      "@/presentation/*": ["src/presentation/*"],
      "@/shared/*": ["src/shared/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        colombia: {
          yellow: '#FCD116',
          blue: '#003893',
          red: '#CE1126',
        },
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
```

### .eslintrc.cjs
```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prefer-const': 'error',
    'no-var': 'error',
  },
}
```

### .prettierrc
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "always",
  "endOfLine": "auto",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

---

## 📊 ENDPOINTS DE LA API

### Base URL
```
https://api-colombia.com/api/v1
```

### Endpoints Principales
```typescript
// Información General
GET /Country/Colombia

// Departamentos
GET /Department           // Todos los departamentos
GET /Department/{id}      // Departamento específico

// Regiones
GET /Region              // Todas las regiones
GET /Region/{id}         // Región específica

// Ciudades
GET /City                // Todas las ciudades
GET /City/{id}           // Ciudad específica

// Atracciones Turísticas
GET /TouristicAttraction              // Todas las atracciones
GET /TouristicAttraction/{id}         // Atracción específica

// Presidentes
GET /President           // Todos los presidentes
GET /President/{id}      // Presidente específico

// Mapas
GET /Map                 // Todos los mapas
GET /Map/{id}            // Mapa específico

// Aeropuertos
GET /Airport             // Todos los aeropuertos
GET /Airport/{id}        // Aeropuerto específico

// Días Festivos
GET /Holiday             // Todos los festivos
GET /Holiday/{id}        // Festivo específico

// Platos Típicos
GET /TypicalDish         // Todos los platos típicos
GET /TypicalDish/{id}    // Plato típico específico
```

---

## 🧪 TESTING GUIDELINES

### Qué Testear (Prioridades)

#### 1. Alta Prioridad
- Utilidades y helpers
- Custom hooks
- Lógica de negocio (use cases)
- Componentes comunes reutilizables

#### 2. Media Prioridad
- Componentes de features
- Páginas principales
- Servicios de API

#### 3. Baja Prioridad
- Componentes de layout
- Estilos y UI pura

### Ejemplo de Test
```typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

---

## 🚀 FEATURES A IMPLEMENTAR

### MVP (Mínimo Producto Viable)
- [ ] Página principal con información de Colombia
- [ ] Lista de departamentos con tarjetas
- [ ] Detalle de departamento individual
- [ ] Lista de regiones
- [ ] Lista de atracciones turísticas
- [ ] Navegación entre páginas
- [ ] Loading states
- [ ] Error handling
- [ ] Responsive design

### Características Avanzadas (Post-MVP)
- [ ] Búsqueda de departamentos/ciudades
- [ ] Filtros por región
- [ ] Paginación
- [ ] Ordenamiento (alfabético, por población, etc)
- [ ] Mapa interactivo (opcional)
- [ ] Favoritos (localStorage)
- [ ] Modo oscuro
- [ ] Animaciones con Framer Motion
- [ ] PWA (Progressive Web App)
- [ ] Internacionalización (i18n)

---

## 📈 GIT WORKFLOW

### Branch Strategy
```
main           (producción, siempre estable)
  └── develop  (desarrollo activo)
       ├── feature/department-list
       ├── feature/search-functionality
       └── bugfix/api-error-handling
```

### Commit Message Convention
```
feat: nueva funcionalidad
fix: corrección de bug
docs: documentación
style: formato, espacios (no afecta código)
refactor: refactorización
test: añadir/modificar tests
chore: tareas de mantenimiento

Ejemplos:
feat: add department list page
fix: resolve API timeout error
docs: update README with setup instructions
refactor: extract search logic to custom hook
```

### Commits Atómicos
Cada commit debe ser una unidad lógica de cambio:
```bash
# ✅ CORRECTO
git commit -m "feat: add Button component"
git commit -m "feat: add Button tests"
git commit -m "docs: add Button documentation"

# ❌ INCORRECTO
git commit -m "add button, fix bug, update readme"
```

---

## 📚 RECURSOS DE APRENDIZAJE

### Documentación Oficial
- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Query](https://tanstack.com/query/latest/docs/react/overview)
- [React Router](https://reactrouter.com/en/main)

### Clean Code & Architecture
- [Clean Code by Robert C. Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [Clean Architecture Blog](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [SOLID Principles](https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design)

### React Patterns
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Patterns.dev](https://www.patterns.dev/)

---

## ✅ CHECKLIST DE CALIDAD

### Antes de Cada Commit
- [ ] Código funciona sin errores
- [ ] No hay console.logs innecesarios
- [ ] Código formateado con Prettier
- [ ] ESLint sin warnings críticos
- [ ] TypeScript sin errores
- [ ] Tests pasan (si aplica)

### Antes de Cada Pull Request
- [ ] Todos los tests pasan
- [ ] Código revisado
- [ ] Documentación actualizada
- [ ] Sin conflictos con main/develop
- [ ] Build funciona correctamente

### Antes del Deploy
- [ ] README.md completo
- [ ] Variables de entorno documentadas
- [ ] Build de producción funciona
- [ ] Tests de integración pasan
- [ ] Performance optimizada
- [ ] SEO básico implementado
- [ ] Responsive en todos los dispositivos

---

## 🎯 CRONOGRAMA SUGERIDO

### Semana 1: Setup & Arquitectura
- Día 1-2: Setup del proyecto, dependencias, configuración
- Día 3-4: Estructura de carpetas, arquitectura base
- Día 5-7: Entidades, repositorios, API setup

### Semana 2: Core Features
- Día 1-2: Componentes comunes (Button, Card, etc)
- Día 3-4: Página de departamentos
- Día 5-7: Detalle de departamento, navegación

### Semana 3: Features Adicionales
- Día 1-2: Regiones y atracciones turísticas
- Día 3-4: Búsqueda y filtros
- Día 5-7: Paginación, ordenamiento

### Semana 4: Polish & Deploy
- Día 1-2: Loading states, error handling
- Día 3-4: Tests, optimización
- Día 5-7: Deployment, documentación

---

## 🌐 DEPLOYMENT

### Opciones de Hosting (Recomendadas)

#### 1. Vercel (Recomendado)
```bash
npm install -g vercel
vercel login
vercel
```
- ✅ Deploy automático con Git
- ✅ Preview deployments
- ✅ Gratis para proyectos personales

#### 2. Netlify
```bash
npm run build
# Subir carpeta dist/
```
- ✅ Fácil de usar
- ✅ CI/CD integrado
- ✅ Formularios gratis

#### 3. GitHub Pages
```bash
npm install -g gh-pages
npm run build
gh-pages -d dist
```
- ✅ Gratis
- ✅ Integrado con GitHub

---

## 📝 README TEMPLATE PARA PORTAFOLIO

```markdown
# 🇨🇴 Colombia Explorer

> Aplicación web moderna para explorar información sobre Colombia

[🚀 Ver Demo](https://tu-proyecto.vercel.app) | [📖 Documentación](link)

![Screenshot](screenshot.png)

## 🎯 Características

- 🗺️ Exploración de 32 departamentos de Colombia
- 🏞️ Catálogo de atracciones turísticas
- 🔍 Búsqueda y filtros avanzados
- 📱 Diseño responsive (mobile-first)
- ⚡ Carga rápida con React Query
- 🎨 UI moderna con Tailwind CSS

## 🛠️ Tecnologías

- React 18
- TypeScript 5
- Tailwind CSS
- React Query
- React Router
- Vite
- Axios

## 📦 Instalación

\`\`\`bash
git clone https://github.com/tu-usuario/colombia-explorer
cd colombia-explorer
npm install
npm run dev
\`\`\`

## 🏗️ Arquitectura

Este proyecto sigue Clean Architecture con separación en capas:
- **Domain Layer**: Entidades y lógica de negocio
- **Infrastructure Layer**: API y servicios externos
- **Presentation Layer**: UI y componentes React

## 🧪 Tests

\`\`\`bash
npm run test
\`\`\`

## 📄 Licencia

MIT

---

Desarrollado con ❤️ por [Tu Nombre](https://tu-portfolio.com)
```

---

## 🎓 OBJETIVOS DE APRENDIZAJE

### Técnicos
- [ ] Dominar React 18 con TypeScript
- [ ] Implementar Clean Architecture
- [ ] Aplicar SOLID principles
- [ ] Manejar estado con React Query
- [ ] Diseñar interfaces con Tailwind CSS
- [ ] Escribir código limpio y mantenible
- [ ] Implementar testing efectivo

### Profesionales
- [ ] Crear portafolio sólido
- [ ] Demostrar buenas prácticas
- [ ] Documentar proyecto profesionalmente
- [ ] Prepararse para entrevistas técnicas
- [ ] Ganar confianza en desarrollo frontend

---

## 💡 TIPS FINALES

1. **Commit frecuentemente**: Pequeños commits es mejor que uno grande
2. **Documenta mientras desarrollas**: No lo dejes para el final
3. **Refactoriza temprano**: No esperes a que sea "perfecto"
4. **Pregunta cuando no entiendas**: Es mejor preguntar que asumir
5. **Celebra los pequeños logros**: Cada feature completada es un paso adelante

---

## 📞 SOPORTE

Si tienes dudas durante el desarrollo:
1. Revisa la documentación oficial de cada tecnología
2. Busca en Stack Overflow
3. Consulta los recursos de aprendizaje listados
4. Usa Claude Code para asistencia específica

---

**¡Éxito en tu proyecto!** 🚀

Este documento es tu guía completa. Síguelo paso a paso y tendrás un proyecto profesional para tu portafolio.
