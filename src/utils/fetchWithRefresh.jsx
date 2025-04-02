import axios from 'axios';

export async function fetchWithRefresh(config) {
  // config is an axios config object: { url, method, data, headers, ... }
  const accessToken = localStorage.getItem('userToken');

  // Add Authorization header if present
  if (accessToken) {
    if (!config.headers) config.headers = {};
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  try {
    const response = await axios(config);
    return response;
  } catch (err) {
    // If we get a 401, try refreshing
    if (err.response && err.response.status === 401) {
      console.warn('Access token might be expired, attempting refresh...');
      const refreshSuccess = await attemptTokenRefresh();
      if (refreshSuccess) {
        // Retry the request one time
        const newAccessToken = localStorage.getItem('userToken');
        config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axios(config);  // Retry
      } else {
        // refresh failed => log out or handle error
        throw err; // or redirect to /login
      }
    } else {
      // Some other error
      throw err;
    }
  }
}
