import React, { useState } from 'react';
import axios from 'axios';
import SearchBox from '../SearchBox';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';

interface ForecastData {
  list: {
    dt: number;
    main: {
      temp: number;
      humidity: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
    dt_txt: string;
  }[];
  city: {
    name: string;
    country: string;
  };
}

const ForecastPage: React.FC = () => {
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = '4d8fb5b93d4af21d66a2948710284366';

  const handleSearch = async (city: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );

      setForecastData(response.data);
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        setError('City not found. Please try another location.');
      } else {
        setError('Failed to fetch forecast data. Please try again.');
      }
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  // Helper to group forecast by day
  const groupForecastByDay = (forecastList: ForecastData['list']) => {
    const groupedData: { [key: string]: any[] } = {};
    
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(item);
    });
    
    return groupedData;
  };

  return (
    <div className="container">
      <h1>5-Day Forecast</h1>
      
      <SearchBox onSearch={handleSearch} loading={loading} />
      
      {loading && <LoadingSpinner />}
      
      {error && <ErrorMessage message={error} />}
      
      {forecastData && !loading && !error && (
        <div className="forecast-display">
          <h2 className="city-title">{forecastData.city.name}, {forecastData.city.country}</h2>
          
          <div className="forecast-cards">
            {Object.entries(groupForecastByDay(forecastData.list)).map(([date, forecasts]) => {
              // Take the forecast for mid-day (closest to 12:00) as representative for the day
              const midDayForecast = forecasts.reduce((prev, curr) => {
                const prevHour = new Date(prev.dt * 1000).getHours();
                const currHour = new Date(curr.dt * 1000).getHours();
                return Math.abs(currHour - 12) < Math.abs(prevHour - 12) ? curr : prev;
              }, forecasts[0]);
              
              return (
                <div className="forecast-card" key={date}>
                  <div className="forecast-date">{new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                  <img 
                    src={`https://openweathermap.org/img/wn/${midDayForecast.weather[0].icon}@2x.png`} 
                    alt={midDayForecast.weather[0].description} 
                  />
                  <div className="forecast-temp">{Math.round(midDayForecast.main.temp)}°C</div>
                  <div className="forecast-desc">{midDayForecast.weather[0].description}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ForecastPage; 