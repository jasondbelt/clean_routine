import React from 'react'
import { HStack } from '@chakra-ui/react'
import { RightContent } from './right-content';
import { LeftContent } from './left-content';

const menuItems = [
  {
    label: "Home",
    url: "#",
  },
  {
    label: "Info",
    url: "#",
  },
  {
    label: "Blog",
    url: "#",
    subitems: [
      {
        label: "React",
        url: "#",
      },
      {
        label: "JavaScript",
        url: "#",
      },
      {
        label: "Next.js",
        url: "#",
      },
    ],
  },
  {
    label: "Contact",
    url: "#",
  },
];

export function Menu () {
  return (
    <nav>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.label}>
            <a href={item.url} className="text-blue-500 hover:underline">
              {item.label}
            </a>
            {item.subitems && (
              <ul className="ml-4 mt-1 space-y-1">
                {item.subitems.map((subitem) => (
                  <li key={subitem.label}>
                    <a href={subitem.url} className="text-blue-400 hover:underline">
                      {subitem.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};


export function Navbar() {
  return (
    <HStack w="full" alignItems="center" 
      p={2} 
      justifyContent="space-between"
      borderBottomWidth={1}>
      {/* left content */}
      {/* right content */}
      <LeftContent items={menuItems}/>
      <RightContent />
      {/* mobile content */}
    </HStack>
  );
}