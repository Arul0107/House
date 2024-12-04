import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import heroImage from '../assets/images/house.png';
import logoImage from '../assets/images/logo.png';
import buyerImage from '../assets/images/buyer.jpg';
import sellerImage from '../assets/images/seller.jpg';
import agentImage from '../assets/images/agent.jpg';
import propertySearchImage from '../assets/images/property_search.jpg';
import marketAnalysisImage from '../assets/images/market_analysis.jpg';
import consultingImage from '../assets/images/consulting.jpg';
import villaImage from '../assets/images/villa.jpg';
import flatImage from '../assets/images/flat.jpg';
import landImage from '../assets/images/land.jpg';

const LandingPage = () => {
  const scrollToAbout = () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <header id="home" className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="container text-center">
          <div className="hero-content">
            <h1>Your Dream Home Awaits</h1>
            <p style={{ color: 'white', fontSize: '52px' }}>Connecting buyers and sellers in the real estate market.</p>
            <button className="btn btn-primary mt-3" onClick={scrollToAbout}>Join With Us</button>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="about-section py-5">
        <div className="container">
          <h2 className="text-center mb-4">About Us</h2>
          <p className="text-center mb-4">We are dedicated to making the home buying and selling process as seamless and stress-free as possible. With years of experience in the real estate market, we connect you with the best opportunities.</p>
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <img src={buyerImage} alt="Home Buyers" className="card-img-top" />
                <div className="card-body text-center">
                  <h3>For Buyers</h3>
                  <p>Discover your dream home with our extensive listings and expert advice tailored to your needs.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <img src={sellerImage} alt="Home Sellers" className="card-img-top" />
                <div className="card-body text-center">
                  <h3>For Sellers</h3>
                  <p>Get the best value for your property with our comprehensive market analysis and marketing strategies.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <img src={agentImage} alt="Real Estate Agents" className="card-img-top" />
                <div className="card-body text-center">
                  <h3>For Agents</h3>
                  <p>Partner with us to reach more clients and grow your business with our advanced tools and resources.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Our Services</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <img src={propertySearchImage} alt="Property Search" className="card-img-top" />
                <div className="card-body text-center">
                  <h3>Property Search</h3>
                  <p>Access a wide range of property listings that match your preferences and budget.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <img src={marketAnalysisImage} alt="Market Analysis" className="card-img-top" />
                <div className="card-body text-center">
                  <h3>Market Analysis</h3>
                  <p>Get detailed market reports to make informed buying and selling decisions.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <img src={consultingImage} alt="Consulting" className="card-img-top" />
                <div className="card-body text-center">
                  <h3>Consulting</h3>
                  <p>Benefit from personalized consulting services that guide you through the real estate process.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-4">
              <div className="card">
                <img src={villaImage} alt="Villas" className="card-img-top" />
                <div className="card-body text-center">
                  <h3>Villas</h3>
                  <p>Explore luxurious villas that offer comfort and style in prime locations.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-4">
              <div className="card">
                <img src={flatImage} alt="Flats" className="card-img-top" />
                <div className="card-body text-center">
                  <h3>Flats</h3>
                  <p>Find modern flats that combine convenience with contemporary living.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-4">
              <div className="card">
                <img src={landImage} alt="Empty Lands" className="card-img-top" />
                <div className="card-body text-center">
                  <h3>Empty Lands</h3>
                  <p>Invest in prime plots of land to build your dream home or for future development.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section py-5">
        <div className="container">
          <h2 className="text-center mb-4">Contact Us</h2>
          <p className="text-center mb-4">We're here to help you with all your real estate needs. Reach out to us today!</p>
          <form className="contact-form mx-auto" style={{ maxWidth: '600px' }}>
            <div className="mb-3">
              
              <input type="text" name="name" placeholder="Your Name" className="form-control" required />
            </div>
            <div className="mb-3">
              <input type="email" name="email" placeholder="Your Email" className="form-control" required />
            </div>
            <div className="mb-3">
              <textarea name="message" placeholder="Your Message" className="form-control" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section bg-dark text-white py-4">
        <div className="container text-center">
          <div className="footer-logo mb-3">
            <img src={logoImage} alt="Logo" className="footer-logo-img" />
            <h2>Local Nest</h2>
          </div>
          <p>&copy; 2024 Local Nest. All Rights Reserved.</p>
          <span> Design by Arulprakash  </span>
          <ul className="list-inline">
            <li className="list-inline-item"><a href="#home" className="text-white">Home</a></li>
            <li className="list-inline-item"><a href="#about" className="text-white">About</a></li>
            <li className="list-inline-item"><a href="#services" className="text-white">Services</a></li>
            <li className="list-inline-item"><a href="#contact" className="text-white">Contact</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
