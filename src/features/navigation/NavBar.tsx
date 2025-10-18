import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './NavBar.css';

interface NavBarProps {
  home: string;
  services: string;
  about: string;
  contact: string;
}

export const NavBar: React.FC<NavBarProps> = ({ home, services, about, contact }) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleServicesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    if (location.pathname === '/') {
      // Si estamos en la página principal, hacer scroll suave
      const element = document.querySelector('#servicios');
      if (element) {
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        const middle = absoluteElementTop - (window.innerHeight / 2);
        
        window.scrollTo({
          top: middle,
          behavior: 'smooth'
        });
      }
    } else {
      // Si estamos en otra página, navegar a la principal y luego hacer scroll
      navigate('/#servicios');
    }
  };

  return (
    <nav className="ashen-nav">
      <div className="ashen-nav-inner">
        <div className="ashen-nav-brand">
          <Link to="/">
            <img 
              src="/assets/logo/Logo-Iso-Horizontal.png" 
              alt="ASHEN Logo" 
              className="ashen-nav-logo" 
            />
          </Link>
        </div>
        
        <div className={`ashen-nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="ashen-nav-link" onClick={() => setIsMenuOpen(false)}>
            {home}
          </Link>
          <a href="#servicios" className="ashen-nav-link" onClick={handleServicesClick}>
            {services}
          </a>
          <Link to="/about" className="ashen-nav-link" onClick={() => setIsMenuOpen(false)}>
            {about}
          </Link>
          <a href="https://wa.me/573105602568" className="ashen-nav-link" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>
            {contact}
          </a>
          <button 
            className="ashen-nav-lang" 
            onClick={toggleLanguage}
            aria-label="Toggle language"
          >
            {i18n.language === 'es' ? 'EN' : 'ES'}
          </button>
        </div>
        
        <button 
          className={`ashen-nav-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};