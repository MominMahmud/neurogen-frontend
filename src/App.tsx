import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import EvaluationsPage from './pages/EvaluationsPage';
import ResultPage from './pages/ResultPage';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/evaluations" element={<EvaluationsPage />} />
          <Route path="/result/:id" element={<ResultPage />} />
        </Routes>
      </Container>
    </>
  );
};

export default App; 