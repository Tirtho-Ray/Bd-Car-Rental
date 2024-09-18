// services/carService.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Base URL for your API

// Create an Axios instance with default configurations
export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `${localStorage.getItem('token')}`, 
  },
});

