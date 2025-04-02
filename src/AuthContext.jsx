import React, { createContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [creditsRemaining, setCreditsRemaining] = useState(0);
  const [loading, setLoading] = useState(true);
  const intervalIdRef = useRef(null);

  // Check authentication status (session validity) + restore credits from localStorage
  useEffect(() => {
    const checkAuthenticationStatus = () => {
      const userToken = localStorage.getItem('userToken');
      const loginTime = localStorage.getItem('loginTime');
      const currentTime = new Date().getTime();

      if (userToken && loginTime) {
        const sessionDuration = currentTime - parseInt(loginTime, 10);
        // Session is valid up to 30 minutes
        if (sessionDuration <= 30 * 60 * 1000) {
          setIsAuthenticated(true);

          // Optionally restore any previously stored credits
          const storedCredits = localStorage.getItem('creditsRemaining');
          if (storedCredits !== null) {
            setCreditsRemaining(parseInt(storedCredits, 10));
          }
        } else {
          logout();
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    // Initial check on mount
    checkAuthenticationStatus();

    // Re-check every 1 minute
    intervalIdRef.current = setInterval(() => {
      checkAuthenticationStatus();
    }, 60 * 1000);

    // Update login time on user activity
    const updateLoginTime = () => {
      localStorage.setItem('loginTime', new Date().getTime());
    };
    window.addEventListener('mousemove', updateLoginTime);
    window.addEventListener('keydown', updateLoginTime);
    window.addEventListener('click', updateLoginTime);

    return () => {
      clearInterval(intervalIdRef.current);
      window.removeEventListener('mousemove', updateLoginTime);
      window.removeEventListener('keydown', updateLoginTime);
      window.removeEventListener('click', updateLoginTime);
    };
  }, []);

  // Whenever user is authenticated, fetch current credits from server using our new /credits route
  useEffect(() => {
    if (isAuthenticated) {
      refreshCredits();
    }
  }, [isAuthenticated]);

  // Helper to update credits both in state + localStorage
  const updateCredits = (newAmount) => {
    setCreditsRemaining(newAmount);
    localStorage.setItem('creditsRemaining', newAmount.toString());
  };

  // New: Function to refresh credits from the server using the /credits route
  const refreshCredits = () => {
    const API_URL = import.meta.env.VITE_API_URL || "https://vaclaimguard.azurewebsites.net";
    const userUUID = localStorage.getItem('userUUID');
    const userToken = localStorage.getItem('userToken');
    if (userUUID && userToken) {
      axios
        .get(`${API_URL}/credits?userUUID=${userUUID}`, {
          headers: { Authorization: `Bearer ${userToken}` },
          withCredentials: true,
        })
        .then((res) => {
          // The backend returns: { "credits_remaining": <number> }
          const fetchedCredits = res.data?.credits_remaining;
          if (typeof fetchedCredits === 'number') {
            updateCredits(fetchedCredits);
          }
        })
        .catch((err) => {
          console.error('Error refreshing credits:', err);
        });
    }
  };

  const logout = () => {
    setIsAuthenticated(false);

    // Clear relevant data from storage
    const keysToRemove = [
      'userToken',
      'loginTime',
      'refreshToken',
      'first_name',
      'last_name',
      'email',
      'userUUID',
      'user_id',
      'creditsRemaining'
    ];
    keysToRemove.forEach((key) => localStorage.removeItem(key));

    // Reset local state
    setCreditsRemaining(0);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        creditsRemaining,
        updateCredits,
        refreshCredits, // Exposing refreshCredits so it can be called after actions that change credits
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
