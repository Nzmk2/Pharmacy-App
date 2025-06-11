import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // sesuaikan path

import Login from '../Login';
import Dashboard from '../Dashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('=== APP USEEFFECT START ===');
    
    // Method 1: Use Firebase Auth State (Recommended)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Firebase Auth State:', user ? 'User logged in' : 'No user');
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Backup method with localStorage error handling
  useEffect(() => {
    console.log('=== CHECKING LOCALSTORAGE ===');
    
    try {
      const storedAuth = localStorage.getItem('is_authenticated');
      console.log('LocalStorage value:', storedAuth);
      
      if (storedAuth !== null) {
        const parsedAuth = JSON.parse(storedAuth);
        console.log('Parsed auth:', parsedAuth);
        setIsAuthenticated(parsedAuth);
      } else {
        console.log('No localStorage value, defaulting to false');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('LocalStorage error:', error);
      console.log('LocalStorage failed, defaulting to false');
      setIsAuthenticated(false);
    }
    
    setLoading(false);
  }, []);

  // Sync localStorage when auth changes
  useEffect(() => {
    console.log('=== SYNCING LOCALSTORAGE ===');
    console.log('isAuthenticated:', isAuthenticated);
    
    if (isAuthenticated !== null) {
      try {
        localStorage.setItem('is_authenticated', JSON.stringify(isAuthenticated));
        console.log('LocalStorage synced successfully');
      } catch (error) {
        console.error('Failed to sync localStorage:', error);
      }
    }
  }, [isAuthenticated]);

  console.log('=== APP RENDER ===');
  console.log('loading:', loading);
  console.log('isAuthenticated:', isAuthenticated);

  if (loading) {
    return <p>Loading...</p>;
  }

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