//AUTH_API.jsx
import axios from 'axios'

// urls from backend API
const BASE_URL = 'http://127.0.0.1:8000/'
const QUOTES_URL = `${BASE_URL}api/quotes/randomquote/`


export const get_random_quote = async () => {
  try {
    const response = await axios.get(QUOTES_URL);

    // Check if response contains the expected fields
    if (response.data && response.data.quote && response.data.author) {
      return {
        id: response.data.id,
        quote: response.data.quote,
        author: response.data.author,
      };
    } else {
      console.error("Unexpected API response:", response.data);
      return null;
    }

  } catch (error) {
    console.error("API call failed:", error);
    return null;
  }
};
