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
import { isAuthenticated } from './utilities/isAuthenticated';

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
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  // 🔁 Update auth state when route changes or when localStorage is updated
  // import { is_authenticated } from '../endpoints/auth_api'; // use backend auth check

useEffect(() => {
  const updateAuthStatus = async () => {
    const auth = await is_authenticated();
    setAuthenticated(auth);
  };

  updateAuthStatus(); // on mount and route change
  window.addEventListener('storage', updateAuthStatus); // for cross-tab sync

  return () => {
    window.removeEventListener('storage', updateAuthStatus);
  };
}, [location]);


  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      localStorage.removeItem('user');
      setAuthenticated(false);
      navigate('/login');
    } else {
      console.error('Logout failed');
    }
  };

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
