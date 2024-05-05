import React, { createContext, useState } from "react";
import { checkConnection } from "../screens/DashboardPage/scripts/api";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const login = () => {
    setIsLoggedIn(true);
    console.log("Hi");
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

  async function checkIsOnline() {
    const status = await checkConnection();
    if (status) {
      console.log("online");
      online();
      return true;
    } else {
      console.log("offline");
      offline();
      return false;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        online,
        offline,
        isOnline,
        checkIsOnline,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
