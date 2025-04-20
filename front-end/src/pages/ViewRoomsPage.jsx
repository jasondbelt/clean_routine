//VIEWROOMSPAGE.JSX
// define base urls for rooms and tasks from backend API
// const BASE_URL = 'http://127.0.0.1:8000/'
// const BASE_ROOMS_URL = `${BASE_URL}api/rooms/`
// path('roomname/<str:room_name>/', A_room.as_view(), name='room'),
// const BASE_TASKS_URL = `${BASE_URL}/api/tasks/`
// path('day/<str:day>/', Tasks_by_day.as_view(), name='tasks_by_day'),
// path('room_id/<int:room_id>/', CR_all_room_tasks.as_view(), name='cr_all_room_tasks'),
// path('room_id/<int:room_id>/task_id/<int:task_id>/', RUD_room_tasks.as_view(), name='ud_room_tasks')
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
import '../css_files/view_rooms.css'  // Import the CSS file

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
      await axios.delete(`${BASE_ROOMS_URL}roomname/${name}/`, { withCredentials: true });
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
    if (!newName.trim()) {
      alert('Room name cannot be empty or just spaces.');
      return;
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
      console.error('Update error:', err);
    }
  };

  return (
    <Box className="container">
      <Heading className="heading">Your Rooms</Heading>
      <Text className="subheading">
        Capitalized Format Required for Room Name Edits!
      </Text>

      <Button className="loadRoomsButton" colorScheme="teal" mb="2rem" onClick={fetchRooms}>
        Load Rooms
      </Button>

      {hasLoaded && rooms.length === 0 && <Text className="noRoomsText">No rooms currently added.</Text>}

      <SimpleGrid columns={[1, 2, 3]} spacing="1.5rem">
        {rooms.map((room, index) => (
          <Card key={index} className="roomCard">
            <CardHeader className="cardHeader">
              {editingRoom === room.room_name ? (
                <Input className="editInput" size="sm" value={newName} onChange={(e) => setNewName(e.target.value)} />
              ) : (
                <Heading className="cardTitle">{room.room_name}</Heading>
              )}
              <HStack className="cardActions" spacing="2">
                {editingRoom === room.room_name ? (
                  <>
                    <Button className="saveButton" size="sm" onClick={() => handleSave(room.room_name)}>
                      Save
                    </Button>
                    <Button className="cancelButton" size="sm" onClick={() => setEditingRoom(null)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="editButton" size="sm" colorScheme="blue" variant="outline" onClick={() => handleEdit(room.room_name)}>
                      Edit
                    </Button>
                    <Button className="deleteButton" size="sm" colorScheme="red" variant="outline" onClick={() => handleDelete(room.room_name)}>
                      Delete
                    </Button>
                  </>
                )}
              </HStack>
            </CardHeader>

            <CardBody>
              <Image src={room.image_url} alt={`${room.room_name} image`} borderRadius="md" mb="3" />
              {room.room_tasks.length > 0 ? (
                <>
                  <Flex justify="space-between" align="center" mb="2">
                    <Text fontWeight="bold">Tasks:</Text>
                    <Button className="addTaskButton" size="sm" colorScheme="green" variant="outline">
                      Add
                    </Button>
                  </Flex>
                  <List className="taskList" spacing={2}>
                    {room.room_tasks.map((task, i) => (
                      <ListItem key={i}>
                        <Flex className="taskItem" justify="space-between" align="center">
                          <Text className="taskInfo">
                            <span className="taskDescription">{task.description}</span><br />
                            <span>{task.day_of_week} at {task.time_of_day}</span>
                          </Text>
                          <HStack spacing="2">
                            <Button className="editButton" size="xs" colorScheme="blue" variant="outline">
                              Edit
                            </Button>
                            <Button className="deleteButton" size="xs" colorScheme="red" variant="outline">
                              Delete
                            </Button>
                          </HStack>
                        </Flex>
                        {i < room.room_tasks.length - 1 && <Divider className="divider" />}
                      </ListItem>
                    ))}
                  </List>
                </>
              ) : (
                <Flex justify="space-between" align="center" mb="2">
                  <Text className="noTasksText">No tasks assigned.</Text>
                  <Button className="addTaskButton" size="sm" colorScheme="green" variant="outline">
                    Add
                  </Button>
                </Flex>
              )}
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ViewRoomsPage;
