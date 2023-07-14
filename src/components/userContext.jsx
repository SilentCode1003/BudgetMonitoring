import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [requestId, setRequestId] = useState(null);

  const updateUserData = (data) => {
    setUserData(data);
  };

  const updateRequestId = (id) => {
    setRequestId(id);
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

  useEffect(() => {
    const storedRequestId = localStorage.getItem('requestId');
    if (storedRequestId) {
      setRequestId(JSON.parse(storedRequestId));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('requestId', JSON.stringify(requestId));
  }, [requestId]);

  useEffect(() => {
    if (window.location.pathname !== '/Reimbursement') {
      setRequestId(null);
    }
  }, []);

  const logout = () => {
    setUserData(null);
    setRequestId(null);
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData, requestId, updateRequestId, logout }}>
      {children}
    </UserContext.Provider>
  );
};
