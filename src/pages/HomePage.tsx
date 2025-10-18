import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavBar } from '../features/navigation/NavBar';
import { Hero } from '../features/hero/Hero';
import ThreeDCarousel from '../features/services/ThreeDCarousel';
import { Footer } from '../features/footer/Footer';
import { ClickSpark } from '../features/animations/ClickSpark';
import { useScrollToSection } from '../core/hooks';
import '../styles/globals/reset.css';
import '../styles/globals/base.css';
import '../i18n';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  useScrollToSection();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
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
      <ClickSpark />
      <div className="ashen-content">
        <NavBar 
          home={t('nav-home')} 
          services={t('nav-services')}
          about={t('nav-about')}
          contact={t('nav-contact')} 
        />
        <Hero />
        <ThreeDCarousel />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
