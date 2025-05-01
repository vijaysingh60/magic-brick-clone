import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-900">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-6">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/">
          <Button iconLeft={<Home size={16} />}>
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;