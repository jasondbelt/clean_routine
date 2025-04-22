import React, { useState } from 'react';
import axios from 'axios';
import {
  Box, Heading, Text, Button, Select, FormControl, FormLabel,
  VStack, UnorderedList, ListItem
} from '@chakra-ui/react';
import '../css_files/schedule.css';

const SchedulePage = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [showNoTasks, setShowNoTasks] = useState(false);

  const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday'
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

      if (response.data.length === 0) {
        setShowNoTasks(true);
        setTimeout(() => setShowNoTasks(false), 1500);
      } else {
        setShowNoTasks(false);
      }
    } catch (error) {
      console.error(error);
      setError('Failed to fetch tasks for the selected day.');
      setTasks([]);
      setShowNoTasks(false);
    }
  };

  return (
    <Box className="schedule-page">
      <Box className="schedule-form-wrapper">
        <Heading className="schedule-title">View Daily Schedule</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing="1rem" align="stretch">
            <FormControl>
              <FormLabel className="schedule-label">Choose a Day:</FormLabel>
              <Select value={selectedDay} onChange={handleDayChange}>
                {daysOfWeek.map((day, index) => (
                  <option key={index} value={day}>{day}</option>
                ))}
              </Select>
            </FormControl>

            <Button type="submit" colorScheme="teal" className="schedule-button">
              Get Tasks
            </Button>

            {error && (
              <Text className="error-message">
                {error}
              </Text>
            )}
          </VStack>
        </form>
      </Box>

      <Box className="task-list-wrapper">
  <Heading className="task-list-title">Task List:</Heading>
  {tasks.length > 0 ? (
    <UnorderedList className="task-list">
      {tasks.map((task, index) => (
        <ListItem key={index} className="task-card">
          <Text className="task-title">{task.title}</Text>
          <span className="task-info"><strong>Time:</strong> {task.time_of_day}</span>
          <span className="task-info"><strong>Room:</strong> {task.room}</span>
          <span className="task-info"><strong>Item:</strong> {task.description}</span>
        </ListItem>
      ))}
    </UnorderedList>
  ) : (
    showNoTasks && (
      <Text className="no-tasks-message">
        You don't have any tasks assigned for {selectedDay}.
      </Text>
    )
  )}
</Box>

    </Box>
  );
};

export default SchedulePage;
