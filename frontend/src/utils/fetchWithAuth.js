// utils/fetchWithAuth.js
import axios from 'axios';

export const fetchWithAuth = async (url, options = {}) => {
  let token = localStorage.getItem('access_token');

  if (!token) {
    console.log("Token doesn't exist!");
    throw new Error('No authentication token found');
  }

  // Configure Axios instance with base headers
  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000', // Adjust to your backend URL (e.g., Render URL if deployed)
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers, // Allow overriding headers if provided
    },
  });

  try {
    // Make the request
    const response = await axiosInstance({
      url,
      method: options.method || 'GET', // Default to GET if not specified
      data: options.body, // Use 'data' for Axios instead of 'body'
      ...options, // Spread other options (e.g., params for query strings)
    });

    return response.data; // Axios automatically parses JSON into response.data
  } catch (error) {
    if (error.response?.status === 401) {
      // Handle token refresh
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const refreshResponse = await axios.post(
            'http://127.0.0.1:8000/api/token/refresh/',
            { refresh: refreshToken },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          const newAccessToken = refreshResponse.data.access;
          localStorage.setItem('access_token', newAccessToken);

          // Retry original request with new token
          axiosInstance.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
          const retryResponse = await axiosInstance({
            url,
            method: options.method || 'GET',
            data: options.body,
            ...options,
          });

          return retryResponse.data;
        } catch (refreshError) {
          throw new Error('Session expired. Please log in again.');
        }
      } else {
        throw new Error('Session expired. Please log in again.');
      }
    }

    // Handle other errors
    throw new Error(error.response?.data?.detail || 'Something went wrong!');
  }
};