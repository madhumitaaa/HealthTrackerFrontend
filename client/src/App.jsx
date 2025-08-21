import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Components/Header';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EntriesPage from './pages/EntriesPage';
import Dashboardpage from './pages/Dashboardpage';
import axios from 'axios';


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/entries" element={<EntriesPage />} />
          <Route path="/dashboard" element={<Dashboardpage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
