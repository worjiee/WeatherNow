import React from 'react';
import RainToggle from '../RainToggle';

const AboutPage: React.FC = () => {
  return (
    <div className="container">
      <h1>About WeatherNow</h1>
      
      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            WeatherNow aims to provide accurate, easy-to-understand weather information to people around the world. 
            We believe that everyone should have access to reliable weather data to help plan their day and stay safe.
          </p>
        </section>
        
        <section className="about-section">
          <h2>Development Team</h2>
          <div className="team-member">
            <div className="team-member-info">
              <h3>Karl Sacayan</h3>
              <p className="team-role">Lead Developer & Creator</p>
              <p>
                Passionate about creating intuitive weather applications that help users plan their day effectively.
                Responsible for the design, development, and implementation of WeatherNow.
              </p>
            </div>
          </div>
        </section>
        
        <section className="about-section">
          <h2>Our Data</h2>
          <p>
            We use the OpenWeatherMap API to provide current weather conditions and forecasts. 
            This data is collected from meteorological broadcast services, raw data from airport weather stations, 
            radar data, and other official weather stations.
          </p>
        </section>
        
        <section className="about-section">
          <h2>Weather Effects</h2>
          <p>
            Our app includes special visual effects for different weather conditions. You can test our rain animation below:
          </p>
          <div style={{ marginTop: '20px' }}>
            <RainToggle />
          </div>
          <p style={{ marginTop: '20px' }}>
            Try changing the rain intensity to see different rain animations. The app will automatically show appropriate 
            weather effects based on real weather data when browsing forecasts.
          </p>
        </section>
        
        <section className="about-section">
          <h2>Features</h2>
          <ul className="features-list">
            <li>
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <div className="feature-text">
                <h3>Real-Time Weather</h3>
                <p>Get current weather conditions for any location in the world</p>
              </div>
            </li>
            <li>
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 1l4 4-4 4"></path>
                  <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                  <path d="M7 23l-4-4 4-4"></path>
                  <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                </svg>
              </div>
              <div className="feature-text">
                <h3>5-Day Forecast</h3>
                <p>Plan ahead with our accurate 5-day weather predictions</p>
              </div>
            </li>
            <li>
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                  <line x1="8" y1="2" x2="8" y2="18"></line>
                  <line x1="16" y1="6" x2="16" y2="22"></line>
                </svg>
              </div>
              <div className="feature-text">
                <h3>Interactive Maps</h3>
                <p>View weather patterns on interactive maps</p>
              </div>
            </li>
          </ul>
        </section>
        
        <section className="about-section">
          <h2>Contact Us</h2>
          <p>
            Have questions or feedback about the app? We'd love to hear from you!
          </p>
          <p>
            Email: <a href="mailto:info@weathernow.example">sacayan.karl@gmail.com</a><br/>
            Phone: +63 910 6091 322
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage; 