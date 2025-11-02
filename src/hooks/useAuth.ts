import { useState, useCallback } from 'react';
import { storageService } from '../services/storage';

export const useAuth = () => {
  const [tempToken, setTempToken] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const initAuth = useCallback(() => {
    const savedToken = storageService.getToken();
    if (savedToken) {
      setTempToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = useCallback((token: string) => {
    if (token.trim() === '') {
      setError('Token cannot be empty');
      return false;
    }
    storageService.setToken(token);
    setTempToken(token);
    setIsAuthenticated(true);
    setError('');
    return true;
  }, []);

  const logout = useCallback(() => {
    storageService.removeToken();
    setTempToken('');
    setIsAuthenticated(false);
    setError('');
  }, []);

  return {
    tempToken,
    setTempToken,
    isAuthenticated,
    error,
    setError,
    initAuth,
    login,
    logout,
  };
};
