import React, { useState } from 'react';
import axios from 'axios';
import '../css_files/schedule.css'

// BASE URLS
const BASE_URL = 'http://localhost:8000/';
const SCHEDULE_URL = `${BASE_URL}api/tasks/day/`;

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const SchedulePage = () => {
  const [selectedDay, setSelectedDay] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleDropdownChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDay) {
      console.warn('No day selected');
      return;
    }

    const requestUrl = `${SCHEDULE_URL}${selectedDay}/`;
    console.log('Fetching tasks from:', requestUrl);

    try {
      const response = await axios.get(requestUrl, {
        withCredentials: true,
      });

      console.log('Day viewed successfully:', response.data);
      setTasks(response.data);
      setSelectedDay('');
    } catch (error) {
      console.error('Error fetching tasks:', error.response?.data || error.message);
    }
  };

  return (
    <div className="schedule-wrapper">
      <div className="schedule-container">
        <h2 className="schedule-title">View Schedule</h2>
        <form onSubmit={handleSubmit} className="schedule-form">
          <div>
            <label htmlFor="day_select">Choose a Day:</label>
            <select
              id="day_select"
              value={selectedDay}
              onChange={handleDropdownChange}
            >
              <option value="">-- Select a Day --</option>
              {daysOfWeek.map((day, index) => (
                <option key={index} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="schedule-button">View Day</button>
        </form>

        {/* Optional: Display fetched tasks */}
        {tasks.length > 0 && (
          <div className="tasks-display">
            <h3>Tasks for {selectedDay}</h3>
            <ul>
              {tasks.map((task, index) => (
                <li key={index}>{task.name || JSON.stringify(task)}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulePage;
