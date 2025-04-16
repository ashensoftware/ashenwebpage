import React from 'react';
import '../App.css';
import { projects } from '../constants/ashenData';

const Projects: React.FC = () => (
  <section className="projects-section" id="projects">
    <h2 className="section-title">Proyectos</h2>
    <div className="projects-grid">
      {projects.map((proj, idx) => (
        <div className="project-card" key={idx}>
          <h3>{proj.name}</h3>
          <p>{proj.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Projects; 