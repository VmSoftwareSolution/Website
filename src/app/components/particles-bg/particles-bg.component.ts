import {
  Component, ChangeDetectionStrategy, AfterViewInit, OnDestroy,
  ViewChild, ElementRef, PLATFORM_ID, inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseOpacity: number;
}

@Component({
  selector: 'app-particles-bg',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <canvas #particleCanvas class="particle-canvas"></canvas>
    <div class="aurora-layer">
      <div class="aurora a1"></div>
      <div class="aurora a2"></div>
      <div class="aurora a3"></div>
      <div class="aurora a4"></div>
      <div class="aurora a5"></div>
    </div>
    <div class="vignette"></div>
    <div class="scan-line"></div>
    <div class="noise-layer"></div>
  `,
  styles: [`
    :host {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }

    /* ========== Canvas ========== */
    .particle-canvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }

    /* ========== Aurora ========== */
    .aurora-layer {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }

    .aurora {
      position: absolute;
      border-radius: 50%;
      filter: blur(160px);
      will-change: transform;
      mix-blend-mode: screen;
    }

    .a1 {
      width: 1000px;
      height: 1000px;
      top: -25%;
      right: -12%;
      background: radial-gradient(circle, rgba(255, 107, 0, 0.07) 0%, rgba(255, 60, 0, 0.02) 40%, transparent 70%);
      animation: aurora-drift-1 28s ease-in-out infinite;
    }

    .a2 {
      width: 800px;
      height: 800px;
      bottom: -15%;
      left: -18%;
      background: radial-gradient(circle, rgba(255, 149, 0, 0.05) 0%, rgba(255, 100, 0, 0.015) 40%, transparent 70%);
      animation: aurora-drift-2 35s ease-in-out infinite;
    }

    .a3 {
      width: 650px;
      height: 650px;
      top: 35%;
      left: 15%;
      background: radial-gradient(circle, rgba(255, 120, 0, 0.04) 0%, transparent 65%);
      animation: aurora-drift-3 22s ease-in-out infinite;
    }

    .a4 {
      width: 550px;
      height: 550px;
      top: 55%;
      right: 15%;
      background: radial-gradient(circle, rgba(255, 80, 0, 0.035) 0%, transparent 65%);
      animation: aurora-drift-4 30s ease-in-out infinite;
    }

    .a5 {
      width: 900px;
      height: 450px;
      top: 8%;
      left: 30%;
      background: radial-gradient(ellipse, rgba(255, 140, 0, 0.03) 0%, transparent 65%);
      animation: aurora-drift-5 25s ease-in-out infinite;
      border-radius: 40% 60% 50% 50%;
    }

    @keyframes aurora-drift-1 {
      0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
      15% { transform: translate(-80px, 60px) scale(1.2) rotate(4deg); }
      35% { transform: translate(50px, -50px) scale(0.9) rotate(-3deg); }
      55% { transform: translate(-40px, -70px) scale(1.15) rotate(7deg); }
      75% { transform: translate(70px, 40px) scale(0.95) rotate(-5deg); }
    }

    @keyframes aurora-drift-2 {
      0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
      20% { transform: translate(90px, -40px) scale(1.25) rotate(-6deg); }
      45% { transform: translate(-50px, 70px) scale(0.85) rotate(4deg); }
      70% { transform: translate(40px, -30px) scale(1.1) rotate(-3deg); }
    }

    @keyframes aurora-drift-3 {
      0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
      25% { transform: translate(50px, 40px) scale(1.15) rotate(5deg); }
      50% { transform: translate(-60px, -30px) scale(0.9) rotate(-4deg); }
      75% { transform: translate(30px, -50px) scale(1.1) rotate(3deg); }
    }

    @keyframes aurora-drift-4 {
      0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
      30% { transform: translate(-70px, 50px) scale(1.2) rotate(-5deg); }
      60% { transform: translate(60px, -60px) scale(0.88) rotate(6deg); }
    }

    @keyframes aurora-drift-5 {
      0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
      20% { transform: translate(40px, 30px) scale(1.1) rotate(3deg); }
      40% { transform: translate(-30px, -40px) scale(0.95) rotate(-6deg); }
      60% { transform: translate(60px, -20px) scale(1.15) rotate(4deg); }
      80% { transform: translate(-50px, 50px) scale(0.9) rotate(-3deg); }
    }

    /* ========== Vignette ========== */
    .vignette {
      position: absolute;
      inset: 0;
      background: radial-gradient(
        ellipse 80% 80% at 50% 50%,
        transparent 30%,
        rgba(3, 3, 3, 0.5) 100%
      );
    }

    /* ========== Scan line ========== */
    .scan-line {
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(255, 255, 255, 0.003) 2px,
        rgba(255, 255, 255, 0.003) 4px
      );
    }

    /* ========== Noise ========== */
    .noise-layer {
      position: absolute;
      inset: 0;
      opacity: 0.018;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-repeat: repeat;
      background-size: 256px 256px;
      mix-blend-mode: overlay;
      animation: noise-shift 8s steps(10) infinite;
    }

    @keyframes noise-shift {
      0% { transform: translate(0, 0); }
      10% { transform: translate(-5%, -5%); }
      20% { transform: translate(3%, 5%); }
      30% { transform: translate(-3%, 2%); }
      40% { transform: translate(5%, -3%); }
      50% { transform: translate(-2%, 5%); }
      60% { transform: translate(4%, -2%); }
      70% { transform: translate(-5%, 3%); }
      80% { transform: translate(2%, -5%); }
      90% { transform: translate(-3%, -2%); }
      100% { transform: translate(0, 0); }
    }

    @media (max-width: 768px) {
      .aurora { filter: blur(120px); }
      .a3, .a4, .a5 { display: none; }
      .scan-line { display: none; }
    }
  `]
})
export class ParticlesBgComponent implements AfterViewInit, OnDestroy {
  @ViewChild('particleCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animFrameId = 0;
  private mouseX = -9999;
  private mouseY = -9999;
  private w = 0;
  private h = 0;

  private readonly isMobile = isPlatformBrowser(this.platformId) && window.innerWidth < 768;
  private readonly COUNT = this.isMobile ? 30 : 80;
  private readonly MAX_DIST = this.isMobile ? 100 : 150;
  private readonly MOUSE_RADIUS = 250;

  private resizeFn = () => this.onResize();
  private mouseFn = (e: MouseEvent) => { this.mouseX = e.clientX; this.mouseY = e.clientY; };
  private mouseOutFn = () => { this.mouseX = -9999; this.mouseY = -9999; };

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    this.onResize();
    this.spawnParticles();
    this.loop();

    window.addEventListener('resize', this.resizeFn);
    window.addEventListener('mousemove', this.mouseFn);
    document.addEventListener('mouseleave', this.mouseOutFn);
  }

  private onResize(): void {
    const canvas = this.canvasRef.nativeElement;
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    canvas.width = this.w;
    canvas.height = this.h;
  }

  private spawnParticles(): void {
    this.particles = [];
    for (let i = 0; i < this.COUNT; i++) {
      this.particles.push({
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.8 + 0.4,
        baseOpacity: Math.random() * 0.4 + 0.1,
      });
    }
  }

  private loop = (): void => {
    const { ctx, w, h, particles, mouseX, mouseY, MAX_DIST, MOUSE_RADIUS } = this;

    ctx.clearRect(0, 0, w, h);

    // Update particles
    for (const p of particles) {
      // Mouse interaction — gentle repulsion
      const dx = p.x - mouseX;
      const dy = p.y - mouseY;
      const mDist = Math.sqrt(dx * dx + dy * dy);
      if (mDist < MOUSE_RADIUS && mDist > 0) {
        const force = (MOUSE_RADIUS - mDist) / MOUSE_RADIUS * 0.015;
        p.vx += (dx / mDist) * force;
        p.vy += (dy / mDist) * force;
      }

      p.x += p.vx;
      p.y += p.vy;

      // Soft damping
      p.vx *= 0.998;
      p.vy *= 0.998;

      // Wrap
      if (p.x < -20) p.x = w + 20;
      if (p.x > w + 20) p.x = -20;
      if (p.y < -20) p.y = h + 20;
      if (p.y > h + 20) p.y = -20;
    }

    // Draw connections
    ctx.lineWidth = 0.5;
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const cdx = a.x - b.x;
        const cdy = a.y - b.y;
        const dist = cdx * cdx + cdy * cdy; // squared for perf
        const maxSq = MAX_DIST * MAX_DIST;

        if (dist < maxSq) {
          const ratio = 1 - Math.sqrt(dist) / MAX_DIST;
          const alpha = ratio * 0.12;

          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,107,0,${alpha})`;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Draw particles with glow
    for (const p of particles) {
      // Outer glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,107,0,${p.baseOpacity * 0.08})`;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,140,40,${p.baseOpacity})`;
      ctx.fill();
    }

    // Mouse glow halo
    if (mouseX > 0 && mouseY > 0) {
      const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, MOUSE_RADIUS);
      grad.addColorStop(0, 'rgba(255,107,0,0.04)');
      grad.addColorStop(0.5, 'rgba(255,107,0,0.015)');
      grad.addColorStop(1, 'rgba(255,107,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(mouseX - MOUSE_RADIUS, mouseY - MOUSE_RADIUS, MOUSE_RADIUS * 2, MOUSE_RADIUS * 2);

      // Mouse ring
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,107,0,0.08)';
      ctx.fill();
    }

    this.animFrameId = requestAnimationFrame(this.loop);
  };

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animFrameId);
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.resizeFn);
      window.removeEventListener('mousemove', this.mouseFn);
      document.removeEventListener('mouseleave', this.mouseOutFn);
    }
  }
}
