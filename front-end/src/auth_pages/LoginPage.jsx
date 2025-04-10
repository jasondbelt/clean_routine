//LOGINPAGE.JSX
// import Chakra UI components
import { VStack, Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useState } from 'react'
// import login function from API endpoint module
import { login } from '../endpoints/auth_api'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {

  // local state for storing user input
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const nav= useNavigate()
  
  // handle login button click
  const handleLogin = () => {
    login(username, password)
  }

  const handleNav = () => {
    nav('/register')
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
        <FormLabel>Password</FormLabel>
        <Input onChange={(e) => setPassword(e.target.value)} 
          value={password}
          type='password' />
      </FormControl>
      <Button onClick={handleLogin}>Login</Button>
      <Text onClick={handleNav}>Don't have an account? Sign up</Text>
    </VStack>
  )
}

export default LoginPage;