import React from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  List,
  ListItem,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { logout } from '../endpoints/auth_api';
import { isAuthenticated } from './utilities/isAuthenticated' // Import isAuthenticated

const menuItemsLoggedIn = [
  { label: "Home", url: "/" },
  { label: "About", url: "/about/" },
  { label: "Rooms", url: "/rooms/" },
  { label: "Weather", url: "/weather/" },
  { label: "Logout", action: true },
];

const menuItemsLoggedOut = [
  { label: "Home", url: "/" },
  { label: "About", url: "/about/" },
  { label: "Login", url: "/login/" },
];

export function Navbar() {
  const navigate = useNavigate();
  const isUserAuthenticated = isAuthenticated(); // Check if the user is logged in

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate('/login');
    } else {
      console.error('Logout failed');
    }
  };

  // Choose the appropriate menu items based on the authentication status
  const menuItems = isUserAuthenticated ? menuItemsLoggedIn : menuItemsLoggedOut;

  return (
    <Flex
      as="nav"
      w="100%"
      p={4}
      align="center"
      borderBottomWidth={1}
    >
      {/* Left: Logo */}
      <Heading color="teal" fontWeight="black" fontSize="4xl" whiteSpace="nowrap">
        Clean Routine
      </Heading>

      {/* Center: Menu items */}
      <Flex flex={1} justify="center">
        <List display="flex" gap={2} styleType="none" alignItems="center">
          {menuItems.map(({ label, url, action }) => (
            <ListItem key={label}>
              {action ? (
                <Button
                  onClick={handleLogout}
                  colorScheme="teal"
                  variant="ghost"
                  _hover={{ bg: 'teal.50' }}
                  _active={{ bg: 'teal.100' }}
                >
                  {label}
                </Button>
              ) : (
                <Button
                  as={RouterLink}
                  to={url}
                  colorScheme="teal"
                  variant="ghost"
                  _hover={{ bg: 'teal.50' }}
                  _active={{ bg: 'teal.100' }}
                >
                  {label}
                </Button>
              )}
            </ListItem>
          ))}
        </List>
      </Flex>

      {/* Right: empty for now, helps with centering */}
      <Box w="120px" /> {/* Optional: Reserve space for future right content */}
    </Flex>
  );
}
