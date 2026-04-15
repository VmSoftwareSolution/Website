import { Component } from '@angular/core';
import { ParticlesBgComponent } from './components/particles-bg/particles-bg.component';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { TechStackComponent } from './components/tech-stack/tech-stack.component';
import { ServicesComponent } from './components/services/services.component';
import { ProcessComponent } from './components/process/process.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { StatsComponent } from './components/stats/stats.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ParticlesBgComponent, HeaderComponent, HeroComponent, TechStackComponent,
    ServicesComponent, ProcessComponent, ProjectsComponent,
    TestimonialsComponent, StatsComponent, ContactComponent, FooterComponent
  ],
  template: `
    <app-particles-bg />
    <app-header />
    <main>
      <app-hero />
      <div class="section-divider"></div>
      <app-tech-stack />
      <app-services />
      <div class="section-divider"></div>
      <app-process />
      <app-projects />
      <div class="section-divider"></div>
      <app-testimonials />
      <app-stats />
      <div class="section-divider"></div>
      <app-contact />
    </main>
    <app-footer />
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      position: relative;
      z-index: 1;
    }

    .section-divider {
      height: 1px;
      background: linear-gradient(90deg,
        transparent 0%,
        rgba(255, 107, 0, 0.06) 20%,
        rgba(255, 107, 0, 0.15) 50%,
        rgba(255, 107, 0, 0.06) 80%,
        transparent 100%
      );
      position: relative;

      &::after {
        content: '';
        position: absolute;
        top: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 107, 0, 0.15) 0%, transparent 70%);
      }
    }
  `]
})
export class AppComponent {}
