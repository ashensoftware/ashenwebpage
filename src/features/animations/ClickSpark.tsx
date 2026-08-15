import React from 'react';
import { Spark } from '../../core/types';
import { ANIMATION_CONFIG, Z_INDEX } from '../../core/constants';
import './ClickSpark.css';

export const ClickSpark: React.FC = () => {
  const sparksRef = React.useRef<Spark[]>([]);
  const sparkIdRef = React.useRef(0);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const frameRef = React.useRef(0);

  const createSpark = React.useCallback((x: number, y: number): Spark => {
    const { COLORS, MIN_SIZE, MAX_SIZE, MIN_SPEED, MAX_SPEED, GRAVITY } = ANIMATION_CONFIG.CLICK_SPARK;
    const angle = Math.PI * 2 * Math.random();
    const speed = Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED;

    return {
      id: sparkIdRef.current++,
      x: x + (Math.random() - 0.5) * 5,
      y: y + (Math.random() - 0.5) * 5,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      maxLife: 1,
      size: Math.random() * (MAX_SIZE - MIN_SIZE) + MIN_SIZE,
      color: COLORS[0],
      gravity: GRAVITY + Math.random() * 0.03,
    };
  }, []);

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = Z_INDEX.SPARK.toString();
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    const handleClick = (event: MouseEvent) => {
      const { PARTICLE_COUNT } = ANIMATION_CONFIG.CLICK_SPARK;
      for (let i = 0; i < PARTICLE_COUNT; i += 1) {
        sparksRef.current.push(createSpark(event.clientX, event.clientY));
      }
      if (sparksRef.current.length > 150) {
        sparksRef.current = sparksRef.current.slice(-75);
      }
      if (!frameRef.current) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    const animate = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vy += spark.gravity;
        spark.vx *= ANIMATION_CONFIG.CLICK_SPARK.FRICTION;
        spark.life -= 0.02;
        if (spark.life <= 0) return false;

        ctx.save();
        ctx.globalAlpha = spark.life * 0.8;
        ctx.fillStyle = spark.color;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size * spark.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return true;
      });

      if (sparksRef.current.length > 0 && document.visibilityState === 'visible') {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        frameRef.current = 0;
      }
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('resize', setCanvasSize);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(frameRef.current);
      canvas.remove();
    };
  }, [createSpark]);

  return null;
};
