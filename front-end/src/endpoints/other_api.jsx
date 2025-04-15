//AUTH_API.jsx
import axios from 'axios'

// urls from backend API
const BASE_URL = 'http://127.0.0.1:8000/'
const QUOTES_URL = `${BASE_URL}api/quotes/randomquote/`
const FORECAST_URL = `${BASE_URL}api/weather/forecast/`


export const get_random_quote = async () => {
  try {
    const response = await axios.get(QUOTES_URL);
    return response.data; // Backend already returns { id, quote, author }
  } catch (error) {
    console.error("API call failed:", error);
    return null;
  }
};


export const get_forecast = async (city) => {
  try {
    const response = await axios.get(`${FORECAST_URL}${city}/`);
    return response.data; // Contains location, weather, description, etc.
  } catch (error) {
    console.error("Forecast API call failed:", error);
    return null;
  }
};

