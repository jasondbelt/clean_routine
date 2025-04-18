import React, { useState } from 'react';
import axios from 'axios';
import '../index.css'; // Make sure the path is correct if your file structure differs

const BASE_URL = 'http://127.0.0.1:8000/';
const BASE_ROOMS_URL = `${BASE_URL}api/rooms/roomname/`;

const predefinedRoomNames = ['Bathroom', 'Bedroom', 'Garage', 'Kitchen', 'Laundry Room', 'Office'];

const AddRoomsPage = () => {
  const [roomName, setRoomName] = useState('');
  const [selectedDropdown, setSelectedDropdown] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };

  const handleDropdownChange = (e) => {
    const value = e.target.value;
    setSelectedDropdown(value);
    setRoomName(value);
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

      setMessage('Room created successfully!');
      setIsError(false);

      setRoomName('');
      setSelectedDropdown('');
      setImageUrl('');
    } catch (error) {
      console.error('Error creating room:', error.response ? error.response.data : error.message);

      setMessage('Failed to create room. Please try again.');
      setIsError(true);
    }
  };

  return (
    <div className="rooms-wrapper">
      <div className="rooms-container">
        <h2 className="rooms-title">Add New Room</h2>
        <form onSubmit={handleSubmit} className="rooms-form">
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
            <label htmlFor="room_name">Room Name (Capitalized Format Required):</label>
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

          <button type="submit" className="rooms-button">Create Room</button>

          {message && (
            <p className={isError ? 'rooms-message error' : 'rooms-message success'}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddRoomsPage;
