import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Menu, X, LogIn, LogOut, User } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const Header = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMenu();
  };

  return (
    <header className={`sticky top-0 z-20 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Home size={24} className="text-blue-900" />
            <span className="font-bold text-xl text-blue-900">MagicBricks</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link 
              to="/" 
              className={`font-medium ${location.pathname === '/' ? 'text-blue-900' : 'text-gray-600 hover:text-blue-900'}`}
            >
              Home
            </Link>
            {currentUser ? (
              <>
                <Link 
                  to="/admin" 
                  className={`font-medium ${location.pathname.startsWith('/admin') ? 'text-blue-900' : 'text-gray-600 hover:text-blue-900'}`}
                >
                  Admin Dashboard
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  iconLeft={<LogOut size={16} />}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/login')}
                iconLeft={<LogIn size={16} />}
              >
                Login
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              to="/" 
              className={`block font-medium ${location.pathname === '/' ? 'text-blue-900' : 'text-gray-600'}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            {currentUser ? (
              <>
                <Link 
                  to="/admin" 
                  className={`block font-medium ${location.pathname.startsWith('/admin') ? 'text-blue-900' : 'text-gray-600'}`}
                  onClick={closeMenu}
                >
                  Admin Dashboard
                </Link>
                <Button 
                  variant="outline" 
                  fullWidth
                  onClick={handleLogout}
                  iconLeft={<LogOut size={16} />}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                variant="outline" 
                fullWidth
                onClick={() => {
                  navigate('/login');
                  closeMenu();
                }}
                iconLeft={<LogIn size={16} />}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;