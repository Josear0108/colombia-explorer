import { useState, useEffect } from 'react';
import { DepartmentMap } from '@/presentation/components/features/departments/DepartmentMap';
import { DepartmentBottomSheet } from '@/presentation/components/features/departments/DepartmentBottomSheet';
import { useDepartments, useUserDepartment } from '@/presentation/hooks';

export default function DepartmentsPage() {
  const { data: departments, isLoading } = useDepartments();
  const userDepartment = useUserDepartment();
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // Mostrar bottom sheet cuando se detecte la ubicación del usuario
  useEffect(() => {
    if (
      userDepartment.isInColombia &&
      userDepartment.departmentName &&
      departments &&
      !userDepartment.loading
    ) {
      // Función para normalizar texto
      const normalize = (text: string) => {
        return text
          .toLowerCase()
          .trim()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
      };

      const normalizedUserDeptName = normalize(userDepartment.departmentName);
      const department = departments.find((dept) => {
        const normalizedDeptName = normalize(dept.name);
        return normalizedDeptName === normalizedUserDeptName;
      });

      if (department) {
        setSelectedDepartmentId(department.id);
        setIsBottomSheetOpen(true);
      }
    }
  }, [userDepartment.isInColombia, userDepartment.departmentName, userDepartment.loading, departments]);

  const handleDepartmentClick = (daneCode: number, name: string) => {
    if (!departments) return;

    // Función para normalizar texto: minúsculas, sin tildes, sin espacios extra
    const normalize = (text: string) => {
      return text
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, ''); // Remueve acentos
    };

    const normalizedClickedName = normalize(name);
    const department = departments.find((dept) => {
      const normalizedDeptName = normalize(dept.name);
      return normalizedDeptName === normalizedClickedName;
    });

    if (department) {
      setSelectedDepartmentId(department.id);
      setIsBottomSheetOpen(true);
    } else {
      console.warn(`No se encontró el departamento: ${name} (código DANE: ${daneCode})`);
    }
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Cargando mapa de departamentos...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-center">
        Departamentos de Colombia
      </h1>

      <DepartmentMap
        onDepartmentClick={handleDepartmentClick}
        userLocation={userDepartment.userLocation}
      />

      {/* Bottom Sheet Modal */}
      <DepartmentBottomSheet
        departmentId={selectedDepartmentId}
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
      />
    </div>
  );
};