import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import '../css_files/add_tasks.css';

const AddTasksPage = () => {
  // state variables
  const [rooms, setRooms] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [roomId, setRoomId] = useState('');
  const [description, setDescription] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('Monday');
  const [timeOfDay, setTimeOfDay] = useState('');
  const toast = useToast();

  // Fetch rooms and tasks from backend at the same time
  const fetchRoomsAndTasks = async () => {
    try {
      const [roomsRes, tasksRes] = await Promise.all([
        axios.get('http://127.0.0.1:8000/api/rooms/', { withCredentials: true }),
        axios.get('http://127.0.0.1:8000/api/tasks/', { withCredentials: true }),
      ]);
      // if successful, update state and set default roomID
      // as routes need access to it
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
  };

  // run get requests upon initial render
  useEffect(() => {
    const fetchData = async () => {
      await fetchRoomsAndTasks();
    };
  
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // create task data object to be sent in POST request
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

        // Fetch updated tasks instead of appending manually
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

  // function to get the room name by id
  const getRoomName = (id) => {
    const room = rooms.find((room) => room.id === id);
    return room ? room.room_name : 'Unknown Room';
  };

  return (
    <div className="task-container">
      <div className="form-wrapper">
        <h2 className="title">Task Manager (All Required)</h2>
        <form onSubmit={handleSubmit} className="task-form">
          <label>
            Room:
            <select value={roomId} onChange={(e) => setRoomId(e.target.value)} required>
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
            />
          </label>

          <label>
            Day of Week:
            <select value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)}>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
                (day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                )
              )}
            </select>
          </label>

          <label>
            Time of Day:
            <input
              type="time"
              value={timeOfDay}
              onChange={(e) => setTimeOfDay(e.target.value)}
              required
            />
          </label>

          <button type="submit">Add Task</button>
        </form>
      </div>

      <div className="task-list">
        <h3>Existing Tasks</h3>
        <ol>
          {tasks.map((task) => (
            <li key={task.id}>
              <span className="description">{task.description}</span>
              <span className="details">
                {getRoomName(task.room_id)} — {task.day_of_week} at {task.time_of_day}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default AddTasksPage;
