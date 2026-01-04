import type { ColombiaRepository } from '@/core/repositories';
import type { Department, Region, TouristicAttraction } from '@/core/entities';
import { apiClient } from '../api/axiosInstance';

export class ColombiaRepositoryImpl implements ColombiaRepository {
  async getDepartments(): Promise<Department[]> {
    const response = await apiClient.get<Department[]>('/Department');
    return response.data;
  }

  async getDepartmentById(id: number): Promise<Department> {
    const response = await apiClient.get<Department>(`/Department/${id}`);
    return response.data;
  }

  async getRegions(): Promise<Region[]> {
    const response = await apiClient.get<Region[]>('/Region');
    return response.data;
  }

  async getRegionById(id: number): Promise<Region> {
    const response = await apiClient.get<Region>(`/Region/${id}`);
    return response.data;
  }

  async getTouristicAttractions(): Promise<TouristicAttraction[]> {
    const response = await apiClient.get<TouristicAttraction[]>('/TouristicAttraction');
    return response.data;
  }

  async getTouristicAttractionById(id: number): Promise<TouristicAttraction> {
    const response = await apiClient.get<TouristicAttraction>(`/TouristicAttraction/${id}`);
    return response.data;
  }
}

// Exportar instancia única (Singleton)
export const colombiaRepository = new ColombiaRepositoryImpl();
