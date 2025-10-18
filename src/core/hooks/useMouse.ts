import { useRef, useEffect } from 'react';
import { MousePosition } from '../types';
import { updateMousePosition, calculateMouseVelocity, smoothMouseMovement } from '../utils';

interface UseMouseOptions {
  onMouseMove?: (mouse: MousePosition) => void;
  throttling?: number;
}

export const useMouse = (options: UseMouseOptions = {}) => {
  const mouseRef = useRef<MousePosition>({
    x: -10,
    y: 0,
    lx: 0,
    ly: 0,
    sx: 0,
    sy: 0,
    v: 0,
    vs: 0,
    a: 0,
    set: false,
  });

  const lastUpdateRef = useRef(0);
  const { onMouseMove, throttling = 32 } = options;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastUpdateRef.current < throttling) return;

      const rect = document.body.getBoundingClientRect();
      const { x, y } = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      updateMousePosition(mouseRef.current, x, y);
      calculateMouseVelocity(mouseRef.current);
      smoothMouseMovement(mouseRef.current);

      onMouseMove?.(mouseRef.current);
      lastUpdateRef.current = now;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;

      const rect = document.body.getBoundingClientRect();
      const { x, y } = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };

      updateMousePosition(mouseRef.current, x, y);
      calculateMouseVelocity(mouseRef.current);
      smoothMouseMovement(mouseRef.current);

      onMouseMove?.(mouseRef.current);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [onMouseMove, throttling]);

  return mouseRef;
};
