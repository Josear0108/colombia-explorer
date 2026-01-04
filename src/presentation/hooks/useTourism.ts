import { useQuery } from '@tanstack/react-query';
import { colombiaRepository } from '@/infrastructure/repositories';

export const useTouristicAttractions = () => {
  return useQuery({
    queryKey: ['touristicAttractions'],
    queryFn: () => colombiaRepository.getTouristicAttractions(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useTouristicAttractionById = (id: number) => {
  return useQuery({
    queryKey: ['touristicAttraction', id],
    queryFn: () => colombiaRepository.getTouristicAttractionById(id),
    enabled: !!id,
  });
};
