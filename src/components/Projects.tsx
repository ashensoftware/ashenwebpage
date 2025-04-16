import React, { useState, useMemo, useEffect } from "react";
import "../App.css";
import { projects } from "../constants/ashenData";
import logo from "../assets/logo.png";
import background from "../assets/background.png";

interface ProjectPopupProps {
  project: (typeof projects)[0];
  onClose: () => void;
}

const ProjectPopup: React.FC<ProjectPopupProps> = ({ project, onClose }) => {
  useEffect(() => {
    document.body.classList.add("popup-open");
    return () => {
      document.body.classList.remove("popup-open");
    };
  }, []);

  return (
    <div className="project-popup-overlay" onClick={onClose}>
      <div className="project-popup" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>
          <span className="close-icon"></span>
        </button>
        <div className="popup-image">
          <img src={project.image} alt={project.name} />
        </div>
        <div className="popup-content">
          <h2>{project.name}</h2>
          <div className="popup-tags">
            {project.tags.map((tag, idx) => (
              <span key={idx} className="project-tag">
                {tag}
              </span>
            ))}
          </div>
          <p className="popup-description">{project.longDesc}</p>
          <p className="popup-source">{project.source}</p>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="popup-link"
          >
            Ver proyecto →
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  // Get unique tags from all projects
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((project) => {
      project.tags.forEach((tag) => tags.add(tag));
    });
    return ["Todos", ...Array.from(tags)];
  }, []);

  // Filter projects based on selected tag
  const filteredProjects = useMemo(() => {
    if (!selectedTag || selectedTag === "Todos") return projects;
    return projects.filter((project) => project.tags.includes(selectedTag));
  }, [selectedTag]);

  return (
    <div className="projects-container">
      <div className="project-city">
        <img
          src={background}
          alt="Ciudad"
          style={{
            width: "100vw",
            height: "100%",
            objectFit: "cover",
            rotate: "180deg",
            transform: "scaleX(-1)",
          }}
        />
      </div>
      <div className="project-bg" />
      <section className="projects-section" id="projects">
        <div className="projects-header">
          <h2 className="section-title">Proyectos recientes</h2>
          <a href="#" className="view-all">
            Ver todos →
          </a>
        </div>

        <div className="projects-tags">
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`tag-button ${selectedTag === tag ? "active" : ""}`}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, idx) => (
            <div
              className="project-card"
              key={idx}
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-image">
                <img src={project.image} alt={project.name} />
                <div className="project-tags">
                  {project.tags.map((tag, tagIdx) => (
                    <span key={tagIdx} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="project-info">
                <h3>{project.name}</h3>
                <p>{project.desc}</p>
                <button className="project-arrow">→</button>
              </div>
            </div>
          ))}
        </div>

        {selectedProject && (
          <ProjectPopup
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </section>
      <div className="project-city-2">
        <img
          src={background}
          alt="Ciudad"
          style={{
            width: "100vw",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
};

export default Projects;
