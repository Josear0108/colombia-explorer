import type { Department, Region, TouristicAttraction } from '../entities';

export interface ColombiaRepository {
  getDepartments(): Promise<Department[]>;
  getDepartmentById(id: number): Promise<Department>;
  getRegions(): Promise<Region[]>;
  getRegionById(id: number): Promise<Region>;
  getTouristicAttractions(): Promise<TouristicAttraction[]>;
  getTouristicAttractionById(id: number): Promise<TouristicAttraction>;
}
