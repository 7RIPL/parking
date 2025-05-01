import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ParkingSpotsPage from './pages/ParkingSpotsPage';
import ReservationsPage from './pages/ReservationsPage';
import { CssBaseline } from '@mui/material';

const App: React.FC = () => {
  return (
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/parking-spots" element={<ParkingSpotsPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;