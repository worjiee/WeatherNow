import React, { useState } from 'react';
import SearchBox from '../SearchBox';

const MapsPage: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [mapUrl, setMapUrl] = useState<string | null>(null);

  const handleSearch = (city: string) => {
    setLocation(city);
    // Create a map URL using OpenStreetMap
    setMapUrl(`https://www.openstreetmap.org/export/embed.html?bbox=~&layer=mapnik&marker=${encodeURIComponent(city)}`);
  };

  return (
    <div className="container">
      <h1>Weather Maps</h1>
      
      <SearchBox onSearch={handleSearch} loading={false} />
      
      <div className="maps-container">
        {!mapUrl && (
          <div className="map-placeholder">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <p>Enter a location to view the map</p>
          </div>
        )}
        
        {mapUrl && (
          <div className="map-frame">
            <h2>{location}</h2>
            <div className="map-wrapper">
              <iframe 
                title="Weather Map"
                width="100%" 
                height="400" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src={mapUrl}
              />
            </div>
            <div className="map-attribution">
              <small>Map data © <a href="https://www.openstreetmap.org/" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors</small>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapsPage; 