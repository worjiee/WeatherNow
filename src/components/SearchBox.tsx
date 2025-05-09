import React, { useState, FormEvent } from 'react';

interface SearchBoxProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, loading }) => {
  const [city, setCity] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  const inputStyle = {
    background: 'rgba(30, 30, 30, 0.8)',
    color: 'white',
    fontWeight: 500,
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  };

  const buttonStyle = {
    background: 'rgba(0, 102, 204, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  };

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={loading}
        style={inputStyle}
      />
      <button type="submit" disabled={loading} style={buttonStyle}>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
      </button>
    </form>
  );
};

export default SearchBox; 