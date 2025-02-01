import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { authService } from '../lib/api';
import { toast } from '@/components/ui/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

// Detailed logging function for frontend
const logAuthEvent = (type: string, details: Record<string, any>) => {
  const timestamp = new Date().toISOString();
  console.log(JSON.stringify({
    timestamp,
    type,
    ...details
  }));
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        logAuthEvent('AUTH_RESTORE', { userId: parsedUser.id });
      } catch (error) {
        logAuthEvent('AUTH_RESTORE_ERROR', { 
          errorMessage: error instanceof Error ? error.message : 'Unknown error' 
        });
        // Clear invalid stored data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      logAuthEvent('LOGIN_ATTEMPT', { email });

      // Input validation
      if (!email || !password) {
        const errorMessage = 'Email and password are required';
        logAuthEvent('LOGIN_VALIDATION_ERROR', { errorMessage });
        toast({
          variant: 'destructive',
          title: 'Login Error',
          description: errorMessage
        });
        throw new Error(errorMessage);
      }

      const { user, token } = await authService.login({ email, password });
      
      // Store authentication data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Update auth state
      setUser(user);
      setIsAuthenticated(true);

      logAuthEvent('LOGIN_SUCCESS', { userId: user.id });
      
      toast({
        title: 'Login Successful',
        description: 'Welcome back!'
      });
    } catch (error: any) {
      // Detailed error handling
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      
      logAuthEvent('LOGIN_ERROR', { 
        errorMessage,
        errorDetails: error.response?.data 
      });
      
      toast({
        variant: 'destructive',
        title: 'Login Error',
        description: errorMessage
      });
      
      // Reset authentication state
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      logAuthEvent('REGISTER_ATTEMPT', { email, name });

      // Input validation
      const validationErrors = [];
      if (!name) validationErrors.push('Name is required');
      if (!email) validationErrors.push('Email is required');
      if (!password) validationErrors.push('Password is required');
      
      if (validationErrors.length > 0) {
        const errorMessage = validationErrors.join(', ');
        logAuthEvent('REGISTER_VALIDATION_ERROR', { errorMessage });
        toast({
          variant: 'destructive',
          title: 'Registration Error',
          description: errorMessage
        });
        throw new Error(errorMessage);
      }

      const { user, token } = await authService.register({ name, email, password });
      
      // Store authentication data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Update auth state
      setUser(user);
      setIsAuthenticated(true);

      logAuthEvent('REGISTER_SUCCESS', { userId: user.id });
      
      toast({
        title: 'Registration Successful',
        description: 'Your account has been created!'
      });
    } catch (error: any) {
      // Detailed error handling
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      
      logAuthEvent('REGISTER_ERROR', { 
        errorMessage,
        errorDetails: error.response?.data 
      });
      
      toast({
        variant: 'destructive',
        title: 'Registration Error',
        description: errorMessage
      });
      
      // Reset authentication state
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      throw error;
    }
  };

  const logout = () => {
    try {
      logAuthEvent('LOGOUT_ATTEMPT', { userId: user?.id });

      // Call backend logout endpoint (optional, as JWT is stateless)
      authService.logout();

      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Reset auth state
      setUser(null);
      setIsAuthenticated(false);

      logAuthEvent('LOGOUT_SUCCESS', {});
      
      toast({
        title: 'Logout Successful',
        description: 'You have been logged out.'
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Logout failed';
      
      logAuthEvent('LOGOUT_ERROR', { 
        errorMessage,
        errorDetails: error.response?.data 
      });
      
      toast({
        variant: 'destructive',
        title: 'Logout Error',
        description: errorMessage
      });
    }
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
