import {
  Button,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  List,
  useDisclosure,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import { logout } from '../../endpoints/auth_api';

export function NavItem({ label, url, subitems, action }) {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate('/login'); // or wherever you want to redirect
    } else {
      console.error('Logout failed');
    }
  };

  // If this NavItem has subitems, render a dropdown
  if (subitems) {
    return (
      <ListItem>
        <Popover placement="top-start" isOpen={isOpen}>
          <PopoverTrigger>
            <Button
              rightIcon={
                <FaChevronDown
                  style={{
                    transition: 'transform .2s ease 0s',
                    transform: isOpen ? 'rotate(-180deg)' : '',
                  }}
                />
              }
              colorScheme="teal"
              variant="ghost"
              onClick={onToggle}
            >
              {label}
            </Button>
          </PopoverTrigger>
          <PopoverContent width="full">
            <PopoverArrow />
            <PopoverBody>
              <List display="flex" flexDir="column" gap={4}>
                {subitems.map((subitem) => (
                  <ListItem key={subitem.label}>
                    <Link to={subitem.url} px={2} py={1}>
                      {subitem.label}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </ListItem>
    );
  }

  // Handle logout button
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

  // Default nav link
  return (
    <ListItem>
      <Button
        as={Link}
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
