'use client';

import { useEffect, useRef } from 'react';

interface Dot {
  x: number;
  y: number;
  v: number;
  ph: number;
  r: number;
  gold: boolean;
}

/**
 * The drifting dots behind the home page hero. Purely decorative.
 * Draws only while it is on screen, reacts to the mouse, and is skipped for visitors who prefer reduced motion.
 */
export function FlowCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0;
    let H = 0;
    const mouse = { x: -9999, y: -9999 };
    const count = window.innerWidth < 700 ? 30 : 60;
    const dots: Dot[] = Array.from({ length: count }, () => ({
      x: Math.random() * 2000,
      y: Math.random() * 1200,
      v: 0.22 + Math.random() * 0.45,
      ph: Math.random() * Math.PI * 2,
      r: 1 + Math.random() * 1.6,
      gold: Math.random() < 0.2,
    }));

    const size = () => {
      const r = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    window.addEventListener('resize', size);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    host.addEventListener('mousemove', onMove);
    host.addEventListener('mouseleave', onLeave);

    let t = 0;
    let raf = 0;
    let running = false;

    const draw = () => {
      if (!running) return;
      raf = requestAnimationFrame(draw);
      t += 0.012;
      ctx.clearRect(0, 0, W, H);
      for (const d of dots) {
        d.x += d.v;
        const y = (d.y + Math.sin(t + d.ph) * 14) % (H + 40);
        if (d.x > W + 20) d.x = -20;
        const dx = d.x - mouse.x;
        const dy = y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let ox = 0;
        let oy = 0;
        if (dist < 150 && dist > 0.001) {
          const f = ((150 - dist) / 150) * 15;
          ox = (dx / dist) * f;
          oy = (dy / dist) * f;
        }
        ctx.beginPath();
        ctx.arc(d.x + ox, y + oy, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.gold ? 'rgba(168,123,46,.4)' : 'rgba(12,158,133,.35)';
        ctx.fill();
      }
    };
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    let io: IntersectionObserver | undefined;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => (entries[0].isIntersecting ? start() : stop()), { threshold: 0 });
      io.observe(canvas);
    } else {
      start();
    }

    return () => {
      stop();
      io?.disconnect();
      window.removeEventListener('resize', size);
      host.removeEventListener('mousemove', onMove);
      host.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <canvas id="flow" ref={ref} aria-hidden="true" />;
}
