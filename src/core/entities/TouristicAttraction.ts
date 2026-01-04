export interface Department {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
  description: string | null;
  surface: number | null;
  population: number | null;
  postalCode: string | null;
  departmentId: number;
  department: Department | null;
}

export interface TouristicAttraction {
  id: number;
  name: string;
  description: string;
  images: string[];
  latitude: string;
  longitude: string;
  cityId: number;
  city: City;
}
