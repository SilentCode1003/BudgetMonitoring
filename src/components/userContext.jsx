import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const updateUserData = (data) => {
    setUserData(data);
  };

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  const logout = () => {
    setUserData(null);
    
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData, logout}}>
      {children}
    </UserContext.Provider>
  );
};
