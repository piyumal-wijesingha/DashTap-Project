import React from 'react';
import './Header.css';

function HeaderTag() {
  const handleAddVehicleClick = () => {
    alert("Add Vehicle button clicked!");
  };

  return (
    <header className="navbar">
      <div className="logo">
        <img src="logo.JFIF" alt="Logo" className="logo-img" />
        <span className="brand-name">DASH TAP</span>
      </div>

      <nav className="nav-links a">
        <a href="#home">Driver Registration</a>
      </nav>

      <div className="home-btn">
        <button onClick={handleAddVehicleClick}>Home</button>
      </div>
    </header>
  );
}

export default HeaderTag;
