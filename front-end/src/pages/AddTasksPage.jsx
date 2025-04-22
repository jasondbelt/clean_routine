import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
  HStack,
  useToast,
  Heading,
} from '@chakra-ui/react';
import '../css_files/add_tasks.css';

const AddTasksPage = () => {
  const [rooms, setRooms] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [roomId, setRoomId] = useState('');
  const [description, setDescription] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('Monday');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const toast = useToast();

  const fetchRoomsAndTasks = useCallback(async () => {
    try {
      const [roomsRes, tasksRes] = await Promise.all([
        axios.get('http://127.0.0.1:8000/api/rooms/', { withCredentials: true }),
        axios.get('http://127.0.0.1:8000/api/tasks/', { withCredentials: true }),
      ]);

      if (roomsRes.status === 200) {
        setRooms(roomsRes.data);
        if (roomsRes.data.length > 0) {
          setRoomId(roomsRes.data[0].id);
        }
      }

      if (tasksRes.status === 200) {
        setTasks(tasksRes.data);
      }
    } catch (err) {
      toast({
        title: 'Error fetching rooms or tasks.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      console.error(err);
    }
  }, [toast]);

  useEffect(() => {
    fetchRoomsAndTasks();
  }, [fetchRoomsAndTasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      description,
      day_of_week: dayOfWeek,
      time_of_day: timeOfDay,
    };

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/tasks/room_id/${roomId}/task_id/0/`,
        taskData,
        { withCredentials: true }
      );

      if (response.status === 201) {
        toast({
          title: 'Task added successfully!',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });

        fetchRoomsAndTasks();
        setDescription('');
        setDayOfWeek('Monday');
        setTimeOfDay('');
      }
    } catch (err) {
      toast({
        title: 'Error adding task.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      console.error(err);
    }
  };

  const deleteTask = async (roomId, taskId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/tasks/room_id/${roomId}/task_id/${taskId}/`,
        { withCredentials: true }
      );
      fetchRoomsAndTasks();
    } catch (err) {
      toast({
        title: 'Error deleting task.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      console.error(err);
    }
  };

  const editTask = async (roomId, taskId) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/tasks/room_id/${roomId}/task_id/${taskId}/`,
        editValues,
        { withCredentials: true }
      );

      if (response.status === 201) {
        toast({
          title: 'Task updated successfully!',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        setEditingTaskId(null);
        setEditValues({});
        fetchRoomsAndTasks();
      }
    } catch (err) {
      toast({
        title: 'Error updating task.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      console.error(err);
    }
  };

  const getRoomName = (id) => {
    const room = rooms.find((room) => room.id === id);
    return room ? room.room_name : 'Unknown Room';
  };

  return (
    <Box bg="gray.50" minH="100vh" py={10} px={4}>
      <VStack spacing={10} align="center">
        <Box
          bg="white"
          p={6}
          borderRadius="md"
          boxShadow="lg"
          w="full"
          maxW="500px"
        >
          <Heading size="lg" textAlign="center" mb={4}>
            Task Manager (All Required)
          </Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Room</FormLabel>
                <Select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.room_name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  value={description}
                  maxLength={30}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Day of Week</FormLabel>
                <Select value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)}>
                  {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Time of Day</FormLabel>
                <Input
                  type="time"
                  value={timeOfDay}
                  onChange={(e) => setTimeOfDay(e.target.value)}
                />
              </FormControl>

              <Button colorScheme="blue" type="submit" w="full">
                Add Task
              </Button>
            </VStack>
          </form>
        </Box>

        <Box
          bg="white"
          p={6}
          borderRadius="md"
          boxShadow="lg"
          w="full"
          maxW="700px"
          textAlign="center"
        >
          <Heading size="md" mb={4}>
            Task List
          </Heading>
          <VStack spacing={4} align="center" w="full">
            {tasks.map((task) => (
              <Box key={task.id} borderBottom="1px solid" borderColor="gray.200" pb={3} w="full">
                {editingTaskId === task.id ? (
                  <VStack spacing={2} align="center">
                    <Input
                      value={editValues.description}
                      onChange={(e) =>
                        setEditValues({ ...editValues, description: e.target.value })
                      }
                      maxLength={30}
                    />
                    <Select
                      value={editValues.day_of_week}
                      onChange={(e) =>
                        setEditValues({ ...editValues, day_of_week: e.target.value })
                      }
                    >
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </Select>
                    <Input
                      type="time"
                      value={editValues.time_of_day}
                      onChange={(e) =>
                        setEditValues({ ...editValues, time_of_day: e.target.value })
                      }
                    />
                    <HStack spacing={3}>
                      <Button size="sm" colorScheme="green" onClick={() => editTask(task.room_id, task.id)}>
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => {
                        setEditingTaskId(null);
                        setEditValues({});
                      }}>
                        Cancel
                      </Button>
                    </HStack>
                  </VStack>
                ) : (
                  <VStack align="center" spacing={1}>
                    <Text fontWeight="bold">{task.description}</Text>
                    <Text color="gray.600">
                      {getRoomName(task.room_id)} — {task.day_of_week} at {task.time_of_day}
                    </Text>
                    <HStack spacing={3}>
                      <Button
                        size="sm"
                        colorScheme="yellow"
                        onClick={() => {
                          setEditingTaskId(task.id);
                          setEditValues({
                            description: task.description,
                            day_of_week: task.day_of_week,
                            time_of_day: task.time_of_day,
                          });
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => deleteTask(task.room_id, task.id)}
                      >
                        Delete
                      </Button>
                    </HStack>
                  </VStack>
                )}
              </Box>
            ))}
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default AddTasksPage;
