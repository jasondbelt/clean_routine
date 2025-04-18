//RoomsPage.jsx
import React, { useState } from 'react';
import axios from 'axios';

// Define base URLs for rooms and tasks from backend API
const BASE_URL = 'http://127.0.0.1:8000/';
const BASE_ROOMS_URL = `${BASE_URL}api/rooms/roomname/`;  // Adjusted for roomname/<room_name>/

const RoomsPage = () => {
  const [roomName, setRoomName] = useState('');
  const [imageUrl, setImageUrl] = useState('');  // For storing image URL

  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Build room data with only the fields we want to send
    const roomData = {
      room_name: roomName,
    };
  
    // Only include image_url if it's provided
    if (imageUrl.trim()) {
      roomData.image_url = imageUrl;
    }
  
    try {
      const response = await axios.post(`${BASE_ROOMS_URL}${roomName}/`, roomData, {
        withCredentials: true,
      });
  
      console.log('Room created successfully:', response.data);
    } catch (error) {
      console.error('Error creating room:', error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <div>
      <h2>Create New Room</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="room_name">Room Name:</label>
          <input
            type="text"
            id="room_name"
            value={roomName}
            onChange={handleRoomNameChange}
            maxLength={20}
            required
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
