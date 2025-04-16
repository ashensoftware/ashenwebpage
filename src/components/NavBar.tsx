import React, { useState, useEffect } from "react";
import "../App.css";
import { Home, Users, FolderKanban, Mail, Menu, X } from "lucide-react";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="ashen-nav-fixed">
      <div className="ashen-nav-inner">
        {/*<a href="#hero" className="ashen-nav-logo-link">
          <img src={logoHorizontal} alt="ASHEN Logo" className="ashen-nav-logo" />
        </a>*/}
        <div className="ashen-nav-links">
          {isMobile ? (
            <>
              <button className="menu-toggle" onClick={toggleMenu}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                <a href="#hero" onClick={closeMenu}>
                  <Home size={20} className="nav-icon" /> Inicio
                </a>
                <a href="#projects" onClick={closeMenu}>
                  <FolderKanban size={20} className="nav-icon" /> Proyectos
                </a>
                <a href="#about" onClick={closeMenu}>
                  <Users size={20} className="nav-icon" /> Nosotros
                </a>
                <a href="#contact" onClick={closeMenu}>
                  <Mail size={20} className="nav-icon" /> Contacto
                </a>
              </div>
            </>
          ) : (
            <>
              <a href="#hero">
                <Home size={20} className="nav-icon" /> Inicio
              </a>
              <a href="#projects">
                <FolderKanban size={20} className="nav-icon" /> Proyectos
              </a>
              <a href="#about">
                <Users size={20} className="nav-icon" /> Nosotros
              </a>
              <a href="#contact">
                <Mail size={20} className="nav-icon" /> Contacto
              </a>
            </>
          )}
        </div>
      </div>
      <div className="ashen-nav-line" />
    </nav>
  );
};

export default NavBar;
