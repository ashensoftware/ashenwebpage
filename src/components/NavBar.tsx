import React from "react";
import "../App.css";
import logoHorizontal from "../assets/logo-horizontal.png";
import { Home, Users, FolderKanban, Mail } from "lucide-react";

const NavBar: React.FC = () => (
  <nav className="ashen-nav-fixed">
    <div className="ashen-nav-inner">
      {/*<a href="#hero" className="ashen-nav-logo-link">
        <img src={logoHorizontal} alt="ASHEN Logo" className="ashen-nav-logo" />
      </a>*/}
      <div className="ashen-nav-links">
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
      </div>
    </div>
    <div className="ashen-nav-line" />
  </nav>
);

export default NavBar;
