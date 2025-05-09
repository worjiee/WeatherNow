import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBox from '../SearchBox';
import WeatherDisplay from '../WeatherDisplay';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';
import WeatherBackground from '../WeatherBackground';
import { useWeather } from '../../context/WeatherContext';

// Weather data interface
interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
    id?: number;
  }[];
  sys: {
    country: string;
  };
  wind: {
    speed: number;
  };
  rain?: {
    '1h'?: number;
    '3h'?: number;
  };
  timezone: number; // timezone offset in seconds
}

const HomePage: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setWeatherType, setIsDayTime, setRainIntensity, weatherType, isDayTime } = useWeather();

  // Use a valid OpenWeather API key
  const apiKey = '4d8fb5b93d4af21d66a2948710284366';

  // Set dynamic weather background
  useEffect(() => {
    if (weatherData) {
      const weatherMain = weatherData.weather[0].main.toLowerCase();
      const iconCode = weatherData.weather[0].icon;
      const isDayTime = iconCode.includes('d');
      
      let weatherType = 'clear';
      let rainIntensity: 'none' | 'light' | 'medium' | 'heavy' = 'none';
      
      if (weatherMain.includes('cloud') || weatherMain === 'mist' || weatherMain === 'haze') {
        weatherType = 'cloudy';
      } else if (weatherMain.includes('rain') || weatherMain === 'drizzle') {
        weatherType = 'rainy';
        
        // Determine rain intensity based on weather code or rain amount
        const weatherId = weatherData.weather[0].id;
        const rainAmount = weatherData.rain?.['1h'] || weatherData.rain?.['3h'] || 0;
        
        if (weatherId) {
          // Light rain: 500, 501, 520, 531, drizzle codes (300s)
          // Moderate rain: 502, 521
          // Heavy rain: 503, 504, 522, 771 (squalls), 522
          
          if (weatherId === 502 || weatherId === 521 || (rainAmount > 2.5 && rainAmount <= 7.5)) {
            rainIntensity = 'medium';
          } else if (weatherId >= 503 || weatherId === 522 || weatherId === 771 || rainAmount > 7.5) {
            rainIntensity = 'heavy';
          } else {
            rainIntensity = 'light';
          }
        } else if (rainAmount > 0) {
          // Fallback using rain amount in mm if available
          if (rainAmount <= 2.5) {
            rainIntensity = 'light';
          } else if (rainAmount <= 7.5) {
            rainIntensity = 'medium';
          } else {
            rainIntensity = 'heavy';
          }
        } else {
          // Default to light rain if we can't determine
          rainIntensity = 'light';
        }
      } else if (weatherMain.includes('snow')) {
        weatherType = 'snowy';
      } else if (weatherMain.includes('thunder')) {
        weatherType = 'thunderstorm';
      }
      
      // Update the context
      setWeatherType(weatherType);
      setIsDayTime(isDayTime);
      setRainIntensity(rainIntensity);
    }
  }, [weatherData, setWeatherType, setIsDayTime, setRainIntensity]);

  const handleSearch = async (city: string) => {
    try {
      setLoading(true);
      setError(null);

      console.log(`Fetching weather for: ${city}`);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      console.log('API response:', response.data);

      setWeatherData(response.data);
    } catch (err: any) {
      console.error('API error:', err);
      if (err.response && err.response.status === 404) {
        setError('City not found. Please try another location.');
      } else {
        setError('Failed to fetch weather data. Please try again.');
      }
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Current Weather</h1>
      
      <SearchBox onSearch={handleSearch} loading={loading} />
      
      {loading && <LoadingSpinner />}
      
      {error && <ErrorMessage message={error} />}
      
      {weatherData && !loading && !error && (
        <WeatherDisplay weatherData={weatherData} />
      )}
      
      {weatherData && (
        <div className="weather-status">
          <p>Current conditions: {weatherType} {isDayTime ? '(day)' : '(night)'}</p>
        </div>
      )}
      
      <WeatherBackground />
    </div>
  );
};

export default HomePage; 