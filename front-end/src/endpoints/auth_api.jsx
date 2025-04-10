//AUTH_API.jsx
import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/'
const LOGIN_URL = `${BASE_URL}api/users/token/`

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