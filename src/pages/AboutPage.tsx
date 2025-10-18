import React from 'react';
import { Link } from 'react-router-dom';
import { BackgroundPaths } from '../features/animations/BackgroundPaths';
import './AboutPage.css';

export const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <BackgroundPaths className="about-page-section">
        <div className="about-page-container">
          {/* Header */}
          <div className="about-page-header">
            <Link to="/" className="about-page-logo">
              <img 
                src="/assets/logo/Logo-Iso-Horizontal.png" 
                alt="ASHEN Logo" 
                className="about-page-logo-img" 
              />
            </Link>
            <Link to="/" className="about-page-back-btn">
              ← Volver al Inicio
            </Link>
          </div>

          {/* Mission and Vision Section */}
          <div className="about-mission-vision">
            <div className="mission-vision-content">
              <div className="mission-vision-item">
                <h2 className="mission-vision-title">Propósito</h2>
                <p className="mission-vision-text">
                  Nuestro propósito es empoderar a las industrias con soluciones tecnológicas innovadoras, 
                  brindando software y herramientas que no solo resuelven los problemas actuales, sino que 
                  también abren nuevas oportunidades. Además de mejorar la productividad, buscamos contribuir 
                  al bienestar social y económico, apoyando proyectos que generen un impacto positivo en las comunidades.
                </p>
              </div>
              <div className="mission-vision-item">
                <h2 className="mission-vision-title">Visión</h2>
                <p className="mission-vision-text">
                  Ser una empresa líder en innovación tecnológica para el año 2030, reconocida por nuestra 
                  capacidad para proporcionar soluciones de software personalizadas, eficientes y accesibles. 
                  Nos esforzamos por ser una de las mejores startups tecnológicas del mundo, destacándonos 
                  por nuestra agilidad, creatividad y capacidad de adaptación a las demandas del mercado. 
                  Aportamos al desarrollo de las industrias mediante soluciones que generan un impacto 
                  positivo, sostenible y transformador, contribuyendo al bienestar de las comunidades a nivel global.
                </p>
              </div>
            </div>
          </div>

          {/* Who We Are Section */}
          <div className="about-who-we-are">
            <h2 className="about-section-title">¿Quiénes somos?</h2>
            <div className="who-we-are-content">
              <p className="who-we-are-text">
                Todo comenzó en 2023 cuando un grupo de jóvenes apasionados por la tecnología y la innovación 
                participó en un hackathon para transformar ideas en soluciones reales. Nuestra primera experiencia 
                fue en Expongeniería 2023, donde ganamos tres smartwatches, lo que encendió una serie de éxitos.
              </p>
              <p className="who-we-are-text">
                En diciembre de 2023 participamos en un e-Summit, un hackathon enfocado en e-commerce, donde 
                desarrollamos soluciones innovadoras y logramos el segundo lugar. Este reconocimiento nos motivó 
                a seguir mejorando nuestras habilidades.
              </p>
              <p className="who-we-are-text">
                Continuamos participando en hackathons durante 2024. En Global Game Jam no ganamos premios pero 
                obtuvimos una valiosa experiencia de aprendizaje. Sin embargo, logramos el primer lugar en 
                Diverse League e ICP Hackathon. Estas victorias solidificaron la confianza de nuestro equipo 
                y demostraron nuestra capacidad para crear soluciones tecnológicas impactantes.
              </p>
              <p className="who-we-are-text">
                En este punto surgió la idea de fundar una empresa. Queríamos que las soluciones desarrolladas 
                en hackathons no se quedaran en el olvido, sino que se materializaran en productos reales que 
                pudieran beneficiar a la sociedad. Así nació ASHEN, con el propósito de transformar la innovación 
                en acción y llevar nuestras ideas al mercado.
              </p>
            </div>
          </div>

          {/* Value Proposition Section */}
          <div className="about-value-proposition">
            <h2 className="about-section-title">Propuesta de Valor</h2>
            <div className="value-proposition-content">
              <p className="value-proposition-text">
                Facilidad de trabajar con nosotros, teniendo tiempos de entrega ágiles y costos competitivos, 
                respaldados por un equipo ágil y enfocado en soluciones innovadoras y personalizadas. Nuestro 
                objetivo es posicionarnos como un aliado estratégico para el desarrollo de proyectos tecnológicos 
                que impacten positivamente en las industrias.
              </p>
            </div>
          </div>

          {/* Our Culture Section */}
          <div className="about-culture">
            <h2 className="about-section-title">Nuestra Cultura</h2>
            <div className="culture-grid">
              <div className="culture-item">
                <h3 className="culture-title">Aprendizaje Continuo y Adaptación Rápida</h3>
                <p className="culture-text">
                  Nos comprometemos con el crecimiento profesional y personal, el aprendizaje constante y la 
                  adaptación a nuevas tecnologías. Fomentamos una mentalidad de aprendizaje rápido, agilidad 
                  y eficiencia para enfrentar desafíos y mantenernos a la vanguardia.
                </p>
              </div>
              <div className="culture-item">
                <h3 className="culture-title">Colaboración y Trabajo en Equipo</h3>
                <p className="culture-text">
                  Fomentamos un entorno de trabajo inclusivo y colaborativo donde cada miembro del equipo 
                  contribuye al éxito colectivo. Valoramos las ideas diversas y promovemos la cooperación 
                  interdepartamental para generar soluciones integrales y de alto impacto.
                </p>
              </div>
              <div className="culture-item">
                <h3 className="culture-title">Investigación y Desarrollo</h3>
                <p className="culture-text">
                  La innovación está en nuestro ADN, con inversión continua en investigación para desarrollar 
                  soluciones que anticipen y superen los desafíos futuros. Utilizamos tecnología de vanguardia 
                  para redefinir los límites de lo posible y convertirnos en pioneros del mercado.
                </p>
              </div>
              <div className="culture-item">
                <h3 className="culture-title">Uso de Nuevas Tecnologías</h3>
                <p className="culture-text">
                  Adoptamos las tecnologías más innovadoras para optimizar procesos, desarrollar productos 
                  de calidad y satisfacer las necesidades cambiantes del mercado. Creemos en el poder de la 
                  tecnología para transformar la forma en que trabajamos e interactuamos con nuestros clientes.
                </p>
              </div>
            </div>
          </div>

          {/* Our Values Section */}
          <div className="about-values">
            <h2 className="about-section-title">Nuestros Valores</h2>
            <div className="values-grid">
              <div className="value-item">
                <h3 className="value-title">Excelencia y Calidad</h3>
                <p className="value-text">
                  Nos esforzamos por entregar soluciones excepcionales, siempre buscando la perfección en cada proyecto.
                </p>
              </div>
              <div className="value-item">
                <h3 className="value-title">Compromiso con el Cliente</h3>
                <p className="value-text">
                  Nos dedicamos a resolver los problemas y necesidades de nuestros clientes con dedicación y profesionalismo.
                </p>
              </div>
              <div className="value-item">
                <h3 className="value-title">Innovación</h3>
                <p className="value-text">
                  Fomentamos un entorno de trabajo que impulsa la creatividad, la experimentación y la búsqueda constante de nuevas tecnologías.
                </p>
              </div>
              <div className="value-item">
                <h3 className="value-title">Responsabilidad Social</h3>
                <p className="value-text">
                  Nos comprometemos a contribuir al bienestar social y económico, utilizando la tecnología para reducir las brechas sociales y económicas.
                </p>
              </div>
              <div className="value-item">
                <h3 className="value-title">Integridad</h3>
                <p className="value-text">
                  Actuamos con honestidad y ética en todas nuestras interacciones y decisiones.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="about-page-footer">
            <p className="about-page-footer-text">
              © 2025 ASHEN Software. Todos los derechos reservados.
            </p>
            <div className="about-page-footer-links">
              <a href="https://wa.me/573105602568" target="_blank" rel="noopener noreferrer" className="about-page-footer-link">
                Contacto
              </a>
              <span className="about-page-footer-separator">•</span>
              <a href="mailto:softwareashen@gmail.com" className="about-page-footer-link">
                Email
              </a>
            </div>
          </div>
        </div>
      </BackgroundPaths>
    </div>
  );
};
