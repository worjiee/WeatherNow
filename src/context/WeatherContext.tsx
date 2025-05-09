import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WeatherContextType {
  weatherType: string;
  setWeatherType: (type: string) => void;
  isDayTime: boolean;
  setIsDayTime: (isDayTime: boolean) => void;
  rainIntensity: 'none' | 'light' | 'medium' | 'heavy';
  setRainIntensity: (intensity: 'none' | 'light' | 'medium' | 'heavy') => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [weatherType, setWeatherType] = useState<string>('clear');
  const [isDayTime, setIsDayTime] = useState<boolean>(true);
  const [rainIntensity, setRainIntensity] = useState<'none' | 'light' | 'medium' | 'heavy'>('none');

  return (
    <WeatherContext.Provider value={{ 
      weatherType, 
      setWeatherType, 
      isDayTime, 
      setIsDayTime,
      rainIntensity,
      setRainIntensity
    }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
}; 