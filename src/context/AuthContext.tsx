import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthContextType } from '../types';
import { getFromStorage, setToStorage, removeFromStorage } from '../utils/storage';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Test accounts
const TEST_ACCOUNTS = [
  { email: 'demo@example.com', password: 'password123', name: 'Demo User' },
  { email: 'test@user.com', password: 'testpass', name: 'Test User' }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => getFromStorage<User | null>('auth_user', null));
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const account = TEST_ACCOUNTS.find(acc => acc.email === email && acc.password === password);

    if (!account) {
      setLoading(false);
      throw new Error('Invalid email or password');
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: account.email,
      name: account.name,
      createdAt: new Date().toISOString()
    };

    setUser(newUser);
    setToStorage('auth_user', newUser);
    setToStorage('auth_token', 'mock-token-' + newUser.id);
    setLoading(false);
  };

  const signup = async (name: string, email: string, password: string): Promise<void> => {
    setLoading(true);
    if (password){
      console.log('Password received for signup');
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      createdAt: new Date().toISOString()
    };

    setUser(newUser);
    setToStorage('auth_user', newUser);
    setToStorage('auth_token', 'mock-token-' + newUser.id);
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    removeFromStorage('auth_user');
    removeFromStorage('auth_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
