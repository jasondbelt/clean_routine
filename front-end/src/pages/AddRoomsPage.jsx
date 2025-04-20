import React, { useState } from 'react';
import axios from 'axios';
import '../css_files/add_rooms.css'

// BASE URLS
const BASE_URL = 'http://127.0.0.1:8000/';
const BASE_ROOMS_URL = `${BASE_URL}api/rooms/roomname/`;

// Predefined Room options for drop-down menu
const predefinedRoomNames = ['Bathroom', 'Bedroom', 'Garage', 'Kitchen', 'Laundry Room', 'Office'];

const AddRoomsPage = () => {
  // define local states
  const [roomName, setRoomName] = useState('');
  const [selectedDropdown, setSelectedDropdown] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // handles text-input when drop-down menu isn't utilized
  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };

  // handles dropdown selection and sets room name accordingly
  const handleDropdownChange = (e) => {
    const value = e.target.value;
    setSelectedDropdown(value);
    setRoomName(value);
  };

  // handles changes to image url input
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  // handles form submission and backend request to create new room
  const handleSubmit = async (e) => {
    e.preventDefault();

    // construct room data to send
    const roomData = {
      room_name: roomName,
    };

    // only include image URL if user actually enters one
    if (imageUrl.trim()) {
      roomData.image_url = imageUrl;
    }

    // send post request to create room, including credentials
    try {
      const response = await axios.post(`${BASE_ROOMS_URL}${roomName}/`, roomData, {
        withCredentials: true,
      });

      console.log('Room created successfully:', response.data);
      // show success message
      setMessage('Room created successfully!');
      setIsError(false);

      // Reset form values
      setRoomName('');
      setSelectedDropdown('');
      setImageUrl('');

      // Clear the message after 1.5 seconds
      setTimeout(() => {
        setMessage('');
      }, 1500);
    } catch (error) {
      // handle error and show message
      console.error('Error creating room:', error.response ? error.response.data : error.message);
      
      setMessage('Failed to create room. Please try again.');
      setIsError(true);

      // Clear the message after 1.5 seconds
      setTimeout(() => {
        setMessage('');
      }, 1500);
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