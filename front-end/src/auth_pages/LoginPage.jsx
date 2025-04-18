import {VStack, Button, FormControl, FormLabel, 
  Input, Text, Flex, Box } from "@chakra-ui/react";
import { useState } from 'react';
import { login } from '../endpoints/auth_api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  // local states and nav function
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();
  const [err, setErr] = useState('')
  const [successMsg, setSuccessMsg] = useState('');

  // calls custom login function when user clicks login button
  const handleLogin = async () => {
    try {
      const success = await login(username, password);
      if (success) {
        setSuccessMsg('Login successful! Redirecting to homepage...');
        setErr('');
  
        // delays redirecting to give user time to see message
        setTimeout(() => {
          nav('/');
        }, 1000);
      } else {
        // shows error message for failed login
        setErr('Invalid username or password.');
        setSuccessMsg('');
      }
    // catches other unexpected errors
    } catch (error) {
      console.error('Login request failed:', error);
      setErr('Something went wrong. Please try again later.');
      setSuccessMsg('');
    }
  };
  
  // naviages to registration page when user clicks signup text
  const handleNav = () => {
    nav('/register');
  };

  return (
    // centered container uses Chakra UI FlexBox
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
          {successMsg && <Text color="green.500">{successMsg}</Text>}
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
