import React from 'react';
import { useWeather } from '../context/WeatherContext';

const RainToggle: React.FC = () => {
  const { rainIntensity, setRainIntensity, weatherType, setWeatherType } = useWeather();

  const handleRainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'none' | 'light' | 'medium' | 'heavy';
    
    // If switching to any rain intensity, make sure weather type is rainy
    if (value !== 'none') {
      setWeatherType('rainy');
    }
    
    setRainIntensity(value);
  };

  return (
    <div className="rain-toggle">
      <label htmlFor="rain-intensity">Rain: </label>
      <select 
        id="rain-intensity" 
        value={rainIntensity} 
        onChange={handleRainChange}
      >
        <option value="none">None</option>
        <option value="light">Light</option>
        <option value="medium">Medium</option>
        <option value="heavy">Heavy</option>
      </select>
    </div>
  );
};

export default RainToggle; 