import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'; // 1. Import Outlet
import './App.css';

import ScrollToTop from './components/ScrollToTop';
import Login from './pages/Login';
// import About from './pages/About';
// import Home from './pages/Home';
// import ContactUs from './pages/ContactUs';
import AdminDashboard from './pages/AdminDashboard';
import Category from './components/AdminComponents/CategoryManager';
// import NavBar from './components/Navbar';
import Footer from './components/Footer';

// 2. Create a Layout Component
// This component renders the Navbar, the child page (Outlet), and the Footer
const MainLayout = () => {
  return (
    <>
      {/* <NavBar /> */}
      <div className="main-content">
        <Outlet /> {/* This represents the component of the current route (e.g., Home, About) */}
      </div>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>

          <Route element={<MainLayout />}>
            {/* <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} /> */}
            <Route path="/login" element={<Login />} />
          </Route>

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/category" element={<Category />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;