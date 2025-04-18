//AUTH_API.jsx
import axios from 'axios'

// urls from backend API
const BASE_URL = 'http://127.0.0.1:8000/'
const QUOTES_URL = `${BASE_URL}api/quotes/randomquote/`
const FORECAST_URL = `${BASE_URL}api/weather/forecast/`

// Backend returns { id, quote, author } from third party api
export const get_random_quote = async () => {
  try {
    const response = await axios.get(QUOTES_URL);
    return response.data;
  } catch (error) {
    console.error("API call failed:", error);
    return null;
  }
};

// Backend returns weather data from third party api
export const get_forecast = async (city) => {
  try {
    const response = await axios.get(`${FORECAST_URL}${city}/`);
    // Contains weather data defined in backend
    return response.data; 
  } catch (error) {
    console.error("Forecast API call failed:", error);
    return null;
  }
};

