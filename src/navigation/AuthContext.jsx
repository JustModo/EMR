import React, { createContext, useState } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const online = () => {
    setIsOnline(true);
  };

  const offline = () => {
    setIsOnline(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, online, offline, isOnline }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
