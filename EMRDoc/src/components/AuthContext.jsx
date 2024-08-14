import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const login = () => {
    setIsLogin(true);
    navigate("/dashboard");
  };

  const logout = () => {
    setIsLogin(false);
    navigate("/");
  };
  return (
    <AuthContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
