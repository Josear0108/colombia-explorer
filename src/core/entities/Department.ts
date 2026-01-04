interface CityCapital {
  id: number;
  name: string;
  description: string;
  surface: number;
  population: number;
  postalCode: string;
  departmentId: number;
}

export interface Department {
  id: number;
  name: string;
  description: string;
  cityCapital: CityCapital;
  municipalities: number;
  surface: number;
  population: number;
  phonePrefix: string;
  countryId: number;
  cityCapitalId: number;
  regionId: number;
}
