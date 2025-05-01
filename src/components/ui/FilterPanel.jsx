import React, { useState } from 'react';
import { propertyTypes } from '../../types/property';
import Button from './Button';
import { Sliders, X } from 'lucide-react';

const FilterPanel = ({
  onFilterChange,
  initialFilters = {},
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState(initialFilters);

  const handleApplyFilters = () => {
    onFilterChange(filters);
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const handleClearFilters = () => {
    const emptyFilters = {};
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const handleTypeChange = (type) => {
    const currentTypes = filters.type || [];
    if (currentTypes.includes(type)) {
      setFilters({
        ...filters,
        type: currentTypes.filter(t => t !== type)
      });
    } else {
      setFilters({
        ...filters,
        type: [...currentTypes, type]
      });
    }
  };

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative ${className}`}>
      <Button 
        variant="outline" 
        size="md" 
        onClick={toggleFilter}
        iconLeft={<Sliders className="h-4 w-4" />}
        className="lg:hidden"
      >
        Filters
      </Button>

      <div className={`
        ${isOpen ? 'block' : 'hidden'} 
        lg:block 
        absolute 
        lg:relative 
        top-12 
        lg:top-0 
        left-0 
        z-10 
        bg-white 
        shadow-lg 
        lg:shadow-none 
        rounded-lg 
        p-4 
        lg:p-0 
        w-80 
        lg:w-auto
      `}>
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <h3 className="font-medium">Filters</h3>
          <button onClick={toggleFilter}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Property Type */}
          <div>
            <h4 className="font-medium mb-2">Property Type</h4>
            <div className="flex flex-wrap gap-2">
              {propertyTypes.map(type => (
                <button
                  key={type}
                  onClick={() => handleTypeChange(type)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.type?.includes(type) 
                      ? 'bg-blue-900 text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-medium mb-2">Price Range</h4>
            <div className="flex space-x-2">
              <div>
                <label className="text-xs text-gray-500">Min Price</label>
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceMin || ''}
                  onChange={(e) => setFilters({...filters, priceMin: e.target.value ? Number(e.target.value) : undefined})}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Max Price</label>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceMax || ''}
                  onChange={(e) => setFilters({...filters, priceMax: e.target.value ? Number(e.target.value) : undefined})}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <h4 className="font-medium mb-2">Bedrooms</h4>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, '5+'].map((num) => (
                <button
                  key={num}
                  onClick={() => setFilters({...filters, bedrooms: num === '5+' ? 5 : num})}
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-sm ${
                    filters.bedrooms === (num === '5+' ? 5 : num)
                      ? 'bg-blue-900 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Bathrooms */}
          <div>
            <h4 className="font-medium mb-2">Bathrooms</h4>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, '5+'].map((num) => (
                <button
                  key={num}
                  onClick={() => setFilters({...filters, bathrooms: num === '5+' ? 5 : num})}
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-sm ${
                    filters.bathrooms === (num === '5+' ? 5 : num)
                      ? 'bg-blue-900 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Area */}
          <div>
            <h4 className="font-medium mb-2">Area (sq ft)</h4>
            <div className="flex space-x-2">
              <div>
                <label className="text-xs text-gray-500">Min Area</label>
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.areaMin || ''}
                  onChange={(e) => setFilters({...filters, areaMin: e.target.value ? Number(e.target.value) : undefined})}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Max Area</label>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.areaMax || ''}
                  onChange={(e) => setFilters({...filters, areaMax: e.target.value ? Number(e.target.value) : undefined})}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button onClick={handleApplyFilters} fullWidth>
              Apply Filters
            </Button>
            <Button 
              variant="outline" 
              onClick={handleClearFilters}
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;