import React from 'react';
import '../App.css';
import logo from '../assets/logo.png';
import background from '../assets/background.png';

const Hero: React.FC = () => (
  <section className="hero-section" id="hero">
    <div className="hero-bg" />
    <div className="hero-bg-logo">
      <img src={logo} alt="ASHEN Marca de agua" />
    </div>
    <div className="hero-content">
      <h1 className="hero-title">ASHEN</h1>
      <div className="hero-software-row">
        <span className="hero-line-deco" />
        <span className="hero-software">software</span>
        <span className="hero-line-deco" />
      </div>
      <span className="hero-sub">Desarrollamos tecnología que trasciende</span>
    </div>
    <div className="hero-city">
      <img src={background} alt="Ciudad" style={{ width: '100vw', height: '100%', objectFit: 'cover' }} />
    </div>
  </section>
);

export default Hero; 