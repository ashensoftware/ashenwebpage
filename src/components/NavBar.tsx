import React from 'react';
import '../App.css';
import logo from '../assets/logo.png';

const NavBar: React.FC = () => (
  <nav className="ashen-nav-fixed">
    <div className="ashen-nav-inner">
      <a href="#hero" className="ashen-nav-logo-link">
        <img src={logo} alt="ASHEN Logo" className="ashen-nav-logo" />
      </a>
      <div className="ashen-nav-links">
        <a href="#hero">Inicio</a>
        <a href="#about">Nosotros</a>
        <a href="#projects">Proyectos</a>
        <a href="#contact">Contacto</a>
      </div>
    </div>
    <div className="ashen-nav-line" />
  </nav>
);

export default NavBar; 