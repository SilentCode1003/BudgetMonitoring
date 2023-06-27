import React, { createContext, useState, useEffect, useContext } from 'react';
import { useQueryClient } from '@tanstack/react-query';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to access the AuthContext
export const useAuth = () => useContext(AuthContext);

// Authenticator component
export const Authenticator = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    // Check if the user is already logged in (e.g., based on token presence)
    const storedToken = localStorage.getItem('token');
    const storedUserData = localStorage.getItem('userData');
    if (storedToken && storedUserData) {
      setIsLoggedIn(true);
      queryClient.setQueryData('isLoggedIn', true);
    }
  }, [queryClient]);

  // Login function
  const login = async (username, password) => {
    // Perform login API request and handle response
    // ...
    
    // Set isLoggedIn to true and update cache
    setIsLoggedIn(true);
    queryClient.setQueryData('isLoggedIn', true);
    // Save authentication token and user data in localStorage
    localStorage.setItem('token', 'your-auth-token');
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    // Clear isLoggedIn state and cache
    setIsLoggedIn(false);
    queryClient.setQueryData('isLoggedIn', false);
    // Remove authentication token and user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  };

  // Provide the authentication state and functions to child components
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
