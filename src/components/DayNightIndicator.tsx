import React from 'react';

interface DayNightIndicatorProps {
  isDaytime: boolean;
}

const DayNightIndicator: React.FC<DayNightIndicatorProps> = ({ isDaytime }) => {
  return (
    <div className="day-night-indicator">
      {isDaytime ? (
        <div className="sun">
          <div className="sun-rays"></div>
        </div>
      ) : (
        <div className="moon">
          <div className="moon-crater one"></div>
          <div className="moon-crater two"></div>
          <div className="moon-crater three"></div>
        </div>
      )}
    </div>
  );
};

export default DayNightIndicator; 