import React, { useState } from "react";
import { VStack, Heading, Text, Button } from "@chakra-ui/react";
import axios from "axios";

const SchedulePage = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  const daysOfWeek = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
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
      setError("Failed to fetch tasks for the selected day.");
      setTasks([]);
    }
  };

  return (
    <VStack spacing={4}>
      <Heading>Schedule</Heading>
      <form onSubmit={handleSubmit}>
        <VStack>
          <label htmlFor="day" className="mr-2">
            Select Day:
          </label>
          <select
            id="day"
            value={selectedDay}
            onChange={handleDayChange}
            className="p-2 border rounded-md"
          >
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>

          <Button type="submit" colorScheme="blue" size="sm">
            Get Tasks
          </Button>
        </VStack>
      </form>

      {error && <Text color="red.500">{error}</Text>}

      {tasks.length > 0 && (
        <pre className="bg-gray-100 p-4 rounded-md">
          {JSON.stringify(tasks, null, 2)}
        </pre>
      )}
    </VStack>
  );
};

export default SchedulePage;
