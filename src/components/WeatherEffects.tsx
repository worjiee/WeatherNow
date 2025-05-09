import React, { useEffect } from 'react';
import { useWeather } from '../context/WeatherContext';
import RainEffect from './RainEffect';

const WeatherEffects: React.FC = () => {
  const { weatherType, isDayTime, rainIntensity } = useWeather();
  
  // Set the appropriate classes on the app container
  useEffect(() => {
    const app = document.querySelector('.app');
    if (!app) return;
    
    // Remove all weather classes
    app.classList.remove('weather-clear', 'weather-cloudy', 'weather-rainy', 'weather-snowy', 'weather-thunderstorm');
    app.classList.remove('light', 'medium', 'heavy');
    
    // Add current weather class
    app.classList.add(`weather-${weatherType}`);
    
    // Add rain intensity class if it's rainy
    if (weatherType === 'rainy' && rainIntensity !== 'none') {
      app.classList.add(rainIntensity);
    }
  }, [weatherType, rainIntensity]);
  
  // Only render rain effect if it's rainy and has intensity
  const showRainEffect = weatherType === 'rainy' && rainIntensity !== 'none';
  
  return (
    <>
      {showRainEffect && <RainEffect intensity={rainIntensity} />}
    </>
  );
};

export default WeatherEffects; 