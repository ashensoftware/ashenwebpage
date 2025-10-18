import React, { useRef, useEffect } from 'react';
import './FlowingWaves.css';

interface FlowingWavesProps {
  waveCount?: number;
  speed?: number;
  amplitude?: number;
  frequency?: number;
  colors?: string[];
  className?: string;
}

const FlowingWaves: React.FC<FlowingWavesProps> = ({
  waveCount = 8,
  speed = 0.5,
  amplitude = 50,
  frequency = 0.02,
  colors = [
    'rgba(157, 61, 255, 0.3)',
    'rgba(93, 97, 208, 0.25)',
    'rgba(188, 122, 255, 0.2)',
    'rgba(255, 105, 180, 0.15)',
    'rgba(255, 255, 255, 0.1)'
  ],
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawWaves = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;

      for (let i = 0; i < waveCount; i++) {
        const waveHeight = height / waveCount;
        const yOffset = i * waveHeight + waveHeight / 2;
        const waveSpeed = speed * (0.5 + Math.random() * 0.5);
        const waveAmplitude = amplitude * (0.3 + Math.random() * 0.7);
        const waveFrequency = frequency * (0.5 + Math.random() * 0.5);
        
        ctx.beginPath();
        ctx.strokeStyle = colors[i % colors.length];
        ctx.lineWidth = 2 + Math.random() * 3;
        ctx.globalAlpha = 0.6 + Math.random() * 0.4;

        for (let x = 0; x < width; x += 2) {
          const y = yOffset + 
            Math.sin(x * waveFrequency + timeRef.current * waveSpeed) * waveAmplitude +
            Math.sin(x * waveFrequency * 2 + timeRef.current * waveSpeed * 1.5) * (waveAmplitude * 0.3) +
            Math.sin(x * waveFrequency * 0.5 + timeRef.current * waveSpeed * 0.8) * (waveAmplitude * 0.2);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      }

      // Añadir partículas flotantes
      for (let i = 0; i < 30; i++) {
        const particleX = (timeRef.current * 10 + i * 100) % width;
        const particleY = height * 0.2 + Math.sin(timeRef.current * 0.5 + i) * 50 + Math.random() * height * 0.6;
        const particleSize = 1 + Math.random() * 2;
        const particleOpacity = 0.3 + Math.sin(timeRef.current + i) * 0.2;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${particleOpacity})`;
        ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // Añadir burbujas de luz
      for (let i = 0; i < 15; i++) {
        const bubbleX = (timeRef.current * 5 + i * 200) % width;
        const bubbleY = height * 0.3 + Math.sin(timeRef.current * 0.3 + i * 2) * 80 + Math.random() * height * 0.4;
        const bubbleSize = 20 + Math.sin(timeRef.current + i) * 10;
        const bubbleOpacity = 0.1 + Math.sin(timeRef.current * 2 + i) * 0.05;

        const gradient = ctx.createRadialGradient(
          bubbleX, bubbleY, 0,
          bubbleX, bubbleY, bubbleSize
        );
        gradient.addColorStop(0, `rgba(157, 61, 255, ${bubbleOpacity})`);
        gradient.addColorStop(0.7, `rgba(93, 97, 208, ${bubbleOpacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(157, 61, 255, 0)');

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(bubbleX, bubbleY, bubbleSize, 0, Math.PI * 2);
        ctx.fill();
      }

      timeRef.current += 0.016; // ~60fps
      animationRef.current = requestAnimationFrame(drawWaves);
    };

    drawWaves();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [waveCount, speed, amplitude, frequency, colors]);

  return (
    <canvas
      ref={canvasRef}
      className={`flowing-waves ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};

export default FlowingWaves;
