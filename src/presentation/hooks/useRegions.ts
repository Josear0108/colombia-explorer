import { useQuery } from '@tanstack/react-query';
import { colombiaRepository } from '@/infrastructure/repositories';

export const useRegions = () => {
  return useQuery({
    queryKey: ['regions'],
    queryFn: () => colombiaRepository.getRegions(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useRegionById = (id: number) => {
  return useQuery({
    queryKey: ['region', id],
    queryFn: () => colombiaRepository.getRegionById(id),
    enabled: !!id,
  });
};
