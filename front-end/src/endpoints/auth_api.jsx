//AUTH_API.jsx
import axios from 'axios'

// urls from backend API
const BASE_URL = 'http://127.0.0.1:8000/'
const LOGIN_URL = `${BASE_URL}api/users/token/`
const NOTES_URL = `${BASE_URL}api/users/notes/`
const LOGOUT_URL = `${BASE_URL}api/users/logout/`
const AUTH_URL = `${BASE_URL}api/users/authenticated/`
const REGISTER_URL = `${BASE_URL}api/users/register/`

// sends username and function to backend
// if successul, backend sets JWT tokens in cookies
export const login = async (username, password) => {
  try {
    const response = await axios.post(
      LOGIN_URL,
      { username, password },
      { withCredentials: true }
    );

    if (response.data.success) {
      // ✅ Store a user object or flag in localStorage
      localStorage.setItem("user", JSON.stringify({ username }));
    }

    return response.data.success;
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
};


// test function
export const get_notes = async () => {
  try {
    // Attempt to fetch notes
    const response = await axios.get(NOTES_URL, {
      withCredentials: true, // Include credentials (cookies)
    });
    return response.data; // Return fetched notes
  } catch (error) {
    console.error("Failure to retrieve notes:", error);
    return false;
  }
};

// sends post request to clear cookies
// backend deletes the tokens stored in cookies
export const logout = async () => {
  try {
    await axios.post(LOGOUT_URL,
      {},
      { withCredentials: true }
    )
    localStorage.removeItem("user")
    return true
  } catch (error) {
    console.error("Logout failed:", error);
    return false; 
  }
}

// checks user authentication from backend
export const is_authenticated = async () => {
  try {
    await axios.post(AUTH_URL, {}, {withCredentials: true})
    console.log('Is authenticated')
    return true
  } catch (error) {
    console.error("Is not authenticated:", error)
    return false
  }
}

// registers new user with username, email, and password
export const register = async (username, email, password) => {
  const response = await axios.post(REGISTER_URL, 
    { username, email, password },
    { withCredentials: true }
  );
  return response.data;
}