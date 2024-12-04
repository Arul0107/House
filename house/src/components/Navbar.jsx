import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import home from '../assets/images/logo.png';
import Preloader from './Preloader';

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // useNavigate hook to programmatically navigate

  // Handle the loading state for page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Preloader time on page load

    return () => clearTimeout(timer);
  }, []);

  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  const handleClose = () => {
    setNavbarOpen(false);
  };

  const handleLoginClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/login'); // Navigate to the login page after the preloader completes
    }, 1500); // Adjust the timing as needed
  };

  return (
    <>
      {loading && <Preloader />}
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={home} alt="Logo" className="navbar-logo" />
            <span className="navbar-brand-name">Local Nest</span>
          </Link>
          <button
            className={`navbar-toggler ${navbarOpen ? '' : 'collapsed'}`}
            type="button"
            onClick={handleToggle}
            aria-controls="navbarNav"
            aria-expanded={navbarOpen ? 'true' : 'false'}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse justify-content-end ${navbarOpen ? 'show' : ''}`}
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#home" onClick={handleClose}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about" onClick={handleClose}>
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services" onClick={handleClose}>
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact" onClick={handleClose}>
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <span className="nav-link" onClick={handleLoginClick} style={{ cursor: 'pointer' }}>
                  Login
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
