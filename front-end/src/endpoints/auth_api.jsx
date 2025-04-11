//AUTH_API.jsx
import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/'
const LOGIN_URL = `${BASE_URL}api/users/token/`
const NOTES_URL = `${BASE_URL}api/users/notes/`
const LOGOUT_URL = `${BASE_URL}api/users/logout/`
const REGISTER_URL = `${BASE_URL}api/users/register/`
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


export const register = async (username, email, password) => {
  const response = axios.post(REGISTER_URL, 
    {username:username, email:email, password:password},
    { withCredentials:true}
  )
  return response.data
}





