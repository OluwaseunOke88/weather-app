import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const getWeatherData = async () => {
    try {
      const weatherResponse = await axios.get(`http://localhost:5000/weather`, {
        params: { location }
      });
      setWeatherData(weatherResponse.data);
      setError(null); // Clear any previous error

      const forecastResponse = await axios.get(`http://localhost:5000/forecast`, {
        params: { location }
      });
      setForecastData(forecastResponse.data);
    } catch (error) {
      setError("Could not fetch weather data");
    }
  };

  const renderWeather = () => {
    if (!weatherData) return null;

    const { main, weather, wind, sys } = weatherData;

    return (
      <div>
        <h2>{weatherData.name}, {sys.country}</h2>
        <img
          src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`}
          alt={weather[0].description}
          className="weather-icon"
        />
        <p>{weather[0].description}</p>
        <p>Temperature: {main.temp}°C</p>
        <p>Feels like: {main.feels_like}°C</p>
        <p>Humidity: {main.humidity}%</p>
        <p>Wind: {wind.speed} m/s</p>
      </div>
    );
  };

  const renderForecast = () => {
    if (!forecastData) return null;

    return (
      <div>
        <h3>5-Day Forecast:</h3>
        <div className="forecast-container">
          {forecastData.list.slice(0, 5).map((forecast, index) => (
            <div key={index} className="forecast-item">
              <p>{new Date(forecast.dt_txt).toLocaleString()}</p>
              <img
                src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                alt={forecast.weather[0].description}
                className="weather-icon"
              />
              <p>{forecast.weather[0].description}</p>
              <p>Temp: {forecast.main.temp}°C</p>
              <p>Humidity: {forecast.main.humidity}%</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        type="text"
        value={location}
        onChange={handleLocationChange}
        placeholder="Enter location (City/Zip Code)"
      />
      <button onClick={getWeatherData}>Get Weather</button>
      {error && <p className="error-message">{error}</p>}
      {renderWeather()}
      {renderForecast()}
    </div>
  );
}

export default App;
