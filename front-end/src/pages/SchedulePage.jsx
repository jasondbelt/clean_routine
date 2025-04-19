import React, { useState } from 'react';
import axios from 'axios';
import '../css_files/schedule.css'; // Make sure this file exists

const SchedulePage = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

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

        {tasks.length > 0 && (
          <div className="schedule-tasks">
            <h3 className="schedule-subtitle">Tasks for {selectedDay}:</h3>
            <pre className="schedule-task-data">
              {JSON.stringify(tasks, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulePage;
