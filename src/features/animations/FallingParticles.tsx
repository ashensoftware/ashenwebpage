import React from 'react';
import { useCanvas } from '../../core/hooks/useCanvas';
import { Particle } from '../../core/types';
import { ANIMATION_CONFIG, Z_INDEX } from '../../core/constants';
import './FallingParticles.css';

export const FallingParticles: React.FC = () => {
  const { canvasRef, startAnimation } = useCanvas();
  const particlesRef = React.useRef<Particle[]>([]);

  const createParticle = React.useCallback((): Particle => {
    const canvas = canvasRef.current;
    if (!canvas) return {} as Particle;

    const { MIN_SIZE, MAX_SIZE, MIN_SPEED, MAX_SPEED, COLORS } = ANIMATION_CONFIG.FALLING_PARTICLES;

    return {
      x: Math.random() * canvas.width,
      y: -20,
      size: Math.random() * (MAX_SIZE - MIN_SIZE) + MIN_SIZE,
      speed: Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.05,
      opacity: Math.random() * 0.5 + 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    };
  }, [canvasRef]);

  const initializeParticles = React.useCallback(() => {
    const { COUNT } = ANIMATION_CONFIG.FALLING_PARTICLES;
    particlesRef.current = [];
    
    for (let i = 0; i < COUNT; i++) {
      particlesRef.current.push(createParticle());
    }
  }, [createParticle]);

  const updateParticles = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    particlesRef.current.forEach((particle, index) => {
      particle.y += particle.speed;
      particle.rotation += particle.rotationSpeed;
      
      const fadeStart = canvas.height * 0.2;
      const fadeEnd = canvas.height * 0.8;
      
      if (particle.y < fadeStart) {
        particle.opacity = Math.min(1, particle.y / fadeStart);
      } else if (particle.y > fadeEnd) {
        particle.opacity = Math.max(0, 1 - (particle.y - fadeEnd) / (canvas.height * 0.2));
      }

      if (particle.y > canvas.height + 20) {
        particlesRef.current[index] = createParticle();
      }
    });
  }, [canvasRef, createParticle]);

  const drawParticles = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach(particle => {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      
      const alpha = particle.opacity;
      ctx.fillStyle = particle.color.replace(/[\d.]+\)$/g, `${alpha})`);
      ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
      
      ctx.strokeStyle = particle.color.replace(/[\d.]+\)$/g, `${Math.min(1, alpha + 0.2)})`);
      ctx.lineWidth = 0.5;
      ctx.strokeRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
      
      ctx.restore();
    });
  }, [canvasRef]);

  const animate = React.useCallback(() => {
    updateParticles();
    drawParticles();
  }, [updateParticles, drawParticles]);

  React.useEffect(() => {
    initializeParticles();
    startAnimation(animate);
  }, [initializeParticles, startAnimation, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="falling-particles"
      style={{ zIndex: Z_INDEX.PARTICLES }}
    />
  );
};
