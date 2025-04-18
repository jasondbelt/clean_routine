import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  List,
  ListItem,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { logout, is_authenticated } from '../endpoints/auth_api';

// menu items for authenticated users
// action means it triggers a function
const menuItemsLoggedIn = [
  { label: "Home", url: "/" },
  { label: "About", url: "/about/" },
  { label: "Add Rooms", url: "/addrooms/" },
  { label: "View Rooms", url: "/viewrooms/" },
  { label: "Schedule", url: "/schedule/" },
  { label: "Weather", url: "/weather/" },
  { label: "Logout", action: true },
];

// menu items for unauthenticated users
const menuItemsLoggedOut = [
  { label: "Home", url: "/" },
  { label: "About", url: "/about/" },
  { label: "Login", url: "/login/" },
];

export function Navbar() {
  const navigate = useNavigate();
  // hook to get current route
  const location = useLocation();
  // track login status, initially set to false
  const [authenticated, setAuthenticated] = useState(false);

  // checks login status on mount and whenever location changes
  useEffect(() => {
    const updateAuthStatus = async () => {
      const auth = await is_authenticated();
      setAuthenticated(auth);
    };
    // initial authentication check
    updateAuthStatus();
    // listen for storage changes to sycn auth status across tabs
    window.addEventListener('storage', updateAuthStatus);

    return () => {
      window.removeEventListener('storage', updateAuthStatus);
    };
  }, [location]);

  // handles logout process utilizing logout API
  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      // clears auth state and redirects to login page
      setAuthenticated(false);
      navigate('/login');
    } else {
      console.error('Logout failed');
    }
  };

  // determines which menuItems to show based on auth status
  const menuItems = authenticated ? menuItemsLoggedIn : menuItemsLoggedOut;

  return (
    <Flex as="nav" w="100%" p={4} align="center" borderBottomWidth={1}>
      <Heading color="teal" fontWeight="black" fontSize="4xl" whiteSpace="nowrap">
        Clean Routine
      </Heading>

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

      <Box w="120px" />
    </Flex>
  );
}

