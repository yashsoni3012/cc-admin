import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom'; // Add Navigate
import './App.css';

import ScrollToTop from './components/ScrollToTop';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Category from './components/AdminComponents/CategoryManager';

// Protected Route wrapper component
const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin');
  
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Layout for protected routes (with footer)
const ProtectedLayout = () => {
  return (
    <>
      <div className="main-content">
        <Outlet />
      </div>
    </>
  );
};

// Layout for public routes (without footer or with different footer)
const PublicLayout = () => {
  return (
    <>
      <div className="main-content">
        <Outlet />
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          {/* Public routes - no authentication required */}
          <Route element={<PublicLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Protected routes - require authentication */}
          <Route element={<ProtectedLayout />}>
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/category" 
              element={
                <ProtectedRoute>
                  <Category />
                </ProtectedRoute>
              } 
            />
            {/* Add other protected routes here */}
          </Route>

          {/* Catch all unknown routes - redirect to login or dashboard based on auth */}
          <Route 
            path="*" 
            element={
              localStorage.getItem('isAdmin') ? 
              <Navigate to="/" replace /> : 
              <Navigate to="/login" replace />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;