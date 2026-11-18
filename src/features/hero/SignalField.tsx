import { useEffect, useRef } from 'react';

type Node = { x: number; y: number; vx: number; vy: number };

/**
 * Client-only canvas. The original site used an interactive violet grid.
 * This keeps that field and adds a cursor-linked node network, without Three.js
 * and without a render loop on small screens.
 */
export function SignalField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas.getContext('2d');
    } catch {
      return;
    }
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const pointer = { x: -9999, y: -9999, active: false };
    let nodes: Node[] = [];
    let raf = 0;
    let running = false;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const mobile = mobileQuery.matches;
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = mobile ? 16 : 36;
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
      }));
    };

    const glow = document.createElement('canvas');
    glow.width = 18;
    glow.height = 18;
    const glowCtx = glow.getContext('2d');
    if (glowCtx) {
      const gradient = glowCtx.createRadialGradient(9, 9, 0, 9, 9, 9);
      gradient.addColorStop(0, '#c4b5fd');
      gradient.addColorStop(0.45, 'rgba(139, 92, 246, 0.55)');
      gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
      glowCtx.fillStyle = gradient;
      glowCtx.fillRect(0, 0, 18, 18);
    }

    const paint = (animate: boolean) => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      const mobile = mobileQuery.matches;
      ctx.clearRect(0, 0, w, h);

      if (animate) {
        for (const node of nodes) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0 || node.x > w) node.vx *= -1;
          if (node.y < 0 || node.y > h) node.vy *= -1;
          if (pointer.active) {
            const dx = pointer.x - node.x;
            const dy = pointer.y - node.y;
            if (dx * dx + dy * dy < 200 * 200) {
              node.x += dx * 0.012;
              node.y += dy * 0.012;
            }
          }
        }
      }

      const reach = mobile ? 88 : 128;
      const reach2 = reach * reach;
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < reach2) {
            const alpha = 1 - Math.sqrt(dist2) / reach;
            ctx.strokeStyle = `rgba(217, 70, 239, ${0.12 + alpha * 0.5})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
        if (glowCtx) ctx.drawImage(glow, node.x - 9, node.y - 9);
        else {
          ctx.fillStyle = '#c4b5fd';
          ctx.beginPath();
          ctx.arc(node.x, node.y, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    let lastFrame = 0;
    const loop = (time: number) => {
      raf = requestAnimationFrame(loop);
      if (time - lastFrame < 33) return;
      lastFrame = time;
      paint(true);
    };

    const start = () => {
      if (running || reduce || mobileQuery.matches) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    paint(false);
    start();

    const onMove = (event: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      pointer.x = x;
      pointer.y = y;
      pointer.active = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
    };
    window.addEventListener('pointermove', onMove);

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else {
        stop();
        paint(false);
      }
    });
    observer.observe(parent);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    const onResize = () => {
      resize();
      if (!running) paint(false);
    };
    window.addEventListener('resize', onResize);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
      canvas.width = 0;
      canvas.height = 0;
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
