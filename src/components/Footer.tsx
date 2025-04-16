import React from "react";
import "../App.css";
import logo from "../assets/logo.png";
import { Instagram, Linkedin, Mail, MapPin, Building2, Calendar, FileText } from "lucide-react";

const Footer: React.FC = () => (
  <footer className="footer-section" id="contact">
    <div className="footer-bg-logo">
      <img src={logo} alt="ASHEN watermark" />
    </div>
    <div className="footer-content">
      <div className="footer-info">
        <div className="footer-info-section">
          <h3>Información Legal</h3>
          <div className="info-item">
            <Building2 size={18} className="info-icon" />
            <span>NIT: 901.938.360-1</span>
          </div>
          <div className="info-item">
            <FileText size={18} className="info-icon" />
            <span>Actividad: Desarrollo de sistemas informáticos</span>
          </div>
          <div className="info-item">
            <Calendar size={18} className="info-icon" />
            <span>Inicio de actividades: 04/16/2025</span>
          </div>
        </div>

        <div className="footer-info-section">
          <h3>Contacto</h3>
          <div className="info-item">
            <MapPin size={18} className="info-icon" />
            <span>Medellín, Antioquia</span>
          </div>
          <div className="info-item">
            <Mail size={18} className="info-icon" />
            <span>softwareashen@gmail.com</span>
          </div>
        </div>
      </div>

      <div className="footer-socials">
        <a href="https://www.instagram.com/ashensoftware/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link">
          <Instagram size={24} />
        </a>
        <a href="https://www.linkedin.com/company/ashen-software/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link">
          <Linkedin size={24} />
        </a>
        <a href="mailto:softwareashen@gmail.com" aria-label="Email" className="social-link">
          <Mail size={24} />
        </a>
      </div>

      <div className="footer-bottom">
        <p>© 2025 ASHEN Software. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
