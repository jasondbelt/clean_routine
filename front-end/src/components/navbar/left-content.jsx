import { Flex, Heading, List, ListItem, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export function LeftContent({ items }) {
  return (
    <Flex alignItems="center" justifyContent="space-between" gap={4}>
      <Heading color="teal" fontWeight="black">
        D2C
      </Heading>
      <List gap={2} display={{ base: "none", md: "flex" }}>
        {items.map((item) => (
          <ListItem key={item.label}>
            <Button 
              as={Link} 
              to={item.url} // Use 'to' for React Router Link component
              colorScheme="teal" 
              variant="ghost"
              _hover={{ textDecoration: "none", bg: "teal.50" }}
              _active={{ bg: "teal.100" }}
            >
              {item.label}
            </Button>
          </ListItem>
        ))}
      </List>
    </Flex>
  );
}
