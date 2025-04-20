import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react'; // Import Chakra UI's useToast
import '../css_files/add_tasks.css'; // Import the CSS file

const AddTasksPage = () => {
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState('');
  const [description, setDescription] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('Monday');
  const [timeOfDay, setTimeOfDay] = useState('');
  const toast = useToast(); // Initialize Chakra's useToast hook

  // Fetch available rooms when component mounts
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/rooms/', {
          withCredentials: true, // Ensure credentials (cookies) are sent
        });

        if (response.status === 200) {
          setRooms(response.data);
          if (response.data.length > 0) {
            setRoomId(response.data[0].id); // Set default room as first room
          }
        } else {
          toast({
            title: 'Failed to fetch rooms.',
            status: 'error',
            duration: 2000,
            isClosable: true,
          });
        }
      } catch (err) {
        toast({
          title: 'Error fetching rooms.',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
        console.error(err);
      }
    };

    fetchRooms();
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

  return (
    <div className="task-container text-center">
      <h2 className="text-4xl font-bold">Task Manager</h2>

      {/* Removed manual toast handling; now handled via Chakra's toast */}

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
    </div>
  );
};

export default AddTasksPage;
