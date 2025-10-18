import React from 'react';
import '../App.css';
import { team, TeamMember } from '../constants/ashenData';

const About: React.FC = () => (
  <section className="about-section" id="about">
    <div className="about-container">
      <h2 className="section-title">Nosotros</h2>
      
      <div className="about-grid">
        <div className="about-card mission">
          <div className="about-card-content">
            <h3>Misión</h3>
            <p>Creamos soluciones tecnológicas innovadoras y sostenibles para transformar el mundo digital.</p>
          </div>
        </div>
        
        <div className="about-card vision">
          <div className="about-card-content">
            <h3>Visión</h3>
            <p>Ser líderes en desarrollo de tecnologías emergentes en Latinoamérica, impulsando el cambio y la excelencia.</p>
          </div>
        </div>
        
        <div className="about-card values">
          <div className="about-card-content">
            <h3>Valores</h3>
            <ul>
              <li>Innovación constante</li>
              <li>Excelencia técnica</li>
              <li>Colaboración efectiva</li>
              <li>Sostenibilidad</li>
            </ul>
          </div>
        </div>
        
        <div className="about-card approach">
          <div className="about-card-content">
            <h3>Enfoque</h3>
            <p>Desarrollamos soluciones personalizadas que se adaptan a las necesidades específicas de cada cliente.</p>
          </div>
        </div>
      </div>

      <h2 className="section-title team-title">Nuestro Equipo</h2>
      <div className="team-grid">
        {team.map((member: TeamMember, idx: number) => (
          <div className="team-card" key={idx}>
            <div className="team-card-inner">
              <div className="team-img-container">
                <img src={member.img} alt={member.name} className="team-img" />
              </div>
              <div className="team-info">
                <h4>{member.name}</h4>
                <span className="team-role">{member.role}</span>
                <p>{member.bio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default About; 