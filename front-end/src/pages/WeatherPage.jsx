// WEATHERPAGE.JSX
import React, { useState } from 'react';
import { get_forecast } from '../endpoints/thirdparty_api';

function WeatherPage() {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    const data = await get_forecast(city);
    if (data) {
      setForecast(data);
      setError('');
    } else {
      setForecast(null);
      setError('Could not fetch weather data. Try a different city.');
    }
  };

  return (
    <div className="weather-wrapper">
      <div className="weather-container">
        <h1 className="weather-title">Current Weather</h1>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="weather-input"
        />
        <button onClick={handleFetch} className="weather-button">
          Get Weather
        </button>

        {error && <p className="weather-error">{error}</p>}

        {forecast && (
          <div className="weather-forecast">
            <h2 className="weather-location">{forecast.location}</h2>
            <p><strong>Sky Condition:</strong> {forecast.weather} ({forecast.description})</p>
            <p><strong>Temperature:</strong> {forecast.temperature} °C</p>
            <p><strong>Humidity:</strong> {forecast.humidity}%</p>
            <p><strong>Wind Speed:</strong> {forecast['wind speed']} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherPage;