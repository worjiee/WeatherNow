import React from 'react';
import ClockDisplay from './ClockDisplay';

interface WeatherDisplayProps {
  weatherData: {
    name: string;
    main: {
      temp: number;
      humidity: number;
    };
    weather: {
      main: string;
      description: string;
      icon: string;
    }[];
    sys: {
      country: string;
    };
    wind: {
      speed: number;
    };
    timezone: number; // timezone offset in seconds
  };
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData }) => {
  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const textStyle = {
    textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
    color: '#FFFFFF',
    fontWeight: 'bold' as const
  };

  const cardStyle = {
    background: 'rgba(43, 43, 43, 0.7)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  };

  const iconStyle = {
    background: 'rgba(30, 30, 30, 0.7)'
  };

  return (
    <div className="weather-display" style={{ position: 'relative', zIndex: 2 }}>
      <div className="weather-icon">
        <img 
          src={getWeatherIcon(weatherData.weather[0].icon)} 
          alt={weatherData.weather[0].description} 
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}
        />
      </div>
      <div className="weather-info">
        <div className="temperature" style={textStyle}>{Math.round(weatherData.main.temp)}°C</div>
        <div className="description" style={textStyle}>{weatherData.weather[0].description}</div>
        <div className="location" style={textStyle}>{weatherData.name}, {weatherData.sys.country}</div>
        <ClockDisplay timezone={weatherData.timezone} countryCode={weatherData.sys.country} />
      </div>
      <div className="weather-details">
        <div className="detail-card" style={cardStyle}>
          <div className="detail-icon" style={iconStyle}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7zm-2 15h4v1a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1zm6-3.83V15h-8v-1.83A7 7 0 0 0 12 15a7 7 0 0 0 4-1.83z" fill="#fff"/>
            </svg>
          </div>
          <div className="detail-info">
            <p style={textStyle}>Humidity</p>
            <p style={textStyle}>{weatherData.main.humidity}%</p>
          </div>
        </div>
        <div className="detail-card" style={cardStyle}>
          <div className="detail-icon" style={iconStyle}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 5.5C13 3.57 11.43 2 9.5 2 7.57 2 6 3.57 6 5.5h2c0-.83.67-1.5 1.5-1.5.83 0 1.5.67 1.5 1.5V9H6c-1.66 0-3 1.34-3 3v6c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3v-6c0-1.66-1.34-3-3-3h-1V5.5z" fill="#fff"/>
            </svg>
          </div>
          <div className="detail-info">
            <p style={textStyle}>Wind Speed</p>
            <p style={textStyle}>{Math.round(weatherData.wind.speed)} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay; 