// useToken.js
import { useState, useEffect } from 'react';

const useToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('token_expiry');
    if (storedToken && tokenExpiry) {
      const expiryTime = Number.parseInt(tokenExpiry);
      const currentTime = new Date().getTime();

      if (currentTime < expiryTime) {
        setToken(storedToken);
        setupExpiryTimeout(expiryTime - currentTime);
      } else {
        clearToken();
      }
    }
  }, []);

  const setupExpiryTimeout = (delay: number) => {
    setTimeout(() => {
      clearToken();
      alert('Your session has expired. Please log in again.');
    }, delay);
  };

  const saveToken = (newToken: string, expiresIn: number) => {
    const expiryTime = new Date().getTime() + expiresIn * 1000; // Convert expiresIn to milliseconds
    localStorage.setItem('token', newToken);
    localStorage.setItem('token_expiry', expiryTime.toString());
    setToken(newToken);
    setupExpiryTimeout(expiresIn * 1000);
  };

  const clearToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiry');
    setToken(null);
  };

  return { token, setToken: saveToken, clearToken };
};

export default useToken;
