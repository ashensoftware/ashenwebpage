import React from 'react';
import InteractiveGridBackground from '../animations/InteractiveGridBackground';
import { FallingParticles } from '../animations/FallingParticles';
import './Hero.css';

export const Hero: React.FC = () => {
  return (
    <section className="hero-section" id="hero">
      <InteractiveGridBackground
        gridSize={40}
        gridColor="rgba(157, 61, 255, 0.3)"
        darkGridColor="rgba(157, 61, 255, 0.2)"
        effectColor="rgba(157, 61, 255, 0.8)"
        darkEffectColor="rgba(157, 61, 255, 0.9)"
        trailLength={4}
        idleSpeed={0.15}
        glow={true}
        glowRadius={25}
        fadeIntensity={15}
        idleRandomCount={8}
        showFade={false}
        className="hero-grid-background"
      />
      <FallingParticles />
      <div className="hero-content">
        <img 
          src="/assets/logo/Logo-Iso-Slogan.png" 
          alt="ASHEN Logo con slogan" 
          className="hero-main-logo" 
        />
        <a href="https://wa.me/573105602568" className="hero-demo-button" target="_blank" rel="noopener noreferrer">
          Agenda una demo
        </a>
      </div>
    </section>
  );
};
