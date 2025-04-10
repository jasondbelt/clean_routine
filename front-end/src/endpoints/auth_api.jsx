//AUTH_API.jsx
import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/'
const LOGIN_URL = `${BASE_URL}api/users/token/`
const REFRESH_URL = `${BASE_URL}api/users/token/refresh/`
const NOTES_URL = `${BASE_URL}api/users/notes/`
const LOGOUT_URL = `${BASE_URL}api/users/logout/`

// takes in username and password, sends to backend for authentication
// tested by going to application/cookies and seeing access and refresh token
// in google developer tools
export const login = async (username, password) => {
  const response = await axios.post(LOGIN_URL,
    // json object data sent in body of request (what the user typed)
    // {
    //   "username": "whateverTheUserTyped",
    //   "password": "whateverTheUserTyped"
    // }
    {username:username, password:password},
    // includes cookes in the request
    { withCredentials:true}
  )
  // if it was just response.data, you'd just see success boolean
  return response.data.success
}


// Function to refresh the authentication token
export const refresh_token = async () => {
  try {
    const response = await axios.post(
      REFRESH_URL,           
      {},                   
      { withCredentials: true }
    );

    return response.data.refreshed; // Return whether the refresh was successful
  } catch (error) {
    console.error("Token refresh failed:", error);
    return false; // Return false if refresh failed
  }
};

// Function to fetch notes from the backend with retry logic on token expiration
export const get_notes = async () => {
  try {
    // Attempt to fetch notes
    const response = await axios.get(
      NOTES_URL,
      { withCredentials: true } // Include credentials (cookies)
    );
    return response.data; // Return fetched notes
  } catch (error) {
    // Check if error is due to 401 Unauthorized (token expired)
    if (error.response && error.response.status === 401) {
      // Try refreshing the token
      const tokenRefreshed = await refresh_token();

      if (tokenRefreshed) {
        // Retry fetching notes after token refresh
        const retryResponse = await axios.get(NOTES_URL, { withCredentials: true });
        return retryResponse.data; // Return the notes after retry
      }
    }
    // If token refresh fails or another error occurs, return false
    return false;
  }
};


export const logout = async () => {
  try {
    await axios.post(LOGOUT_URL,
      {},
      { withCredentials: true }
    )
    return true
  } catch (error) {
    console.error("Logout failed:", error);
    return false; // Return false if refresh failed
  }
}





