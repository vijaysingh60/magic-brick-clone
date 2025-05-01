import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Button from './Button';

const SearchBar = ({
  onSearch,
  placeholder = 'Search properties...',
  className = '',
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`flex w-full max-w-3xl relative ${className}`}
    >
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full h-12 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-800 focus:border-blue-800 focus:outline-none"
          placeholder={placeholder}
        />
      </div>
      <Button 
        type="submit" 
        className="ml-2"
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBar;