// src/utils/axiosSetup.js

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "https://website.azurewebsites.net"; // dummy url

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL
});

// A helper to refresh the token
async function attemptTokenRefresh() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    console.error('No refreshToken found in localStorage.');
    return false;
  }
  
  try {
    const response = await axios.post(`${API_URL}/refresh`, {
      refresh_token: refreshToken
    });
    if (response.status === 200 && response.data.access_token) {
      // Store the new access token
      localStorage.setItem('userToken', response.data.access_token);
      return true;
    } else {
      console.error('Refresh response missing access_token');
      return false;
    }
  } catch (err) {
    console.error('Refresh token request failed:', err);
    return false;
  }
}

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Attach access token if it exists
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Request error
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401
api.interceptors.response.use(
  (response) => response, // pass through if no errors
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Got 401, attempting token refresh...');
      // Attempt to refresh
      const success = await attemptTokenRefresh();
      if (!success) {
        // Refresh failed => sign user out or do something else
        console.error('Refresh token failed or invalid. Logging out...');
        localStorage.removeItem('userToken');
        localStorage.removeItem('refreshToken');
        // Optionally navigate to /login, or dispatch a logout action
        return Promise.reject(error);
      }
      // If refresh succeeded, we have a new token in localStorage
      // Retry the original request once
      const newToken = localStorage.getItem('userToken');
      if (newToken) {
        error.config.headers['Authorization'] = `Bearer ${newToken}`;
      }
      // Return the promise from calling axios again
      return api(error.config);
    }
    // If not 401 or refresh fail, just reject
    return Promise.reject(error);
  }
);

export default api;
