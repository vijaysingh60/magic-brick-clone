import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Search, Edit, Trash2, Eye, Loader, Home as HomeIcon, 
  Filter, AlertCircle
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { useProperty } from '../../context/PropertyContext';
import { formatPrice, formatDate, getPropertyTypeLabel } from '../../utils/formatters';

const AdminDashboard = () => {
  const { properties, loading, error, deleteProperty, refreshProperties } = useProperty();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', message: '' });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const confirmDelete = (id) => {
    setShowDeleteConfirm(id);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  const handleDelete = async (id) => {
    try {
      setDeleting(true);
      await deleteProperty(id);
      setShowDeleteConfirm(null);
      setStatusMessage({ type: 'success', message: 'Property deleted successfully' });
      setTimeout(() => setStatusMessage({ type: '', message: '' }), 3000);
    } catch (error) {
      setStatusMessage({ type: 'error', message: 'Failed to delete property' });
    } finally {
      setDeleting(false);
    }
  };

  const filteredProperties = properties.filter(property => 
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Property Management</h1>
          <Link to="/admin/add">
            <Button iconLeft={<Plus size={16} />}>
              Add New Property
            </Button>
          </Link>
        </div>

        {/* Status Messages */}
        {statusMessage.message && (
          <div className={`mb-6 p-4 rounded-md ${
            statusMessage.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 
            'bg-red-50 text-red-800 border border-red-200'
          }`}>
            <div className="flex">
              {statusMessage.type === 'success' ? (
                <HomeIcon className="h-5 w-5 text-green-600 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              )}
              <span>{statusMessage.message}</span>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search properties by title, city, or state..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-900 focus:border-blue-900"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Properties Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader className="animate-spin text-blue-900 mr-2" size={24} />
              <span>Loading properties...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <AlertCircle className="mx-auto h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-lg font-medium text-red-800 mb-2">Failed to load properties</h3>
              <p className="text-red-700 mb-4">{error}</p>
              <Button variant="outline" onClick={refreshProperties}>Retry</Button>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-12">
              <Filter className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">No properties found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? "Try a different search term" : "Add your first property to get started"}
              </p>
              {searchTerm && (
                <Button variant="outline" onClick={() => setSearchTerm('')}>Clear Search</Button>
              )}
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posted Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProperties.map((property) => (
                  <tr key={property._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img 
                            className="h-10 w-10 rounded-md object-cover" 
                            src={property.images[0]} 
                            alt={property.title} 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{property.title}</div>
                          <div className="text-sm text-gray-500">{property.bedrooms} bed, {property.bathrooms} bath</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatPrice(property.price)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        property.type === 'apartment' ? 'bg-blue-100 text-blue-800' :
                        property.type === 'house' ? 'bg-green-100 text-green-800' :
                        property.type === 'villa' ? 'bg-purple-100 text-purple-800' :
                        property.type === 'commercial' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {getPropertyTypeLabel(property.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{property.location.city}</div>
                      <div className="text-sm text-gray-500">{property.location.state}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(property.postedDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        property.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {property.available ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {showDeleteConfirm === property._id ? (
                        <div className="flex space-x-2">
                          <Button 
                            variant="danger" 
                            size="sm" 
                            onClick={() => handleDelete(property._id)}
                            disabled={deleting}
                          >
                            {deleting ? 'Deleting...' : 'Confirm'}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={cancelDelete}
                            disabled={deleting}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <Link to={`/property/${property._id}`} className="text-blue-600 hover:text-blue-900">
                            <Eye size={18} />
                          </Link>
                          <Link to={`/admin/edit/${property._id}`} className="text-amber-600 hover:text-amber-900">
                            <Edit size={18} />
                          </Link>
                          <button className="text-red-600 hover:text-red-900" onClick={() => confirmDelete(property._id)}>
                            <Trash2 size={18} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;