import { useCallback, useEffect, useRef } from 'react';

interface UseCanvasOptions {
  width?: number;
  height?: number;
}

export const useCanvas = (options: UseCanvasOptions = {}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const width = options.width;
  const height = options.height;

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = width ?? window.innerWidth;
    canvas.height = height ?? window.innerHeight;
  }, [width, height]);

  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = 0;
    }
  }, []);

  const startAnimation = useCallback((animate: (timestamp: number) => void) => {
    const animateLoop = (timestamp: number) => {
      if (document.hidden) {
        animationRef.current = 0;
        return;
      }
      animate(timestamp);
      animationRef.current = requestAnimationFrame(animateLoop);
    };

    const resume = () => {
      if (!document.hidden && !animationRef.current) {
        animationRef.current = requestAnimationFrame(animateLoop);
      }
    };

    document.addEventListener('visibilitychange', resume);
    animationRef.current = requestAnimationFrame(animateLoop);

    return () => document.removeEventListener('visibilitychange', resume);
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
