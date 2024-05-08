import axios from "axios";

const BASE_URL = "http://localhost:4000/api/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});


userRequest.interceptors.request.use(
  (config) => {
    const persistedState = localStorage.getItem('persist:root');
    if (persistedState) {
      const rootState = JSON.parse(persistedState);
      const companyState = rootState.company ? JSON.parse(rootState.company) : null;
      const token = companyState?.currentCompany?.token;  // Adjust this path based on your actual token storage structure

      console.log('Token just before request:', token); // Debugging line to check token retrieval

      if (token) {
        config.headers['token'] = `Bearer ${token}`;
      } else {
        console.warn('No token found for request:', config.url);
      }
    } else {
      console.warn('Persisted state is null for request:', config.url);
    }

    return config;
  },
  (error) => {
    console.error('Interceptor error:', error);
    return Promise.reject(error);
  }
);
