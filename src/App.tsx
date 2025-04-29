import { useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Footer from './components/Footer';
import './i18n';
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();  // Obtenemos la función de traducción

  useEffect(() => {
    // Configurar el scroll suave para toda la aplicación
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Prevenir scroll horizontal
    const preventHorizontalScroll = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventHorizontalScroll, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', preventHorizontalScroll);
    };
  }, []);

  return (
    <div className="ashen-root">
      <div className="ashen-content">
        <NavBar 
          home={t('nav-home')} 
          projects={t('nav-projects')}
          about={t('nav-about')}
          contact={t('nav-contact')} 
        />
        <Hero subtitle={t('header-subtitle')} />
        <Timeline title={t('timeline-title')} />
        <Projects title={t('projects-title')} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
