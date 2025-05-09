import React, { useEffect } from 'react';
import { useWeather } from '../context/WeatherContext';

const WeatherBackground: React.FC = () => {
  const { weatherType, isDayTime } = useWeather();
  
  useEffect(() => {
    // Clear any existing classes
    document.body.classList.remove('clear', 'cloudy', 'rainy', 'snowy', 'thunderstorm', 'day', 'night');
    
    // Add weather type class
    document.body.classList.add(weatherType);
    
    // Add time of day class
    document.body.classList.add(isDayTime ? 'day' : 'night');
    
    // Update root element with custom properties for colors based on weather and time
    const root = document.documentElement;
    
    if (isDayTime) {
      switch (weatherType) {
        case 'clear':
          root.style.setProperty('--sky-color-start', '#1e90ff');
          root.style.setProperty('--sky-color-end', '#87ceeb');
          break;
        case 'cloudy':
          root.style.setProperty('--sky-color-start', '#5d8cb3');
          root.style.setProperty('--sky-color-end', '#a4c2d9');
          break;
        case 'rainy':
          root.style.setProperty('--sky-color-start', '#4a6b8a');
          root.style.setProperty('--sky-color-end', '#718da8');
          break;
        case 'snowy':
          root.style.setProperty('--sky-color-start', '#8aacbd');
          root.style.setProperty('--sky-color-end', '#c9e6f2');
          break;
        case 'thunderstorm':
          root.style.setProperty('--sky-color-start', '#2d4159');
          root.style.setProperty('--sky-color-end', '#566c82');
          break;
        default:
          root.style.setProperty('--sky-color-start', '#1e90ff');
          root.style.setProperty('--sky-color-end', '#87ceeb');
      }
    } else {
      // Night colors
      switch (weatherType) {
        case 'clear':
          root.style.setProperty('--sky-color-start', '#0a2342');
          root.style.setProperty('--sky-color-end', '#184785');
          break;
        case 'cloudy':
          root.style.setProperty('--sky-color-start', '#1a202e');
          root.style.setProperty('--sky-color-end', '#2e3a50');
          break;
        case 'rainy':
          root.style.setProperty('--sky-color-start', '#0f1620');
          root.style.setProperty('--sky-color-end', '#232c3a');
          break;
        case 'snowy':
          root.style.setProperty('--sky-color-start', '#1e293b');
          root.style.setProperty('--sky-color-end', '#334155');
          break;
        case 'thunderstorm':
          root.style.setProperty('--sky-color-start', '#0f172a');
          root.style.setProperty('--sky-color-end', '#1e293b');
          break;
        default:
          root.style.setProperty('--sky-color-start', '#0a2342');
          root.style.setProperty('--sky-color-end', '#184785');
      }
    }
    
  }, [weatherType, isDayTime]);
  
  return null; // This component doesn't render anything visible
};

export default WeatherBackground; 