
import { createContext, useContext, useState } from 'react';

// Create Context
const AuthContext = createContext();

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user info

  const loginWithWorldId = async () => {
    // Logic for World ID authentication
    const worldIdResponse = await authenticateWithWorldId();
    setUser(worldIdResponse.user); // Save user information
  };

  const logout = () => {
    setUser(null); // Clear user info on logout
  };

  return (
    <AuthContext.Provider value={{ user, loginWithWorldId, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using AuthContext
export const useAuth = () => useContext(AuthContext);
