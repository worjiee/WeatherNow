import React from 'react';

interface NavbarProps {
  activePage: string;
  onPageChange: (page: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, onPageChange, darkMode, toggleDarkMode }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 18a5 5 0 0 0-10 0"></path>
          <line x1="12" y1="9" x2="12" y2="2"></line>
          <line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line>
          <line x1="1" y1="18" x2="3" y2="18"></line>
          <line x1="21" y1="18" x2="23" y2="18"></line>
          <line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line>
          <line x1="23" y1="22" x2="1" y2="22"></line>
          <polyline points="8 6 12 2 16 6"></polyline>
        </svg>
        <h2>WeatherNow</h2>
      </div>
      <div className="nav-links">
        <a 
          href="#" 
          className={activePage === 'home' ? 'active' : ''} 
          onClick={() => onPageChange('home')}
        >
          Home
        </a>
        <a 
          href="#" 
          className={activePage === 'forecast' ? 'active' : ''} 
          onClick={() => onPageChange('forecast')}
        >
          Forecast
        </a>
        <a 
          href="#" 
          className={activePage === 'maps' ? 'active' : ''} 
          onClick={() => onPageChange('maps')}
        >
          Maps
        </a>
        <a 
          href="#" 
          className={activePage === 'about' ? 'active' : ''} 
          onClick={() => onPageChange('about')}
        >
          About
        </a>
        <div className="mode-toggle">
          <span className="toggle-icon">☀️</span>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <span className="toggle-slider"></span>
          </label>
          <span className="toggle-icon">🌙</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 