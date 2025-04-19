//VIEWROOMSPAGE.JSX
// define base urls for rooms and tasks from backend API
const BASE_URL = 'http://127.0.0.1:8000/'
const BASE_ROOMS_URL = `${BASE_URL}api/rooms/`
// path('roomname/<str:room_name>/', A_room.as_view(), name='room'),
const BASE_TASKS_URL = `${BASE_URL}/api/tasks/`
// path('day/<str:day>/', Tasks_by_day.as_view(), name='tasks_by_day'),
// path('room_id/<int:room_id>/', CR_all_room_tasks.as_view(), name='cr_all_room_tasks'),
// path('room_id/<int:room_id>/task_id/<int:task_id>/', RUD_room_tasks.as_view(), name='ud_room_tasks')
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Button } from '@chakra-ui/react';

const ViewRoomsPage = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Available Rooms</h2>

      <Card maxW="sm" boxShadow="md" borderRadius="md" p="4">
        <CardHeader>
          <Heading size="md">Room 101</Heading>
        </CardHeader>

        <CardBody>
          <Text>Spacious room with natural lighting and a great view.</Text>
        </CardBody>

        <CardFooter>
          <Button colorScheme="teal">Book Now</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ViewRoomsPage;
