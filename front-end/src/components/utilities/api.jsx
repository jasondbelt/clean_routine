// src/axiosConfig.js
import axios from 'axios';

// Set global axios defaults
axios.defaults.withCredentials = true;

// Optionally, set a base URL for all requests
axios.defaults.baseURL = 'http://localhost:8000';

// Export axios instance to use throughout your app
export default axios;
