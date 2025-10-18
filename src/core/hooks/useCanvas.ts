import { useRef, useEffect, useCallback } from 'react';

interface UseCanvasOptions {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

export const useCanvas = (options: UseCanvasOptions = {}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width = window.innerWidth, height = window.innerHeight } = options;
    canvas.width = width;
    canvas.height = height;
  }, [options.width, options.height]);

  const startAnimation = useCallback((animate: (timestamp: number) => void) => {
    const animateLoop = (timestamp: number) => {
      animate(timestamp);
      animationRef.current = requestAnimationFrame(animateLoop);
    };
    animationRef.current = requestAnimationFrame(animateLoop);
  }, []);

  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  useEffect(() => {
    resizeCanvas();
    
    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      stopAnimation();
    };
  }, [resizeCanvas, stopAnimation]);

  return {
    canvasRef,
    startAnimation,
    stopAnimation,
    resizeCanvas,
  };
};
