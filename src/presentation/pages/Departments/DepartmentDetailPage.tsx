import { useParams, useNavigate } from 'react-router-dom';
import { useDepartmentById } from '@/presentation/hooks';
import { DepartmentCircularMap } from '@/presentation/components/features/departments/DepartmentCircularMap';
import { Star, Users, Mountain, Building2, Info, Map } from 'lucide-react';

export default function DepartmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const departmentId = parseInt(id || '0', 10);
  const { data: department, isLoading, error } = useDepartmentById(departmentId);

  // Formatear números
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return Math.round(num / 1000) + 'k';
    }
    return num.toString();
  };

  // Formatear números con separadores
  const formatNumberWithSeparators = (num: number): string => {
    return num.toLocaleString('es-CO');
  };

  // Calcular porcentaje de crecimiento (simulado - en producción vendría de la API)
  const getPopulationGrowth = (): string => {
    const growthRates: Record<string, string> = {
      'Antioquia': '+1.2%',
      'Cundinamarca': '+1.5%',
      'Valle del Cauca': '+0.8%',
      'Atlántico': '+1.1%',
      'Santander': '+0.9%',
    };
    return department ? (growthRates[department.name] || '+0.7%') : '+0.0%';
  };

  // Tags de sectores económicos (simulados - podrían venir de la API)
  const getSectorTags = (): string[] => {
    const sectorsByDept: Record<string, string[]> = {
      'Antioquia': ['Economía', 'Turismo', 'Café'],
      'Cundinamarca': ['Economía', 'Flores', 'Agroindustria'],
      'Valle del Cauca': ['Economía', 'Caña de Azúcar', 'Turismo'],
      'Atlántico': ['Economía', 'Puerto', 'Turismo'],
      'Santander': ['Economía', 'Petróleo', 'Turismo'],
    };
    return department ? (sectorsByDept[department.name] || ['Economía', 'Turismo']) : [];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-800 flex items-center justify-center">
        <div className="text-lg text-gray-600 dark:text-gray-400">
          Cargando información del departamento...
        </div>
      </div>
    );
  }

  if (error || !department) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-800 flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
          Error al cargar el departamento
        </h2>
        <button
          onClick={() => navigate('/departments')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Volver a Departamentos
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-800">
      {/* Header Sticky - Solo móvil */}
      <div className="sticky top-0 z-50 bg-white dark:bg-dark-700 border-b border-gray-200 dark:border-gray-700 shadow-sm md:hidden">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => navigate('/departments')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Volver al mapa"
          >
            <Map className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {department?.name || 'Departamento'}
          </h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 pb-8 md:pb-24">
        {/* Mapa Circular */}
        <div className="mb-8">
          <DepartmentCircularMap departmentName={department.name} />
        </div>

        {/* Nombre del Departamento */}
        <div className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {department.name}
          </h2>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-dark-700 rounded-full">
            <Star className="w-4 h-4 text-blue-600 dark:text-blue-400 fill-blue-600 dark:fill-blue-400" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Capital: <span className="font-semibold">{department.cityCapital.name}</span>
            </span>
          </div>
        </div>

        {/* Tarjeta de Población */}
        <div className="bg-white dark:bg-dark-700 rounded-2xl shadow-sm p-6 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                  Población
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {formatNumber(department.population)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-semibold rounded-full">
                {getPopulationGrowth()}
              </span>
            </div>
          </div>
        </div>

        {/* Superficie y Municipios */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Superficie */}
          <div className="bg-white dark:bg-dark-700 rounded-2xl shadow-sm p-6">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl mb-3">
                <Mountain className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                Superficie
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {formatNumberWithSeparators(department.surface)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">km²</p>
            </div>
          </div>

          {/* Municipios */}
          <div className="bg-white dark:bg-dark-700 rounded-2xl shadow-sm p-6">
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl mb-3">
                <Building2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                Municipios
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {department.municipalities}
              </p>
            </div>
          </div>
        </div>

        {/* Información General */}
        <div className="bg-white dark:bg-dark-700 rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Información General
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            {department.description || `${department.name} es uno de los 32 departamentos que, junto con Bogotá, Distrito Capital, forman la República de Colombia. Su capital es ${department.cityCapital.name}, la segunda ciudad más poblada del país.`}
          </p>

          {/* Tags de sectores */}
          <div className="flex flex-wrap gap-2">
            {getSectorTags().map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-100 dark:bg-dark-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Botón Flotante - Volver al Mapa (Solo Desktop) */}
      <div className="hidden md:block fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white dark:from-dark-800 via-white dark:via-dark-800 to-transparent pointer-events-none">
        <div className="max-w-2xl mx-auto pointer-events-auto">
          <button
            onClick={() => navigate('/departments')}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition-colors"
          >
            <Map className="w-5 h-5" />
            Volver al Mapa
          </button>
        </div>
      </div>
    </div>
  );
}
