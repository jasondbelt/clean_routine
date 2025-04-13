//REGISTERPAGE.JSX
import { VStack, Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useState } from 'react';
import { register } from '../endpoints/auth_api';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();
  const [err, setErr] = useState('')

 const handleRegister = async () => {
    try {
      const success = await register(username, email, password);
      if (success) {
        nav('/login'); // Redirect to homepage
      } else {
        setErr('Invalid username or password. User is not logged in.');
      }
    } catch (error) {
      console.error('Registration request failed:', error);
      setErr('Something went wrong. Please try again later.');
    }
  };

  return (
    <VStack spacing={4}>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input onChange={(e) => setUsername(e.target.value)} value={username} type='text' />
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input onChange={(e) => setEmail(e.target.value)} value={email} type='text' />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input onChange={(e) => setPassword(e.target.value)} value={password} type='password' />
      </FormControl>
      <Button onClick={handleRegister}>Register</Button>
      {err && <Text color="red.500">{err}</Text>}
    </VStack>
  );
};

export default RegisterPage;
