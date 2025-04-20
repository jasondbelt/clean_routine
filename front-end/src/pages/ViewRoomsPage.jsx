//VIEWROOMSPAGE.JSX
// define base urls for rooms and tasks from backend API
// const BASE_URL = 'http://127.0.0.1:8000/'
// const BASE_ROOMS_URL = `${BASE_URL}api/rooms/`
// path('roomname/<str:room_name>/', A_room.as_view(), name='room'),
// const BASE_TASKS_URL = `${BASE_URL}/api/tasks/`
// path('day/<str:day>/', Tasks_by_day.as_view(), name='tasks_by_day'),
// path('room_id/<int:room_id>/', CR_all_room_tasks.as_view(), name='cr_all_room_tasks'),
// path('room_id/<int:room_id>/task_id/<int:task_id>/', RUD_room_tasks.as_view(), name='ud_room_tasks')
import { useState } from 'react';
import axios from 'axios';
import {
  Box, Button, Card, CardHeader, CardBody, Heading, Text, Input,
  Image, SimpleGrid, Flex, HStack, List, ListItem, Divider
} from '@chakra-ui/react';

const BASE_URL = 'http://127.0.0.1:8000/';
const BASE_ROOMS_URL = `${BASE_URL}api/rooms/`;

const ViewRoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [newName, setNewName] = useState('');

  const fetchRooms = async () => {
    try {
      const res = await axios.get(BASE_ROOMS_URL, { withCredentials: true });
      setRooms(res.data);
      setHasLoaded(true);
    } catch (err) {
      console.error('Error fetching rooms:', err);
      setHasLoaded(true);
    }
  };

  const handleDelete = async (name) => {
    try {
      await axios.delete(`${BASE_ROOMS_URL}roomname/${name}/`, {
        withCredentials: true,
      });
      fetchRooms();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleEdit = (name) => {
    setEditingRoom(name);
    setNewName(name);
  };

  const handleSave = async (originalName) => {
    // Check if the name is empty or contains only spaces
    if (!newName.trim()) {
      alert('Room name cannot be empty or just spaces.');
      return; // Do not proceed with the save if the name is invalid
    }

    try {
      await axios.put(
        `${BASE_ROOMS_URL}roomname/${originalName}/`,
        { room_name: newName },
        { withCredentials: true }
      );
      setEditingRoom(null);
      fetchRooms();
    } catch (err) {
      // Assuming the backend returns a meaningful error message, we'll show it in the alert
      const errorMessage = err.response?.data?.detail || 'Invalid room name!';
      alert(errorMessage);
      console.error('Update error:', err);
    }
  };

  return (
    <Box p="2rem">
      <Heading mb="1rem">Your Rooms</Heading>
      <Button colorScheme="teal" mb="2rem" onClick={fetchRooms}>
        Load Rooms
      </Button>

      {hasLoaded && rooms.length === 0 && <Text>No rooms currently added.</Text>}

      {rooms.length > 0 && (
        <SimpleGrid columns={[1, 2, 3]} spacing="1.5rem">
          {rooms.map((room, index) => (
            <Card key={index} maxW="sm" boxShadow="md" borderRadius="md" p="4">
              <CardHeader>
                <Flex justify="space-between" align="center">
                  {editingRoom === room.room_name ? (
                    <Input
                      size="sm"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  ) : (
                    <Heading size="md">{room.room_name}</Heading>
                  )}
                  <HStack spacing="2">
                    {editingRoom === room.room_name ? (
                      <>
                        <Button
                          size="sm"
                          colorScheme="green"
                          onClick={() => handleSave(room.room_name)}
                        >
                          Save
                        </Button>
                        <Button size="sm" onClick={() => setEditingRoom(null)}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          colorScheme="blue"
                          variant="outline"
                          onClick={() => handleEdit(room.room_name)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          colorScheme="red"
                          variant="outline"
                          onClick={() => handleDelete(room.room_name)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </HStack>
                </Flex>
              </CardHeader>

              <CardBody>
                <Image
                  src={room.image_url}
                  alt={`${room.room_name} image`}
                  borderRadius="md"
                  mb="3"
                />
                {room.room_tasks.length > 0 ? (
                  <>
                    <Flex justify="space-between" align="center" mb="2">
                      <Text fontWeight="bold">Tasks:</Text>
                      <Button size="sm" colorScheme="green" variant="outline">
                        Add
                      </Button>
                    </Flex>
                    <List spacing={2}>
                      {room.room_tasks.map((task, i) => (
                        <ListItem key={i}>
                          <Flex justify="space-between" align="center">
                            <Text>
                              <strong>{task.description}</strong><br />
                              <span>{task.day_of_week} at {task.time_of_day}</span>
                            </Text>
                            <HStack spacing="2">
                              <Button size="xs" colorScheme="blue" variant="outline">
                                Edit
                              </Button>
                              <Button size="xs" colorScheme="red" variant="outline">
                                Delete
                              </Button>
                            </HStack>
                          </Flex>
                          {i < room.room_tasks.length - 1 && <Divider my="2" />}
                        </ListItem>
                      ))}
                    </List>
                  </>
                ) : (
                  <Flex justify="space-between" align="center" mb="2">
                    <Text>No tasks assigned.</Text>
                    <Button size="sm" colorScheme="green" variant="outline">
                      Add
                    </Button>
                  </Flex>
                )}
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default ViewRoomsPage;
