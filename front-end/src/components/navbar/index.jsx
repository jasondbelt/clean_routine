import React from 'react'
import { HStack, Box, Link as ChakraLink } from '@chakra-ui/react'
import { RightContent } from './right-content';
import { LeftContent } from './left-content'
import { Link as RouterLink } from 'react-router-dom'

const menuItems = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "About",
    url: "/about/",
  },
  // {
  //   label: "Blog",
  //   url: "#",
  //   subitems: [
  //     {
  //       label: "React",
  //       url: "#",
  //     },
  //     {
  //       label: "JavaScript",
  //       url: "#",
  //     },
  //     {
  //       label: "Next.js",
  //       url: "#",
  //     },
  //   ],
  // },
  {
    label: "Rooms",
    url: "/rooms/",
  },
  {
    label: "Shopping",
    url: "/shopping/",
  },
  {
    label: "Login",
    url: "/login/",
  },
  {
    label: "Logout",
    action: true,
  },
];

export function Menu() {
  return (
    <Box as="nav">
      <Box as="ul" className="space-y-2" listStyleType="none">
        {menuItems.map((item) => (
          <Box as="li" key={item.label}>
            <ChakraLink
              as={RouterLink}
              to={item.url}
              color="blue.500"
              _hover={{ textDecoration: 'underline' }}
            >
              {item.label}/
            </ChakraLink>
            {item.subitems && (
              <Box as="ul" ml={4} mt={1} className="space-y-1" listStyleType="none">
                {item.subitems.map((subitem) => (
                  <Box as="li" key={subitem.label}>
                    <ChakraLink
                      as={RouterLink}
                      to={subitem.url}
                      color="blue.400"
                      _hover={{ textDecoration: "underline", bg: "teal.50" }}
                      _active={{ bg: "teal.100" }}
                      px={2}
                      py={1}
                      borderRadius="md"
                      display="inline-block"
                    >
                      {subitem.label}
                    </ChakraLink>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export function Navbar() {
  return (
    <HStack w="full" alignItems="center" 
      p={2} 
      justifyContent="space-between"
      borderBottomWidth={1}>
      {/* left content */}
      {/* right content */}
      <LeftContent items={menuItems}/>
      {/* <RightContent /> */}
      {/* mobile content */}
    </HStack>
  );
}