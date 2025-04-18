//MENUPAGE.jsx
// PURELY UTILIZED FOR DEBUGGING
import { VStack, Heading, Text, Button} from "@chakra-ui/react";
import { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { get_notes, logout } from "../endpoints/auth_api"

const MenuPage = () => {

  const [notes, setNotes] = useState([])
  const nav = useNavigate();

  // fetch notes when the component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      // call get_notes function
      const notes = await get_notes()
      // update the state with the fetched notes
      if (Array.isArray(notes)) {
        setNotes(notes)
      }
    }
    fetchNotes()
  }, [])

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      nav('/login')
    }
  }

  // for each notes, render the description inside a text component
  return (
    <VStack>
      <Heading>Welcome back user</Heading>
      <VStack>
        {notes.map((note) => {
          return <Text>{note.description}</Text>})}
        </VStack>
        <Button onClick={handleLogout}
          colorScheme="red">Logout
        </Button>
    </VStack>
  )
}

export default MenuPage;