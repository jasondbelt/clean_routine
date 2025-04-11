import { Flex, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'


export function RightContent() {
  return (
    <Flex alignItems="center" gap={2}>
      <IconButton 
        aria-label="search"
        icon={<FaSearch/>}
        variant="ghost"
        colorScheme="teal"
        display={{ base: "flex", md: "none" }}
        rounded="full"
        size="sm"
      />
      <InputGroup size="sm" display={{ base: "none", md: "flex" }}>
        <Input variant="filled" placeholder="Search..."/>
        <InputRightElement>
          <FaSearch color="teal"/>
        </InputRightElement>
      </InputGroup>
    </Flex>
  )
}