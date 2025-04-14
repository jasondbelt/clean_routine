import { VStack,Button, FormControl, FormLabel,
  Input, Text, Flex, Box } from "@chakra-ui/react";
import { useState } from "react";
import { register } from "../endpoints/auth_api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const [err, setErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRegister = async () => {
    try {
      const result = await register(username, email, password);

      if (result && result.username) {
        setSuccessMsg("Registration successful! Redirecting to login...");
        setErr("");

        setTimeout(() => {
          nav("/login");
        }, 1500);
      } else {
        setErr("Registration failed.");
        setSuccessMsg("");
      }
    } catch (error) {
      console.error("Registration request failed:", error);
      const backendError = error?.response?.data;
      const formattedError =
        typeof backendError === "object"
          ? Object.values(backendError).flat().join(" ")
          : "Something went wrong. Please try again later.";

      setErr(formattedError);
      setSuccessMsg("");
    }
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
            <FormLabel>Email</FormLabel>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
