import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';


const API_URL = "http://localhost:5000/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      checkAuthStatus(token);
    } else {
      setLoading(false);
    }
  }, []);

  const checkAuthStatus = async (token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await axios.get(`${API_URL}/auth/me`, config);
      setCurrentUser(data);
      setLoading(false);
    } catch (err) {
      localStorage.removeItem('authToken');
      setCurrentUser(null);
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
      localStorage.setItem('authToken', data.token);
      setCurrentUser(data.user);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
      throw err;
    }
  };

  const signup = async (name, email, password, role) => {
    try {
      setError(null);
      const { data } = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
        role,
      });
      localStorage.setItem('authToken', data.token);
      setCurrentUser(data.user);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to signup');
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        signup,
        logout,
        loading,
        error,
        setError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
