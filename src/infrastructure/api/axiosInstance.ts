import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'https://api-colombia.com/api/v1';

export const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para logging (desarrollo)
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejo de errores
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ Response: ${response.config.url}`, response.status);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.message);

    if (error.response) {
      // Error del servidor (4xx, 5xx)
      console.error('Response error:', error.response.status, error.response.data);
    } else if (error.request) {
      // No hubo respuesta
      console.error('No response received:', error.request);
    } else {
      // Error en la configuración
      console.error('Request setup error:', error.message);
    }

    return Promise.reject(error);
  }
);
