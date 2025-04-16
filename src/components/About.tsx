import React from 'react';
import '../App.css';
import { team } from '../constants/ashenData';

const About: React.FC = () => (
  <section className="about-section" id="about">
    <h2 className="section-title">Nosotros</h2>
    <div className="about-mv">
      <div>
        <h3>Misión</h3>
        <p>Creamos soluciones tecnológicas innovadoras y sostenibles para transformar el mundo digital.</p>
      </div>
      <div>
        <h3>Visión</h3>
        <p>Ser líderes en desarrollo de tecnologías emergentes en Latinoamérica, impulsando el cambio y la excelencia.</p>
      </div>
    </div>
    <div className="team-grid">
      {team.map((member, idx) => (
        <div className="team-card" key={idx}>
          <img src={member.img} alt={member.name} className="team-img" />
          <h4>{member.name}</h4>
          <span className="team-role">{member.role}</span>
          <p>{member.bio}</p>
        </div>
      ))}
    </div>
  </section>
);

export default About; 