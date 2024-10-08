import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/global.css";
import "../styles/home.css";
import { AuthContext } from "./AuthContext";

export default function Navbar() {
  const { isLogin } = useContext(AuthContext);

  return (
    <nav className="mynavbar">
      <div>
        <Link to="/">Home</Link>
      </div>

      <div>
        <Link to="/about">About</Link>
      </div>
      <div>
        <Link to="/product">Product</Link>
      </div>
      {isLogin ? (
        <div>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      ) : (
        <div>
          <Link to="/auth">Login</Link>
        </div>
      )}
    </nav>
  );
}
