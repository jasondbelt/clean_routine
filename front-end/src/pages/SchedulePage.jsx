import React, { useState } from 'react';
import axios from 'axios';
import '../css_files/schedule.css'; // Styling lives here

const SchedulePage = () => {
  // initialize states
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  // array of days used to populate dropdown
  const daysOfWeek = [
     'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  // updates selected day when dropdown value changes
  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  // fetches tasks from backend based on selected day
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/tasks/day/${selectedDay}/`,
        { withCredentials: true }
      );
      setTasks(response.data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch tasks for the selected day.');
      setTasks([]);
    }
  };

  return (
    <div className="schedule-wrapper">
      <div className="schedule-container">
        <h2 className="schedule-title">View Daily Schedule</h2>
        <form onSubmit={handleSubmit} className="schedule-form">
          <div>
            <label htmlFor="day_select">Choose a Day:</label>
            <select
              id="day_select"
              value={selectedDay}
              onChange={handleDayChange}
            >
              {daysOfWeek.map((day, index) => (
                <option key={index} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="schedule-button">Get Tasks</button>

          {error && <p className="schedule-message error">{error}</p>}
        </form>

        <div className="schedule-tasks">
          <h3 className="schedule-subtitle">Task List:</h3>
          {tasks.length > 0 ? (
            <ul className="task-list">
              {tasks.map((task, index) => (
                <li key={index} className="task-item">
                  <h4 className="task-title">{task.title}</h4>
                  <p className="task-time"><strong>Time:</strong> {task.time_of_day}</p>
                  <p className="task-room"><strong>Room:</strong> {task.room}</p>
                  <p className="task-desc">{task.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-tasks-message">You don't have any tasks assigned for {selectedDay}.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;