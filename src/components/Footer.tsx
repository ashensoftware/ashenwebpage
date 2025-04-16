import React from "react";
import "../App.css";
import logo from "../assets/logo.png";
import { Twitter, Linkedin, Mail } from "lucide-react";

const Footer: React.FC = () => (
  <footer className="footer-section" id="contact">
    <div className="footer-bg-logo">
      <img src={logo} alt="ASHEN watermark" />
    </div>
    <div className="footer-content">
      <div className="footer-socials">
        <a href="#" aria-label="Twitter">
          <Twitter size={24} />
        </a>
        <a href="#" aria-label="LinkedIn">
          <Linkedin size={24} />
        </a>
        <a href="#" aria-label="Email">
          <Mail size={24} />
        </a>
      </div>
      <div className="footer-contact">
        <span>Contacto: softwareashen@gmail.com</span>
      </div>
    </div>
  </footer>
);

export default Footer;
