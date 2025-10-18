import React from 'react';
import { Spark } from '../../core/types';
import { ANIMATION_CONFIG, Z_INDEX } from '../../core/constants';
import './ClickSpark.css';

export const ClickSpark: React.FC = () => {
  const sparksRef = React.useRef<Spark[]>([]);
  const sparkIdRef = React.useRef(0);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const createSpark = React.useCallback((x: number, y: number): Spark => {
    const { PARTICLE_COUNT, COLORS, MIN_SIZE, MAX_SIZE, MIN_SPEED, MAX_SPEED, GRAVITY } = ANIMATION_CONFIG.CLICK_SPARK;
    
    const angle = (Math.PI * 2 * Math.random()) + Math.random() * 0.3;
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
      gravity: GRAVITY + Math.random() * 0.03
    };
  }, []);

  const handleClick = React.useCallback((e: MouseEvent) => {
    const rect = document.body.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const { PARTICLE_COUNT } = ANIMATION_CONFIG.CLICK_SPARK;
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const spark = createSpark(x, y);
      sparksRef.current.push(spark);
    }

    if (sparksRef.current.length > 150) {
      sparksRef.current = sparksRef.current.slice(-75);
    }
  }, [createSpark]);

  const updateSparks = React.useCallback(() => {
    sparksRef.current = sparksRef.current.filter(spark => {
      spark.x += spark.vx;
      spark.y += spark.vy;
      spark.vy += spark.gravity;
      spark.vx *= ANIMATION_CONFIG.CLICK_SPARK.FRICTION;
      spark.life -= 0.02;

      return spark.life > 0;
    });
  }, []);

  const drawSparks = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sparksRef.current.forEach(spark => {
      const alpha = spark.life;
      const size = spark.size * alpha;

      ctx.save();
      ctx.globalAlpha = alpha * 0.8;
      ctx.fillStyle = spark.color;
      ctx.beginPath();
      ctx.arc(spark.x, spark.y, size, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowColor = spark.color;
      ctx.shadowBlur = 8 * alpha;
      ctx.fill();
      ctx.restore();
    });
  }, []);

  const animate = React.useCallback((timestamp: number) => {
    updateSparks();
    drawSparks();
    requestAnimationFrame(animate);
  }, [updateSparks, drawSparks]);

  const setupCanvas = React.useCallback(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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
    window.addEventListener('resize', setCanvasSize);

    animate(0);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      document.body.removeChild(canvas);
    };
  }, [animate]);

  React.useEffect(() => {
    document.addEventListener('click', handleClick);
    const cleanup = setupCanvas();

    return () => {
      document.removeEventListener('click', handleClick);
      cleanup?.();
    };
  }, [handleClick, setupCanvas]);

  return null;
};
