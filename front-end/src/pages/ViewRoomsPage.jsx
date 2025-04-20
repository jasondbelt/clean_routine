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
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Image,
  SimpleGrid,
  List,
  ListItem,
  Divider,
  Flex,
  HStack,
} from '@chakra-ui/react';

const BASE_URL = 'http://127.0.0.1:8000/';
const BASE_ROOMS_URL = `${BASE_URL}api/rooms/`; // Ensure BASE_URL is defined

const ViewRoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);  // State to track if the button has been clicked

  const handleFetchRooms = async () => {
    try {
      const response = await axios.get(BASE_ROOMS_URL, {
        withCredentials: true,
      });
      console.log('Fetched Rooms:', response.data);
      setRooms(response.data);
      setHasLoaded(true);  // Set to true after rooms are fetched
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setHasLoaded(true);  // Set to true to display the message even in case of an error
    }
  };

  return (
    <Box p="2rem">
      <Heading mb="1rem">Your Rooms</Heading>
      <Button colorScheme="teal" mb="2rem" onClick={handleFetchRooms}>
        Load Rooms
      </Button>

      {/* Show message only after clicking the "Load Rooms" button */}
      {hasLoaded && rooms.length === 0 && (
        <Text>No rooms currently added.</Text>
      )}

      {/* Render rooms if available */}
      {rooms.length > 0 && (
        <SimpleGrid columns={[1, 2, 3]} spacing="1.5rem">
          {rooms.map((room, index) => (
            <Card key={index} maxW="sm" boxShadow="md" borderRadius="md" p="4">
              <CardHeader>
                <Flex justify="space-between" align="center">
                  <Heading size="md">{room.room_name}</Heading>
                  <HStack spacing="2">
                    <Button size="sm" colorScheme="blue" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" colorScheme="red" variant="outline">
                      Delete
                    </Button>
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
                  <>
                    <Flex justify="space-between" align="center" mb="2">
                      <Text>No tasks assigned.</Text>
                      <Button size="sm" colorScheme="green" variant="outline">
                        Add
                      </Button>
                    </Flex>
                  </>
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
