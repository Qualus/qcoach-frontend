import axios, { AxiosRequestConfig } from 'axios';
import { getAuthTokens, clearAuthTokens, isTokenValid } from '../auth/tokens';
import { authService } from '../auth/auth-service';

const AXIOS_INSTANCE = axios.create();

const getBaseURL = (): string => {
  const isDev = process.env.NODE_ENV === 'development';
  
  if (isDev) {
    return '/backend/api';
  }
  
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const tenant = hostname.split('.')[0];
    const prodDomain = process.env.NEXT_PUBLIC_PROD_DOMAIN || 'qcoach.it';
    const protocol = process.env.NEXT_PUBLIC_API_PROTOCOL || 'https';
    
    return `${protocol}://${tenant}.${prodDomain}/api`;
  }
  
  return process.env.NEXT_PUBLIC_API_BASE_URL || '/backend/api';
};

AXIOS_INSTANCE.interceptors.request.use(
  (config) => {
    const tokens = getAuthTokens();
    if (tokens?.jwtToken) {
      config.headers.Authorization = `Bearer ${tokens.jwtToken}`;
    }
    
    config.baseURL = getBaseURL();
    
    if (process.env.NEXT_PUBLIC_DEBUG_API === 'true') {
      console.log('API Request:', config.method?.toUpperCase(), config.baseURL + config.url);
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

AXIOS_INSTANCE.interceptors.response.use(
  (response) => {
    if (process.env.NEXT_PUBLIC_DEBUG_API === 'true') {
      console.log('API Response:', response.status, response.config.url);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    if (process.env.NEXT_PUBLIC_DEBUG_API === 'true') {
      console.error('API Error:', error.response?.status, error.config?.url);
    }
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const tokens = getAuthTokens();
      
      if (isTokenValid(tokens) && tokens?.refreshToken) {
        try {
          const refreshResponse = await authService.refreshUserToken();
          
          if (refreshResponse?.jwtToken) {
            originalRequest.headers.Authorization = `Bearer ${refreshResponse.jwtToken}`;
            return AXIOS_INSTANCE(originalRequest);
          }
        } catch (refreshError) {
          clearAuthTokens();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
          return Promise.reject(refreshError);
        }
      }
      
      clearAuthTokens();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  return AXIOS_INSTANCE(config).then(({ data }) => data);
};

export default AXIOS_INSTANCE;
