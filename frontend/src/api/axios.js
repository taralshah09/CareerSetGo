import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000', // Default to local dev
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;