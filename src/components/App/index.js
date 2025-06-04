import React, { useState, useEffect } from 'react';

import Login from '../Login';
import Dashboard from '../Dashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem('is_authenticated'));
    setIsAuthenticated(storedAuth);
  }, []);

  // Sync localStorage setiap isAuthenticated berubah
  useEffect(() => {
    if (isAuthenticated !== null) {
      localStorage.setItem('is_authenticated', JSON.stringify(isAuthenticated));
    }
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated ? (
        <Dashboard setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </>
  );
};

export default App;
