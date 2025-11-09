import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

export type UserRole = 'user' | 'house_user' | 'agent' | 'admin';

export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  role: UserRole;
  balance?: number;
  dataRemaining?: number;
  planExpiry?: Date;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem('streetnet_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call - in production, this would be a real API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo users for testing
      const demoUsers: Record<string, User> = {
        'admin@streetnet.tz': {
          id: '1',
          email: 'admin@streetnet.tz',
          name: 'Admin User',
          role: 'admin',
        },
        'agent@streetnet.tz': {
          id: '2',
          email: 'agent@streetnet.tz',
          name: 'Agent User',
          role: 'agent',
          balance: 50000,
        },
        'user@streetnet.tz': {
          id: '3',
          email: 'user@streetnet.tz',
          name: 'Regular User',
          role: 'user',
          dataRemaining: 2048,
          planExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      };

      const loggedInUser = demoUsers[email];
      if (loggedInUser && password === 'password') {
        setUser(loggedInUser);
        localStorage.setItem('streetnet_user', JSON.stringify(loggedInUser));
        
        toast({
          title: 'Welcome back!',
          description: `Logged in as ${loggedInUser.name}`,
        });

        // Redirect based on role
        if (loggedInUser.role === 'admin') {
          navigate('/admin');
        } else if (loggedInUser.role === 'agent') {
          navigate('/agent');
        } else {
          navigate('/dashboard');
        }
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Invalid email or password',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role,
        ...(role === 'user' && { dataRemaining: 0 }),
        ...(role === 'agent' && { balance: 0 }),
      };

      setUser(newUser);
      localStorage.setItem('streetnet_user', JSON.stringify(newUser));

      toast({
        title: 'Account created!',
        description: 'Welcome to StreetNet',
      });

      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'agent') {
        navigate('/agent');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: 'Signup failed',
        description: 'Could not create account',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('streetnet_user');
    toast({
      title: 'Logged out',
      description: 'See you next time!',
    });
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
