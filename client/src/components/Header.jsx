// client/src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/" className="header-logo-link">
          <h1 className="header-title">Arcana Whispers</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
