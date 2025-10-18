import { MousePosition } from '../types';

export const lerp = (a: number, b: number, t: number): number => {
  return (1 - t) * a + t * b;
};

export const fade = (t: number): number => {
  return t * t * t * (t * (t * 6 - 15) + 10);
};

export const normalizeMousePosition = (
  clientX: number,
  clientY: number,
  rect: DOMRect
): { x: number; y: number } => ({
  x: clientX - rect.left,
  y: clientY - rect.top,
});

export const updateMousePosition = (
  mouse: MousePosition,
  x: number,
  y: number
): void => {
  mouse.x = x;
  mouse.y = y;
  
  if (!mouse.set) {
    mouse.sx = x;
    mouse.sy = y;
    mouse.lx = x;
    mouse.ly = y;
    mouse.set = true;
  }
};

export const calculateMouseVelocity = (mouse: MousePosition): void => {
  const dx = mouse.x - mouse.lx;
  const dy = mouse.y - mouse.ly;
  const d = Math.sqrt(dx * dx + dy * dy);
  
  mouse.v = d;
  mouse.vs += (d - mouse.vs) * 0.15;
  mouse.vs = Math.min(100, mouse.vs);
  mouse.lx = mouse.x;
  mouse.ly = mouse.y;
  mouse.a = Math.atan2(dy, dx);
};

export const smoothMouseMovement = (mouse: MousePosition): void => {
  mouse.sx += (mouse.x - mouse.sx) * 0.15;
  mouse.sy += (mouse.y - mouse.sy) * 0.15;
};

export const createGradient = (
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  colorStops: Array<{ offset: number; color: string }>
): CanvasGradient => {
  const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
  colorStops.forEach(({ offset, color }) => {
    gradient.addColorStop(offset, color);
  });
  return gradient;
};

export const createRadialGradient = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r1: number,
  r2: number,
  colorStops: Array<{ offset: number; color: string }>
): CanvasGradient => {
  const gradient = ctx.createRadialGradient(x, y, r1, x, y, r2);
  colorStops.forEach(({ offset, color }) => {
    gradient.addColorStop(offset, color);
  });
  return gradient;
};
