import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/pages/HomePage';
import ForecastPage from './components/pages/ForecastPage';
import MapsPage from './components/pages/MapsPage';
import AboutPage from './components/pages/AboutPage';
import DayNightIndicator from './components/DayNightIndicator';
import WeatherEffects from './components/WeatherEffects';
import { WeatherProvider, useWeather } from './context/WeatherContext';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isDaytime, setIsDaytime] = useState<boolean>(true);
  
  // Check for system preference, then localStorage, default to false if neither exists
  const getInitialDarkMode = () => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return JSON.parse(savedMode);
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  };
  
  const [darkMode, setDarkMode] = useState<boolean>(getInitialDarkMode);

  // Create a wrapped component that has access to the weather context
  const AppContent = () => {
    const { setWeatherType, setRainIntensity } = useWeather();
    
    // Handle page navigation
    const handlePageChange = (page: string) => {
      setCurrentPage(page);
      
      // Reset weather effects when navigating away from home page
      if (page !== 'home') {
        setWeatherType('clear');
        setRainIntensity('none');
      }
    };
    
    // Toggle dark mode
    const toggleDarkMode = () => {
      setDarkMode(!darkMode);
    };

    // Determine if it's daytime based on current hour
    const checkDayTime = () => {
      const hour = new Date().getHours();
      return hour >= 6 && hour < 18; // Between 6am and 6pm
    };

    // Update daytime status on load and every minute
    useEffect(() => {
      setIsDaytime(checkDayTime());
      
      const interval = setInterval(() => {
        setIsDaytime(checkDayTime());
      }, 60000); // Check every minute
      
      return () => clearInterval(interval);
    }, []);

    // Render the current page based on state
    const renderPage = () => {
      switch (currentPage) {
        case 'home':
          return <HomePage />;
        case 'forecast':
          return <ForecastPage />;
        case 'maps':
          return <MapsPage />;
        case 'about':
          return <AboutPage />;
        default:
          return <HomePage />;
      }
    };

    // Determine the time class (day/night)
    const timeClass = isDaytime ? 'time-day' : 'time-night';

    return (
      <div className={`app ${timeClass}`}>
        <DayNightIndicator isDaytime={isDaytime} />
        <WeatherEffects />
        <Navbar 
          activePage={currentPage} 
          onPageChange={handlePageChange} 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
        />
        <div className="content">
          {renderPage()}
        </div>
        <Footer />
      </div>
    );
  };

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't manually set a preference
      if (localStorage.getItem('darkMode') === null) {
        setDarkMode(e.matches);
      }
    };
    
    // Add listener for system preference changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Apply dark mode class to root element
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark-mode');
    } else {
      root.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <WeatherProvider>
      <AppContent />
    </WeatherProvider>
  );
}

export default App;
