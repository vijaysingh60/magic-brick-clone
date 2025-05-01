import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PropertyForm from './PropertyForm';
import { useProperty } from '../../context/PropertyContext';

const AddProperty = () => {
  const navigate = useNavigate();
  const { addProperty } = useProperty();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);
      await addProperty(data);
      navigate('/admin');
    } catch (err) {
      setError('Failed to add property. Please try again.');
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link to="/admin" className="text-blue-900 hover:text-blue-700 mr-4">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Add New Property</h1>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <PropertyForm 
          onSubmit={handleSubmit} 
          onCancel={handleCancel}
          isLoading={loading}
        />
      </div>
    </div>
  );
};

export default AddProperty;