import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
// import { getToken, removeToken, getUserType } from '@/components/auth/jwt';
// import { Role } from '@/constants/constants';

// Create custom axios instance
export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_IDENTITY_SERVICE_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    // const token = getToken();
  let token = localStorage.getItem('authToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized access - determine correct redirect based on user type
      // const userType = getUserType();
      // const isAdmin = userType === Role.SYSTEM_ADMIN || userType === Role.ADMIN;

      // Remove token from both storages
      // removeToken();

      // Redirect to appropriate login page
      if (
        window.location.pathname !== '/login'
      ) {
        const redirectUrl = '/login';
        window.location.href = redirectUrl;
      }
    }

    if (error.response?.status === 500) {
      // Handle server errors
      console.error('Server error:', error.response.data);
    }

    return Promise.reject(error);
  }
);

// For Admin Request interceptor
