import React, { useState, useEffect } from 'react';
import SearchBar from '../components/ui/SearchBar';
import FilterPanel from '../components/ui/FilterPanel';
import PropertyCard from '../components/ui/PropertyCard';
import Button from '../components/ui/Button';
import { useProperty } from '../context/PropertyContext';
import { Home as HomeIcon, Loader, Building, LayoutGrid, LayoutList } from 'lucide-react';

const HomePage = () => {
  const { filteredProperties, setFilters, filters, loading } = useProperty();
  const [viewMode, setViewMode] = useState('grid');
  const [location, setLocation] = useState('');

  const handleSearch = (searchTerm) => {
    setLocation(searchTerm);
    setFilters({ ...filters, location: searchTerm });
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...newFilters, location: location || undefined });
  };

  // Featured properties
  const featuredProperties = filteredProperties.filter(property => property.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg" 
            alt="Real Estate Background" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Find Your Dream Property
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Discover the perfect home across our vast selection of properties
            </p>
            <div className="flex justify-center">
              <SearchBar onSearch={handleSearch} className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        {/* Featured Properties */}
        {featuredProperties.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Building className="text-amber-500 mr-2" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">Featured Properties</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProperties.slice(0, 3).map(property => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          </div>
        )}

        {/* All Properties */}
        <div className="flex items-center mb-6">
          <HomeIcon className="text-blue-900 mr-2" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Browse Properties</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Panel */}
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <FilterPanel onFilterChange={handleFilterChange} initialFilters={filters} />
            </div>
          </div>

          {/* Property Listings */}
          <div className="lg:w-3/4">
            {/* View Controls */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {loading ? 'Loading properties...' : `${filteredProperties.length} properties found`}
              </p>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  <LayoutGrid size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  <LayoutList size={18} />
                </button>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="flex justify-center items-center py-16">
                <Loader className="animate-spin text-blue-900 mr-2" size={24} />
                <span>Loading properties...</span>
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <HomeIcon className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No properties found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters to find more properties</p>
                <Button 
                  variant="outline" 
                  onClick={() => setFilters({})}
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 gap-6" 
                : "flex flex-col space-y-6"
              }>
                {filteredProperties.map(property => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;