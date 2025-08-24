import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    setShowWelcome(true);
    localStorage.setItem('user', JSON.stringify(userData));
    
    setTimeout(() => {
      setShowWelcome(false);
    }, 5000);
  };

  const signup = (userData) => {
    setUser(userData);
    setShowWelcome(true);
    localStorage.setItem('user', JSON.stringify(userData));
    
    setTimeout(() => {
      setShowWelcome(false);
    }, 5000);
    
    return userData;
  };

  const logout = () => {
    setUser(null);
    setShowWelcome(false);
    localStorage.removeItem('user');
    // Clear any other auth-related data
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    
    // Optional: Clear session storage as well
    sessionStorage.clear();
    
    // Force a hard refresh to ensure all state is cleared
    window.location.href = '/';
  };

  const updateUser = (userData) => {
    const updatedUser = {...user, ...userData};
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateUser,
    loading,
    showWelcome,
    setShowWelcome
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}