import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header id="title">
      🩺Health Tracker
      <nav>
        <Link id="entries" to="/entries">Entries  </Link>
        <Link id="dashboard" to="/dashboard">Dashboard  </Link><br></br>
        <Link id="logout"  to="/login">Logout</Link>
      </nav>
    </header>
  );
};

export default Header;
