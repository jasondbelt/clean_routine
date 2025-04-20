//VIEWROOMSPAGE.JSX
// define base urls for rooms and tasks from backend API
// const BASE_URL = 'http://127.0.0.1:8000/'
// const BASE_ROOMS_URL = `${BASE_URL}api/rooms/`
// path('roomname/<str:room_name>/', A_room.as_view(), name='room'),
// const BASE_TASKS_URL = `${BASE_URL}/api/tasks/`
// path('day/<str:day>/', Tasks_by_day.as_view(), name='tasks_by_day'),
// path('room_id/<int:room_id>/', CR_all_room_tasks.as_view(), name='cr_all_room_tasks'),
// path('room_id/<int:room_id>/task_id/<int:task_id>/', RUD_room_tasks.as_view(), name='ud_room_tasks')
// import { useState } from 'react';
// import axios from 'axios';
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Heading,
//   Text,
//   Button,
//   SimpleGrid,
//   Box,
//   VStack,
// } from '@chakra-ui/react';
{/* <Box p="2rem">
      <VStack spacing="1.5rem" align="start">
        <Heading mb="0.5rem">Available Rooms</Heading>
        <Button colorScheme="teal" onClick={handleFetchRooms}>
          Load Rooms
        </Button>

        <SimpleGrid columns={[1, 2, 3]} spacing="1.5rem" w="full">
          {rooms.map((room) => (
            <Card key={room.id} maxW="sm" boxShadow="md" borderRadius="md" p="4">
              <CardHeader>
                <Heading size="md">{room.room_name || `Room ${room.id}`}</Heading>
              </CardHeader>

              <CardBody>
                <Text mb="2">{room.image_url || 'No image URL provided.'}</Text>
                <Text>{room.room_tasks || 'No tasks listed.'}</Text>
              </CardBody>

              <CardFooter>
                <Button colorScheme="teal">Book Now</Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  ); */}
  import { useState } from 'react';
  import axios from 'axios';
  import { Button, Box, Heading, Text } from '@chakra-ui/react';
  
  const BASE_URL = 'http://127.0.0.1:8000/'
  const BASE_ROOMS_URL = `${BASE_URL}api/rooms/`; // Ensure BASE_URL is defined
  
  const ViewRoomsPage = () => {
    const [rooms, setRooms] = useState([]);
  
    const handleFetchRooms = async () => {
      try {
        const response = await axios.get(BASE_ROOMS_URL, {
          withCredentials: true,
        });
        console.log('Fetched Rooms:', response.data);
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
  
    return (
      <Box p="2rem">
        <Heading mb="1rem">Fetch Rooms JSON</Heading>
        <Button colorScheme="teal" onClick={handleFetchRooms}>
          Submit
        </Button>
  
        <Box mt="2rem" whiteSpace="pre-wrap" fontFamily="monospace">
          <Text>{JSON.stringify(rooms, null, 2)}</Text>
        </Box>
      </Box>
    );
  };
  
  export default ViewRoomsPage;
  
