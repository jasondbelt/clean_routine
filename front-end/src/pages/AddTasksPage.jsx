import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
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

  // Memoize fetchRoomsAndTasks function
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

  // useEffect to fetch rooms and tasks on component mount
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
            <li key={task.id} className="task-item">
              <div className="task-info">
                {editingTaskId === task.id ? (
                  <>
                    <input
                      type="text"
                      value={editValues.description}
                      onChange={(e) =>
                        setEditValues({ ...editValues, description: e.target.value })
                      }
                      maxLength="30"
                    />
                    <select
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
                    </select>
                    <input
                      type="time"
                      value={editValues.time_of_day}
                      onChange={(e) =>
                        setEditValues({ ...editValues, time_of_day: e.target.value })
                      }
                    />
                  </>
                ) : (
                  <>
                    <span className="description">{task.description}</span>
                    <span className="details">
                      {getRoomName(task.room_id)} — {task.day_of_week} at {task.time_of_day}
                    </span>
                  </>
                )}
              </div>

              <div className="task-actions">
                {editingTaskId === task.id ? (
                  <>
                    <button className="save-button" onClick={() => editTask(task.room_id, task.id)}>
                      Save
                    </button>
                    <button
                      className="cancel-button"
                      onClick={() => {
                        setEditingTaskId(null);
                        setEditValues({});
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-button"
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
                    </button>
                    <button className="delete-button" onClick={() => deleteTask(task.room_id, task.id)}>
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default AddTasksPage;
