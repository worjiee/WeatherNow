import React, { useState, useEffect } from 'react';

interface ClockDisplayProps {
  timezone: number; // timezone offset in seconds
  countryCode: string;
}

const ClockDisplay: React.FC<ClockDisplayProps> = ({ timezone, countryCode }) => {
  const [time, setTime] = useState<string>('');
  
  useEffect(() => {
    const updateClock = () => {
      // Get current UTC time in milliseconds
      const now = new Date();
      
      // Calculate the local time based on timezone offset
      // First reset to UTC
      const utcMillis = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
      // Then add the location's timezone offset
      const localTime = new Date(utcMillis + (timezone * 1000));
      
      // Format the time
      const hours = localTime.getHours().toString().padStart(2, '0');
      const minutes = localTime.getMinutes().toString().padStart(2, '0');
      const seconds = localTime.getSeconds().toString().padStart(2, '0');
      
      setTime(`${hours}:${minutes}:${seconds}`);
    };
    
    // Update immediately
    updateClock();
    
    // Update every second
    const interval = setInterval(updateClock, 1000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [timezone]);
  
  const textStyle = {
    textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
    color: '#FFFFFF',
    fontWeight: 'bold' as const
  };
  
  const cardStyle = {
    background: 'rgba(43, 43, 43, 0.7)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '10px 15px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px 0'
  };

  return (
    <div className="clock-display" style={cardStyle}>
      <div className="clock-icon" style={{ marginRight: '10px' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.2 16.2L17 14.9L12.5 12.2V7Z" fill="white"/>
        </svg>
      </div>
      <div className="clock-time" style={textStyle}>
        <span>Local Time: {time}</span>
      </div>
    </div>
  );
};

export default ClockDisplay; 