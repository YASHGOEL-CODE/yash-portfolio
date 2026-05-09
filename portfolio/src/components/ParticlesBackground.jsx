import { useEffect, useRef } from "react";

export default function ParticlesBackground() {
  const canvasRef = useRef(null);
  const stateRef = useRef({ particles: [], mouse: { x: -9999, y: -9999 }, raf: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const state = stateRef.current;

    const COLORS = ["#00f5ff", "#a855f7", "#3b82f6", "#06b6d4", "#7c3aed"];
    const CONNECTION_DIST = 130;
    const MOUSE_REPEL = 110;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMouseMove = (e) => { state.mouse.x = e.clientX; state.mouse.y = e.clientY; };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    class Particle {
      constructor() { this.reset(true); }
      reset(init = false) {
        this.x = Math.random() * canvas.width;
        this.y = init ? Math.random() * canvas.height : (Math.random() > 0.5 ? -10 : canvas.height + 10);
        this.baseVx = (Math.random() - 0.5) * 0.42;
        this.baseVy = (Math.random() - 0.5) * 0.42;
        this.vx = this.baseVx;
        this.vy = this.baseVy;
        this.r = Math.random() * 1.6 + 0.5;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.alpha = Math.random() * 0.55 + 0.2;
        this.phase = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.007 + Math.random() * 0.013;
        this.currentAlpha = this.alpha;
      }
      update(t) {
        const dx = this.x - state.mouse.x;
        const dy = this.y - state.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_REPEL && dist > 0) {
          const f = (MOUSE_REPEL - dist) / MOUSE_REPEL;
          this.vx = this.baseVx + (dx / dist) * f * 2.0;
          this.vy = this.baseVy + (dy / dist) * f * 2.0;
        } else {
          this.vx += (this.baseVx - this.vx) * 0.04;
          this.vy += (this.baseVy - this.vy) * 0.04;
        }
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < -12) this.x = canvas.width + 12;
        else if (this.x > canvas.width + 12) this.x = -12;
        if (this.y < -12) this.y = canvas.height + 12;
        else if (this.y > canvas.height + 12) this.y = -12;
        this.currentAlpha = this.alpha * (0.6 + 0.4 * Math.sin(t * this.pulseSpeed + this.phase));
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.currentAlpha;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 9;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    const COUNT = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 11000));
    state.particles = Array.from({ length: COUNT }, () => new Particle());

    let t = 0;
    const animate = () => {
      t++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ps = state.particles;
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECTION_DIST) {
            ctx.save();
            ctx.globalAlpha = (1 - d / CONNECTION_DIST) * 0.18;
            const g = ctx.createLinearGradient(ps[i].x, ps[i].y, ps[j].x, ps[j].y);
            g.addColorStop(0, ps[i].color);
            g.addColorStop(1, ps[j].color);
            ctx.strokeStyle = g;
            ctx.lineWidth = 0.55;
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
      ps.forEach((p) => { p.update(t); p.draw(); });
      state.raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(state.raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", inset: 0,
      width: "100%", height: "100%",
      zIndex: 0, pointerEvents: "none",
    }} />
  );
}