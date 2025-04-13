import {
  VStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Flex,
  Box
} from "@chakra-ui/react";
import { useState } from 'react';
import { login } from '../endpoints/auth_api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();
  const [err, setErr] = useState('')

  
  const handleLogin = async () => {
    try {
      const success = await login(username, password);
      if (success) {
        nav('/'); // Redirect to homepage
      } else {
        setErr('Invalid username or password. User is not logged in.');
      }
    } catch (error) {
      console.error('Login request failed:', error);
      setErr('Something went wrong. Please try again later.');
    }
  };
  
  

  const handleNav = () => {
    nav('/register');
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50" px={4}>
      <Box bg="white" p={8} rounded="md" shadow="md" w="100%" maxW="md">
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
            />
          </FormControl>
          <Button colorScheme="teal" width="full" onClick={handleLogin}>
            Login
          </Button>
          {err && <Text color="red.500">{err}</Text>}

          <Text
            fontSize="sm"
            color="teal.600"
            cursor="pointer"
            onClick={handleNav}
          >
            Don't have an account? Sign up
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default LoginPage;
