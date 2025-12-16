import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// --- IMPORT THE NEW COMPONENT ---
import ScrollToTop from './components/ScrollToTop'; 

import Login from './pages/Login';
import About from './pages/About';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import AdminDashboard from './pages/AdminDashboard';
import Category from './components/AdminComponents/Category';
import NavBar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      {/* --- ADD IT HERE --- */}
      <ScrollToTop /> 
      {/* ------------------- */}

      <div className="App">
        <NavBar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/category" element={<Category />} />
          
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;