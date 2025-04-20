// const TaskManagerPage = () => {

//   return (
//     <div className="p-8 text-center">
//       <h2 className="text-4xl font-bold">Task Manager</h2>
//     </div>
//   );
// };

// export default TaskManagerPage
import React, { useState } from 'react';
import '../css_files/add_tasks.css';

const AddTask = ({ roomId }) => {
  const [description, setDescription] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('Monday');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const dayOptions = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      description,
      day_of_week: dayOfWeek,
      time_of_day: timeOfDay,
    };

    try {
      const response = await fetch(`/api/tasks/${roomId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        setSuccess('Task added successfully!');
        setDescription('');
        setDayOfWeek('Monday');
        setTimeOfDay('');
        setError('');
      } else {
        const err = await response.json();
        setError(JSON.stringify(err));
        setSuccess('');
      }
    } catch (err) {
      console.error(err)
      setError('Something went wrong.');
      setSuccess('');
    }
  };

  return (
    <div className="task-container">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <label>
          Description:
          <input
            type="text"
            maxLength="30"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <label>
          Day of Week:
          <select
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
          >
            {dayOptions.map((day) => (
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
          />
        </label>

        <button type="submit">Add Task</button>
      </form>

      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AddTask;
