import React, { useState } from 'react';
import axios from 'axios';

// Define base URLs for rooms and tasks from backend API
const BASE_URL = 'http://127.0.0.1:8000/';
const BASE_ROOMS_URL = `${BASE_URL}api/rooms/roomname/`;

// Predefined room names for the dropdown
const predefinedRoomNames = ['Bathroom', 'Bedroom', 'Garage', 'Kitchen', 'Laundry Room', 'Office'];

const RoomsPage = () => {
  const [roomName, setRoomName] = useState('');
  const [selectedDropdown, setSelectedDropdown] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };

  const handleDropdownChange = (e) => {
    const value = e.target.value;
    setSelectedDropdown(value);
    setRoomName(value); // Sync input with dropdown
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const roomData = {
      room_name: roomName,
    };

    if (imageUrl.trim()) {
      roomData.image_url = imageUrl;
    }

    try {
      const response = await axios.post(`${BASE_ROOMS_URL}${roomName}/`, roomData, {
        withCredentials: true,
      });

      console.log('Room created successfully:', response.data);

      // Optionally reset form
      setRoomName('');
      setSelectedDropdown('');
      setImageUrl('');
    } catch (error) {
      console.error('Error creating room:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h2>Create New Room</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="room_select">Choose a Room Name:</label>
          <select
            id="room_select"
            value={selectedDropdown}
            onChange={handleDropdownChange}
          >
            <option value="">Custom</option>
            {predefinedRoomNames.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="room_name">Room Name:</label>
          <input
            type="text"
            id="room_name"
            value={roomName}
            onChange={handleRoomNameChange}
            maxLength={20}
            required
            disabled={selectedDropdown !== ''}
          />
        </div>

        <div>
          <label htmlFor="image_url">Room Image URL (Optional):</label>
          <input
            type="url"
            id="image_url"
            value={imageUrl}
            onChange={handleImageUrlChange}
          />
        </div>

        <button type="submit">Create Room</button>
      </form>
    </div>
  );
};

export default RoomsPage;
