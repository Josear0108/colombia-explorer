import { useQuery } from '@tanstack/react-query';
import { colombiaRepository } from '@/infrastructure/repositories';

export const useDepartments = () => {
  return useQuery({
    queryKey: ['departments'],
    queryFn: () => colombiaRepository.getDepartments(),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const useDepartmentById = (id: number) => {
  return useQuery({
    queryKey: ['department', id],
    queryFn: () => colombiaRepository.getDepartmentById(id),
    enabled: !!id, // Solo ejecuta si hay ID
  });
};
