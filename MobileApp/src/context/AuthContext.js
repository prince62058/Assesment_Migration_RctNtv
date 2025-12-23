import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedUser = await AsyncStorage.getItem('user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load auth data', error);
      } finally {
        setLoading(false);
      }
    };

    loadStorageData();
  }, []);

  const login = async (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    try {
      await AsyncStorage.setItem('token', tokenData);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to save auth data', error);
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Failed to remove auth data', error);
    }
  };


  const isAuthenticated = () => {
    return !!token && !!user;
  };


  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated,
    loading,
  };


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
