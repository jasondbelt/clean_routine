//LOGINPAGE.JSX
// import Chakra UI components
import { VStack, Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useState } from 'react'
// import login function from API endpoint module
// import { login } from '../endpoints/auth_api'
import { register } from '../endpoints/auth_api'

const RegisterPage = () => {

  // local state for storing user input
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  
  // handle register button click
  const handleRegister = async () => {
    try {
      const result = await register(username, email, password)
      console.log("Registration successful", result)
    } catch (error) {
      console.error("Registration failed", error.response?.data || error.message)
    }
  }
  
  


  return (
    // onChange updates state on input change
    // value is controlled component bound to state
    <VStack>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input onChange={(e) => setUsername(e.target.value)} 
          value={username}
          type='text' />
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input onChange={(e) => setEmail(e.target.value)} 
          value={email}
          type='text' />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input onChange={(e) => setPassword(e.target.value)} 
          value={password}
          type='password' />
      </FormControl>
      <Button onClick={handleRegister}>Register</Button>
    </VStack>
  )
}

export default RegisterPage;