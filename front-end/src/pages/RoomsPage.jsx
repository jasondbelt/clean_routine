//RoomsPage.jsx
import React, { useState } from 'react';
import Default_room from '../assets/room_images/Default_room.jpg';

// import axios from 'axios'

// define base urls for rooms and tasks from backend API
const BASE_URL = 'http://127.0.0.1:8000/'
const BASE_ROOMS_URL = `${BASE_URL}api/rooms/`
// path('roomname/<str:room_name>/', A_room.as_view(), name='room'),


const RoomsPage = () => {
  const [roomName, setRoomName] = useState('');
  const [image, setImage] = useState(null);

  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('room_name', roomName);
  
    if (image) {
      formData.append('image', image);
    } else {
      // fetch the default image and convert to Blob
      const response = await fetch(Default_room);
      const blob = await response.blob();
      const file = new File([blob], 'Default_room.jpg', { type: blob.type });
      formData.append('image', file);
    }
  
    // Submit form data to your API or backend
    console.log('Form submitted with:', { roomName, image });
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
          <label htmlFor="image">Room Image (Optional):</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Create Room</button>
      </form>
    </div>
  );
};

export default RoomsPage;