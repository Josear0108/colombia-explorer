// src/presentation/hooks/useUserDepartment.ts
import { useState, useEffect, useRef } from 'react';
import { useGeolocation } from './useGeolocation';
import * as turf from '@turf/turf';

interface UserDepartmentState {
  departmentName: string | null;
  departmentCode: number | null;
  isInColombia: boolean;
  loading: boolean;
  error: string | null;
}

// Cache global para el GeoJSON de Colombia
let colombiaGeoJSONCache: any = null;

export const useUserDepartment = () => {
  const geolocation = useGeolocation();
  const [departmentState, setDepartmentState] = useState<UserDepartmentState>({
    departmentName: null,
    departmentCode: null,
    isInColombia: false,
    loading: true,
    error: null,
  });
  const hasProcessed = useRef(false);

  useEffect(() => {
    const detectDepartment = async () => {
      // Si aún está cargando la geolocalización, esperar
      if (geolocation.loading) {
        return;
      }

      // Evitar procesar múltiples veces
      if (hasProcessed.current) {
        return;
      }

      // Si hay error en la geolocalización, propagarlo
      if (geolocation.error) {
        setDepartmentState({
          departmentName: null,
          departmentCode: null,
          isInColombia: false,
          loading: false,
          error: geolocation.error,
        });
        hasProcessed.current = true;
        return;
      }

      // Si no hay coordenadas, no podemos detectar
      if (!geolocation.latitude || !geolocation.longitude) {
        setDepartmentState({
          departmentName: null,
          departmentCode: null,
          isInColombia: false,
          loading: false,
          error: 'No se pudo obtener tu ubicación',
        });
        hasProcessed.current = true;
        return;
      }

      try {
        // Cargar GeoJSON de Colombia (usar cache si existe)
        let colombiaGeoJSON = colombiaGeoJSONCache;

        if (!colombiaGeoJSON) {
          const response = await fetch(
            'https://gist.githubusercontent.com/john-guerra/43c7656821069d00dcbc/raw/3aadedf47badbdac823b00dbe259f6bc6d9e1899/colombia.geo.json'
          );
          colombiaGeoJSON = await response.json();
          colombiaGeoJSONCache = colombiaGeoJSON;
        }

        // Crear punto con la ubicación del usuario
        const userPoint = turf.point([geolocation.longitude, geolocation.latitude]);

        // Buscar en qué departamento está el punto
        let foundDepartment = null;

        for (const feature of colombiaGeoJSON.features) {
          // Verificar si el punto está dentro del polígono del departamento
          if (turf.booleanPointInPolygon(userPoint, feature)) {
            foundDepartment = {
              name: feature.properties.NOMBRE_DPT,
              code: feature.properties.DPTO,
            };
            break;
          }
        }

        if (foundDepartment) {
          setDepartmentState({
            departmentName: foundDepartment.name,
            departmentCode: foundDepartment.code,
            isInColombia: true,
            loading: false,
            error: null,
          });
        } else {
          setDepartmentState({
            departmentName: null,
            departmentCode: null,
            isInColombia: false,
            loading: false,
            error: 'No estás ubicado en Colombia',
          });
        }
        hasProcessed.current = true;
      } catch (error) {
        setDepartmentState({
          departmentName: null,
          departmentCode: null,
          isInColombia: false,
          loading: false,
          error: 'Error al detectar tu departamento',
        });
        hasProcessed.current = true;
      }
    };

    detectDepartment();
  }, [geolocation.latitude, geolocation.longitude, geolocation.loading, geolocation.error]);

  return {
    ...departmentState,
    userLocation: {
      latitude: geolocation.latitude,
      longitude: geolocation.longitude,
    },
  };
};
