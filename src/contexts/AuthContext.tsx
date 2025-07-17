import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  username: string;
  virtualOfficeName: string;
  email?: string;
  role?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

interface LoginCredentials {
  virtualOfficeName: string;
  username: string;
  password: string;
  rememberMe: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in on app start
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // For now, let's simulate checking localStorage
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');

      if (token && userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      // Simulate API call - replace with your actual API
      console.log('Login attempt:', credentials);

      // For demo purposes, let's accept any credentials
      const mockUser: User = {
        id: '1',
        username: credentials.username,
        virtualOfficeName: credentials.virtualOfficeName,
        email: `${credentials.username}@example.com`,
        role: 'admin',
      };

      const mockToken = 'mock-jwt-token';

      // Store token and user data
      if (credentials.rememberMe) {
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('userData', JSON.stringify(mockUser));
      } else {
        sessionStorage.setItem('authToken', mockToken);
        sessionStorage.setItem('userData', JSON.stringify(mockUser));
      }

      setUser(mockUser);

      // TODO: Replace with actual API call
      /*
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const { user, token } = await response.json();
        
        if (credentials.rememberMe) {
          localStorage.setItem('authToken', token);
          localStorage.setItem('userData', JSON.stringify(user));
        } else {
          sessionStorage.setItem('authToken', token);
          sessionStorage.setItem('userData', JSON.stringify(user));
        }
        
        setUser(user);
      } else {
        throw new Error('Login failed');
      }
      */
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userData');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
