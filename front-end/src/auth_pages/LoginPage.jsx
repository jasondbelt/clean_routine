//LOGINPAGE.JSX
// import Chakra UI components
import { VStack, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from 'react'
// import login function from API endpoint module
import { login } from '../endpoints/auth_api'

const LoginPage = () => {

  // local state for storing user input
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  // handle login button click
  const handleLogin = () => {
    login(username, password)
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
    </VStack>
  )
}

export default LoginPage;