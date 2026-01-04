import { useParams, useNavigate } from 'react-router-dom';
import { useDepartmentById } from '@/presentation/hooks';

export default function DepartmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const departmentId = parseInt(id || '0', 10);
  const { data: department, isLoading, error } = useDepartmentById(departmentId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Cargando información del departamento...</div>
      </div>
    );
  }

  if (error || !department) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error al cargar el departamento</h2>
        <button
          onClick={() => navigate('/departments')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Volver a Departamentos
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/departments')}
          className="text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-2"
        >
          ← Volver a Departamentos
        </button>
        <h1 className="text-4xl font-bold mb-2">{department.name}</h1>
        <p className="text-xl text-gray-600">{department.description}</p>
      </div>

      {/* Información General */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Información General</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="font-semibold">ID:</span> {department.id}
          </div>
          <div>
            <span className="font-semibold">Nombre:</span> {department.name}
          </div>
          <div>
            <span className="font-semibold">Población:</span>{' '}
            {department.population.toLocaleString('es-CO')} habitantes
          </div>
          <div>
            <span className="font-semibold">Superficie:</span>{' '}
            {department.surface.toLocaleString('es-CO')} km²
          </div>
          <div>
            <span className="font-semibold">Municipios:</span> {department.municipalities}
          </div>
          <div>
            <span className="font-semibold">Prefijo telefónico:</span> {department.phonePrefix}
          </div>
        </div>
      </div>

      {/* Ciudad Capital */}
      {department.cityCapital && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Ciudad Capital</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-semibold">Nombre:</span> {department.cityCapital.name}
            </div>
            <div>
              <span className="font-semibold">Código Postal:</span> {department.cityCapital.postalCode}
            </div>
            <div>
              <span className="font-semibold">Población:</span>{' '}
              {department.cityCapital.population.toLocaleString('es-CO')} habitantes
            </div>
            <div>
              <span className="font-semibold">Superficie:</span>{' '}
              {department.cityCapital.surface.toLocaleString('es-CO')} km²
            </div>
            {department.cityCapital.description && (
              <div className="md:col-span-2">
                <span className="font-semibold">Descripción:</span>
                <p className="mt-2 text-gray-600">{department.cityCapital.description}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
