import { Button, ListItem, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, List, useDisclosure } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaChevronDown } from 'react-icons/fa'

export function NavItem({ label, url, subitems }) {
  const {isOpen, onToggle} = useDisclosure()

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
                    transform: isOpen? 'rotate(-180deg)':''
                  }}
                />
              }  
              colorScheme='teal'
              variant='ghost'
              onClick={onToggle}
            >
              {label}
            </Button>
          </PopoverTrigger>
          <PopoverContent width='full'>
            <PopoverArrow/>
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
    )
  }
  
  return (
    <ListItem>
      <Button 
        as={Link} 
        to={url} 
        colorScheme="teal" 
        variant="ghost"
        _hover={{ textDecoration: "none", bg: "teal.50" }}
        _active={{ bg: "teal.100" }}
      >
        {label}
      </Button>
    </ListItem>
  );
}
