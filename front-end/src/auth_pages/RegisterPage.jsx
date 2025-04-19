import { VStack, Button, FormControl, FormLabel, Input, Text, Flex, Box } from "@chakra-ui/react";
import { useState } from "react";
import { register } from "../endpoints/auth_api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  // state variables to manage form inputs and feedback messages
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const nav = useNavigate();

  // handles form submission using backend register API endpoint
  const handleRegister = async () => {
    try {
      const result = await register(username, email, password);

      if (result && result.username) {
        setSuccessMsg("Registration successful! Redirecting to login...");
        setErr("");
        // re-direct to login page after short delay
        setTimeout(() => nav("/login"), 1500);
      } else {
        // results from backend point of failure
        setErr("Registration failed.");
        setSuccessMsg("");
      }
    } catch (error) {
      // catch all for other errors
      console.error("Registration failed:", error);
      setErr("Registration failed. Please try again.");
      setSuccessMsg("");
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50" px={4}>
      <Box bg="white" p={8} rounded="md" shadow="md" w="100%" maxW="md">
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
          </FormControl>
          <Button colorScheme="teal" width="full" onClick={handleRegister}>
            Register
          </Button>
          {successMsg && <Text color="green.500">{successMsg}</Text>}
          {err && <Text color="red.500">{err}</Text>}
        </VStack>
      </Box>
    </Flex>
  );
};

export default RegisterPage;