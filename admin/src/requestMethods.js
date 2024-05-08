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
    console.log('Running interceptor for request to:', config.url); // Debug: Which request is this?

    // Fetch the token from localStorage directly within the interceptor
    const persistedState = localStorage.getItem('persist:root');
    console.log('Persisted state:', persistedState); // Debug: What is in persistedState right now?

    if (persistedState) {
      const rootState = JSON.parse(persistedState);
      console.log('Root state:', rootState); // Debug: What is in rootState right now?

      const userState = JSON.parse(rootState.user);
      console.log('User state:', userState); // Debug: What is in userState right now?

      const token = userState.currentUser?.accessTkn;
      console.log('Token retrieved for request:', token); // Debug: Do we have the token?

      if (token) {
        config.headers['token'] = `Bearer ${token}`;
      } else {
        console.warn('No token found for request:', config.url);
      }
    } else {
      console.warn('Persisted state is null for request:', config.url);
    }

    console.log('Request headers after interceptor:', config.headers); // Debug: What are the headers now?

    return config;
  },
  (error) => {
    console.error('Interceptor error:', error);
    return Promise.reject(error);
  }
);


// Adjusted getPersistedToken function to fetch directly before each request
const getPersistedToken = () => {
  try {
      const persistedState = localStorage.getItem('persist:root');
      if (!persistedState) return null;

      const rootState = JSON.parse(persistedState);
      if (!rootState.user) return null;

      const userState = JSON.parse(rootState.user);
      console.log('Token retrieved for request:', userState.currentUser?.accessTkn);
      return userState.currentUser?.accessTkn;
  } catch (error) {
      console.error('Failed to retrieve token:', error);
      return null;
  }
};

const TOKEN = getPersistedToken();

