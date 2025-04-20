import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Button, Card, CardHeader, CardBody, Heading, Text, Input,
  Image, SimpleGrid, Flex, HStack, Select, VStack, FormControl, FormLabel, useToast
} from '@chakra-ui/react';
import '../css_files/add_rooms.css'; // Import the CSS file

const BASE_URL = 'http://127.0.0.1:8000/';
const BASE_ROOMS_URL = `${BASE_URL}api/rooms/`;
const BASE_ROOM_NAME_URL = `${BASE_ROOMS_URL}roomname/`;

const predefinedRoomNames = ['Bathroom', 'Bedroom', 'Garage', 'Kitchen', 'Laundry Room', 'Office'];

const AddRoomsPage = () => {
  const [roomName, setRoomName] = useState('');
  const [selectedDropdown, setSelectedDropdown] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [newName, setNewName] = useState('');
  const toast = useToast();

  // Fetch rooms from the API
  const fetchRooms = async () => {
    try {
      const res = await axios.get(BASE_ROOMS_URL, { withCredentials: true });
      setRooms(res.data);
    } catch (err) {
      console.error('Error fetching rooms:', err);
    }
  };

  // Fetch rooms on component mount
  useEffect(() => {
    fetchRooms();
  }, []);

  const handleAddRoom = async (e) => {
    e.preventDefault();
    const roomData = { room_name: roomName, image_url: imageUrl.trim() || undefined };
    try {
      await axios.post(`${BASE_ROOM_NAME_URL}${roomName}/`, roomData, { withCredentials: true });
      toast({ title: 'Room created successfully!', status: 'success', duration: 2000, isClosable: true });
      setRoomName(''); setSelectedDropdown(''); setImageUrl('');
      fetchRooms();
    } catch (error) {
      console.error(error)
      toast({ title: 'Failed to create room.', status: 'error', duration: 2000, isClosable: true });
    }
  };

  const handleDelete = async (name) => {
    try {
      await axios.delete(`${BASE_ROOM_NAME_URL}${name}/`, { withCredentials: true });
      fetchRooms();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleSave = async (originalName) => {
    if (!newName.trim()) return alert('Room name cannot be empty.');
    try {
      await axios.put(`${BASE_ROOM_NAME_URL}${originalName}/`, { room_name: newName }, { withCredentials: true });
      setEditingRoom(null);
      fetchRooms();
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const handleDropdownChange = (e) => {
    setSelectedDropdown(e.target.value);
    setRoomName(e.target.value);
  };

  return (
    <Box p="2rem">
      <Heading className="centered-heading" mb="1rem">Room Manager</Heading>

      <Box mb="3rem">
        <Heading className="centered-heading" size="md" mb="1rem">Add New Room</Heading>
        <form onSubmit={handleAddRoom} className="add-room-form">
          <VStack spacing="1rem" align="start">
            <FormControl>
              <FormLabel className="form-label">Choose a Room Name:</FormLabel>
              <Select value={selectedDropdown} onChange={handleDropdownChange} placeholder="Custom">
                {predefinedRoomNames.map((name, index) => (
                  <option key={index} value={name}>{name}</option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired className="form-input">
              <FormLabel className="form-label">Room Name:</FormLabel>
              <Input value={roomName} onChange={(e) => setRoomName(e.target.value)} maxLength={20} disabled={selectedDropdown !== ''} />
            </FormControl>

            <FormControl className="form-input">
              <FormLabel className="form-label">Room Image URL:</FormLabel>
              <Input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            </FormControl>

            <Button type="submit" colorScheme="teal">Create Room</Button>
          </VStack>
        </form>
      </Box>

      <Box>
        {rooms.length === 0 ? <Text>No rooms currently added.</Text> : (
          <SimpleGrid columns={[1, 2, 3]} spacing="1.5rem">
            {rooms.map((room, index) => (
              <Card key={index} maxW="sm" boxShadow="md" borderRadius="md" p="4">
                <CardHeader>
                  <Flex justify="space-between" align="center">
                    {editingRoom === room.room_name ? (
                      <>
                        <Input size="sm" value={newName} onChange={(e) => setNewName(e.target.value)} />
                        <HStack spacing="2">
                          <Button size="sm" colorScheme="green" onClick={() => handleSave(room.room_name)}>Save</Button>
                          <Button size="sm" onClick={() => setEditingRoom(null)}>Cancel</Button>
                        </HStack>
                      </>
                    ) : (
                      <>
                        <Heading size="md">{room.room_name}</Heading>
                        <HStack spacing="2">
                          <Button size="sm" colorScheme="blue" variant="outline" onClick={() => setEditingRoom(room.room_name)}>Edit</Button>
                          <Button size="sm" colorScheme="red" variant="outline" onClick={() => handleDelete(room.room_name)}>Delete</Button>
                        </HStack>
                      </>
                    )}
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Image src={room.image_url} alt={`${room.room_name} image`} borderRadius="md" />
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default AddRoomsPage;
