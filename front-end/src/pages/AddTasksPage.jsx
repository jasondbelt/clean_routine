import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react'; // Import Chakra UI's useToast
import '../css_files/add_tasks.css'; // Import the CSS file

const AddTasksPage = () => {
  const [rooms, setRooms] = useState([]);
  const [tasks, setTasks] = useState([]); // State to hold tasks
  const [roomId, setRoomId] = useState('');
  const [description, setDescription] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('Monday');
  const [timeOfDay, setTimeOfDay] = useState('');
  const toast = useToast(); // Initialize Chakra's useToast hook

  // Fetch available rooms and tasks when component mounts
  useEffect(() => {
    const fetchRoomsAndTasks = async () => {
      try {
        const [roomsResponse, tasksResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/rooms/', { withCredentials: true }),
          axios.get('http://127.0.0.1:8000/api/tasks/', { withCredentials: true }), // Fetch tasks
        ]);

        if (roomsResponse.status === 200) {
          setRooms(roomsResponse.data);
          if (roomsResponse.data.length > 0) {
            setRoomId(roomsResponse.data[0].id); // Set default room as first room
          }
        } else {
          toast({
            title: 'Failed to fetch rooms.',
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
        }

        if (tasksResponse.status === 200) {
          setTasks(tasksResponse.data); // Set the fetched tasks
        } else {
          toast({
            title: 'Failed to fetch tasks.',
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
        }
      } catch (err) {
        toast({
          title: 'Error fetching rooms and tasks.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
        console.error(err);
      }
    };

    fetchRoomsAndTasks();
  }, [toast]);

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
        {
          withCredentials: true, // Ensure credentials (cookies) are sent with POST
        }
      );

      if (response.status === 201) {
        toast({
          title: 'Task added successfully!',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });

        // Update the tasks list dynamically
        setTasks(prevTasks => [...prevTasks, response.data]); // Add the new task to the list

        // Clear form fields
        setDescription('');
        setDayOfWeek('Monday');
        setTimeOfDay('');
      } else {
        toast({
          title: 'Failed to add task.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
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

  // Function to get the room name from the rooms state
  const getRoomName = (roomId) => {
    const room = rooms.find((room) => room.id === roomId);
    return room ? room.room_name : 'Unknown Room';
  };

  return (
    <div className="task-container text-center">
      <h2 className="text-4xl font-bold">Task Manager</h2>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label>
          Room:
          <select
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            required
            className="border p-2 rounded"
          >
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.room_name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength="30"
            required
            className="border p-2 rounded"
          />
        </label>

        <label>
          Day of Week:
          <select
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
            className="border p-2 rounded"
          >
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </label>

        <label>
          Time of Day:
          <input
            type="time"
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(e.target.value)}
            required
            className="border p-2 rounded"
          />
        </label>

        {/* Submit button */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Task
        </button>
      </form>

      {/* Display Tasks Below Form */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold">Existing Tasks:</h3>
        <ul className="mt-4">
          {tasks.map((task) => (
            <li key={task.id} className="border-b py-2">
              <strong>{task.description}</strong> - {getRoomName(task.room_id)} - {task.day_of_week} at {task.time_of_day}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddTasksPage;
