import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { authService } from '../lib/api';
import { toast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (data: any) => {
    try {
      // If no data provided, generate a random user
      const loginData = data || { 
        id: uuidv4(), 
        name: `User_${Math.random().toString(36).substr(2, 9)}` 
      };

      const { user } = await authService.login(loginData);
      
      localStorage.setItem('user', JSON.stringify(user));
      
      setUser(user);
      setIsAuthenticated(true);
      
      toast({
        title: 'Login Successful',
        description: 'Welcome!'
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      
      toast({
        variant: 'destructive',
        title: 'Login Error',
        description: errorMessage
      });
      
      setUser(null);
      setIsAuthenticated(false);
      
      throw error;
    }
  };

  const register = async (data: any) => {
    try {
      // If no data provided, generate a random user
      const registrationData = data || { 
        id: uuidv4(), 
        name: `User_${Math.random().toString(36).substr(2, 9)}` 
      };

      const { user } = await authService.register(registrationData);
      
      localStorage.setItem('user', JSON.stringify(user));
      
      setUser(user);
      setIsAuthenticated(true);
      
      toast({
        title: 'Registration Successful',
        description: 'Welcome to the platform!'
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      
      toast({
        variant: 'destructive',
        title: 'Registration Error',
        description: errorMessage
      });
      
      setUser(null);
      setIsAuthenticated(false);
      
      throw error;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('user');
      
      setUser(null);
      setIsAuthenticated(false);
      
      toast({
        title: 'Logout Successful',
        description: 'You have been logged out'
      });
    } catch (error) {
      console.error('Logout error:', error);
      
      toast({
        variant: 'destructive',
        title: 'Logout Error',
        description: 'An error occurred during logout'
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
