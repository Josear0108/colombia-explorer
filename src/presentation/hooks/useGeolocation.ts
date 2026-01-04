// src/presentation/hooks/useGeolocation.ts
import { useState, useEffect } from 'react';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    // Verificar si el navegador soporta geolocalización
    if (!navigator.geolocation) {
      setLocation({
        latitude: null,
        longitude: null,
        error: 'Tu navegador no soporta geolocalización',
        loading: false,
      });
      return;
    }

    // Obtener ubicación
    navigator.geolocation.getCurrentPosition(
      // Success callback
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          loading: false,
        });
      },
      // Error callback
      (error) => {
        let errorMessage = 'No se pudo obtener tu ubicación';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Permiso de ubicación denegado. Por favor, habilita la ubicación en tu navegador.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Información de ubicación no disponible';
            break;
          case error.TIMEOUT:
            errorMessage = 'Tiempo de espera agotado al obtener ubicación';
            break;
        }
        
        setLocation({
          latitude: null,
          longitude: null,
          error: errorMessage,
          loading: false,
        });
      },
      // Options
      {
        enableHighAccuracy: false, // Desactivado para obtener ubicación más rápido
        timeout: 15000,            // Máximo 15 segundos de espera
        maximumAge: 60000,         // Aceptar ubicación en caché de hasta 1 minuto
      }
    );
  }, []);

  return location;
};