import React, { useEffect, useState, useRef } from 'react';
import './weather.css';
import searchIcon from '../assets/search.png';
import clearIcon from '../assets/clear.png';
import cloudIcon from '../assets/cloud.png';
import drizzleIcon from '../assets/drizzle.png';
import rainIcon from '../assets/rain.png';
import snowIcon from '../assets/snow.png';
import windIcon from '../assets/wind.png';
import humidityIcon from '../assets/humidity.png';

const Weather = () => {
  const inputRef = useRef(null);
  const [weatherData, setWeatherData] = useState(false);
  const [city, setCity] = useState('');

  const allIcons = {
    "01d": clearIcon,
    "02d": cloudIcon,
    "03d": cloudIcon,
    "04d": cloudIcon,
    "09d": rainIcon,
    "10d": rainIcon,
    "11d": rainIcon,
    "13d": snowIcon,
  };

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=587090c5554187b90f1aa95f19cedf50`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clearIcon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    search('New York');
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      search(city);
    }
  };

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input
          ref={inputRef}
          type='text'
          placeholder='Search...'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleSearch}
        />
        <img src={searchIcon} alt="search icon" onClick={() => search(city)} />
      </div>
      {weatherData && (
        <>
          <img src={weatherData.icon} className='weather-icon' alt="weather icon" />
          <p className='temperature'>{weatherData.temperature}°C</p>
          <p className='location'>{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidityIcon} alt="humidity icon" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={windIcon} alt="wind icon" />
              <div>
                <p>{weatherData.windSpeed} m/s</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
