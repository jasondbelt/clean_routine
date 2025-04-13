import { Flex, Heading, List } from '@chakra-ui/react';
import {NavItem } from './nav-item'

export function LeftContent({ items }) {
  return (
    <Flex alignItems="center" justifyContent="space-between" gap={4}>
      <Heading color="teal" fontWeight="black">
        Clean Routine
      </Heading>
      <List gap={2} display={{ base: "none", md: "flex" }}>
        {items.map((item) => (
          <NavItem key={item.label}{...item}/>
        ))}
      </List>
    </Flex>
  );
}
