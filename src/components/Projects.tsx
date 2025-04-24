import React, { useState, useMemo, useEffect } from "react";
import "../App.css";
import { projects } from "../constants/ashenData";
import background from "../assets/background.png";
import { useTranslation } from "react-i18next";

interface ProjectPopupProps {
  project: (typeof projects)[0];
  onClose: () => void;
  language: string;
}

const ProjectPopup: React.FC<ProjectPopupProps> = ({ project, onClose, language }) => {
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
            {language ==="es"?project.tags.map((tag, idx) => (
              <span key={idx} className="project-tag">
                {tag}
              </span>)):
              project.tagsEn.map((tag, idx) => (
                <span key={idx} className="project-tag">
                  {tag}
                </span>
              ))
            }
          </div>
          <p className="popup-description">{ language === "es" ? project.longDesc: project.longDescEn }</p>
          <p className="popup-source">{ language==="es"?project.source: project.sourceEn }</p>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="popup-link"
          >
            {language === "es" ? "Ver proyecto →": "View project →"}
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = ({ title }: { title:string }) => {
  const { i18n } = useTranslation();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();

    // Si estamos en español, obtenemos las etiquetas de 'tags', si estamos en inglés, de 'tagsEn'
    if (i18n.language === "es") {
      projects.forEach((project) => {
        project.tags.forEach((tag) => tags.add(tag));
      });
    } else {
      projects.forEach((project) => {
        project.tagsEn.forEach((tag) => tags.add(tag));
      });
    }

    // Agregar "Todos" o "Everything" según el idioma
    const text = i18n.language === "es" ? "Todos" : "Everything";
    return [text, ...Array.from(tags)];
  }, [i18n.language]); 

  // Filter projects based on selected tag
  const filteredProjects = useMemo(() => {
    if (!selectedTag || selectedTag === "Todos" || selectedTag === "Everything") return projects;
    if (i18n.language === "es") {
      return projects.filter((project) =>
        project.tags.includes(selectedTag)
      );
    } else {
      return projects.filter((project) =>
        project.tagsEn.includes(selectedTag)
      );
    }
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
          <h2 className="section-title">{title}</h2>
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
                <p>{i18n.language === "es"? project.desc : project.descEn}</p>
                <button className="project-arrow">→</button>
              </div>
            </div>
          ))}
        </div>

        {selectedProject && (
          <ProjectPopup
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            language={i18n.language}
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
