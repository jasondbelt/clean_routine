import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {
  Box, Button, FormControl, FormLabel, Input, Select, Text,
  VStack, HStack, useToast, Heading,
} from '@chakra-ui/react';
import '../css_files/add_tasks.css';

// Days of the week array used in dropdowns
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const AddTasksPage = () => {
  // state to store rooms and tasks fetched from backend
  const [rooms, setRooms] = useState([]);
  const [tasks, setTasks] = useState([]);
  // state to manage form inputs for adding a task
  const [formData, setFormData] = useState({
    roomId: '',
    description: '',
    dayOfWeek: 'Monday',
    timeOfDay: '',
  });
  // state to track which task and its values are being edited
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editValues, setEditValues] = useState({});
  // Charka UI utilized for displaying user feedback
  const toast = useToast();

  // fetch room and tasks from the backend concurrently
  const fetchData = useCallback(async () => {
    try {
      const [roomRes, taskRes] = await Promise.all([
        axios.get('http://127.0.0.1:8000/api/rooms/', { withCredentials: true }),
        axios.get('http://127.0.0.1:8000/api/tasks/', { withCredentials: true }),
      ]);
      // set room data
      if (roomRes.status === 200) {
        setRooms(roomRes.data);
        // set default roomID in form if it's empty and rooms exist
        if (roomRes.data.length && !formData.roomId) {
          setFormData(prev => ({ ...prev, roomId: roomRes.data[0].id }));
        }
      }
      // set task data
      if (taskRes.status === 200) {
        setTasks(taskRes.data);
      }
    // show error to user utilzzing toast and log it
    } catch (err) {
      toast({
        title: 'Error loading data.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error(err);
    }
  }, [formData.roomId, toast]);

  // run fetchData on compoment mount or whenever its reference changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // updates form data when a form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // handle form submission utilizing post method from backend
  // to add a task for selected room
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { roomId, description, dayOfWeek, timeOfDay } = formData;
      const response = await axios.post(
        `http://127.0.0.1:8000/api/tasks/room_id/${roomId}/task_id/0/`,
        {
          description,
          day_of_week: dayOfWeek,
          time_of_day: timeOfDay,
        },
        { withCredentials: true }
      );
      // on success, reset form and refresh data
      if (response.status === 201) {
        toast({ title: 'Task added!', status: 'success', duration: 2000, isClosable: true });
        fetchData();
        setFormData({ roomId, description: '', dayOfWeek: 'Monday', timeOfDay: '' });
      }
    } catch (err) {
      toast({ title: 'Failed to add task.', status: 'error', duration: 2000, isClosable: true });
      console.error(err);
    }
  };

  // send Put request from backend to update an existing task. Utilizes pulled
  // roomId and taskID fetched from fetchData()
  const updateTask = async (roomId, taskId) => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/tasks/room_id/${roomId}/task_id/${taskId}/`,
        editValues,
        { withCredentials: true }
      );
      if (res.status === 201) {
        toast({ title: 'Task updated!', status: 'success', duration: 2000, isClosable: true });
        setEditingTaskId(null);
        setEditValues({});
        fetchData();
      }
    } catch (err) {
      toast({ title: 'Update failed.', status: 'error', duration: 2000, isClosable: true });
      console.error(err);
    }
  };

  // handles deleting a task pulled from backend API
  const deleteTask = async (roomId, taskId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tasks/room_id/${roomId}/task_id/${taskId}/`, {
        withCredentials: true,
      });
      fetchData();
    } catch (err) {
      toast({ title: 'Delete failed.', status: 'error', duration: 2000, isClosable: true });
      console.error(err);
    }
  };

  // helper function to get a room name from its ID as needed=
  const getRoomName = (id) => rooms.find(r => r.id === id)?.room_name || 'Unknown Room';

  return (
    <Box className="task-container">
      <Box className="form-wrapper">
        <Heading className="title">Task Manager</Heading>
        <form className="task-form" onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Room</FormLabel>
            <Select name="roomId" value={formData.roomId} onChange={handleChange}>
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
              name="description"
              value={formData.description}
              maxLength={30}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Day</FormLabel>
            <Select name="dayOfWeek" value={formData.dayOfWeek} onChange={handleChange}>
              {DAYS.map(day => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Time</FormLabel>
            <Input
              name="timeOfDay"
              type="time"
              value={formData.timeOfDay}
              onChange={handleChange}
            />
          </FormControl>

          <Button colorScheme="blue" type="submit" w="full">
            Add Task
          </Button>
        </form>
      </Box>

      <Box className="task-list">
        <Heading as="h3" size="md">
          Task List
        </Heading>
        <VStack spacing={4}>
          {tasks.map((task) => (
            <Box key={task.id} className="task-item">
              {editingTaskId === task.id ? (
                <VStack>
                  <Input
                    value={editValues.description}
                    onChange={(e) =>
                      setEditValues({ ...editValues, description: e.target.value })
                    }
                  />
                  <Select
                    value={editValues.day_of_week}
                    onChange={(e) =>
                      setEditValues({ ...editValues, day_of_week: e.target.value })
                    }
                  >
                    {DAYS.map(day => (
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
                  <HStack>
                    <Button size="sm" colorScheme="green" onClick={() => updateTask(task.room_id, task.id)}>
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingTaskId(null)}>
                      Cancel
                    </Button>
                  </HStack>
                </VStack>
              ) : (
                <VStack spacing={1}>
                  <Text className="description">{task.description}</Text>
                  <Text className="details">
                    {getRoomName(task.room_id)} — {task.day_of_week} at {task.time_of_day}
                  </Text>
                  <HStack>
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
    </Box>
  );
};

export default AddTasksPage;
