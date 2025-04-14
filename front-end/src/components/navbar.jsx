import React from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  List,
  ListItem,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { logout } from '../endpoints/auth_api';

const menuItems = [
  { label: "Home", url: "/" },
  { label: "About", url: "/about/" },
  { label: "Rooms", url: "/rooms/" },
  { label: "Shopping", url: "/shopping/" },
  { label: "Login", url: "/login/" },
  { label: "Logout", action: true },
];

function NavItem({ label, url, action }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate('/login');
    } else {
      console.error('Logout failed');
    }
  };

  if (action) {
    return (
      <ListItem>
        <Button
          onClick={handleLogout}
          colorScheme="teal"
          variant="ghost"
          _hover={{ textDecoration: 'none', bg: 'teal.50' }}
          _active={{ bg: 'teal.100' }}
        >
          {label}
        </Button>
      </ListItem>
    );
  }

  return (
    <ListItem>
      <Button
        as={RouterLink}
        to={url}
        colorScheme="teal"
        variant="ghost"
        _hover={{ textDecoration: 'none', bg: 'teal.50' }}
        _active={{ bg: 'teal.100' }}
      >
        {label}
      </Button>
    </ListItem>
  );
}

function LeftContent({ items }) {
  return (
    <Flex alignItems="center" justifyContent="space-between" gap={4}>
      <Heading color="teal" fontWeight="black">
        Clean Routine
      </Heading>
      <List gap={2} display={{ base: "none", md: "flex" }} styleType="none">
        {items.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </List>
    </Flex>
  );
}

export function Navbar() {
  return (
    <HStack
      w="full"
      alignItems="center"
      p={2}
      justifyContent="space-between"
      borderBottomWidth={1}
    >
      <LeftContent items={menuItems} />
      {/* Add RightContent or mobile menu if needed */}
    </HStack>
  );
}
