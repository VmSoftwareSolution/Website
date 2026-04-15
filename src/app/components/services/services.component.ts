import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';
import { MouseGlowDirective } from '../../directives/mouse-glow.directive';
import { TiltDirective } from '../../directives/tilt.directive';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ScrollAnimateDirective, MouseGlowDirective, TiltDirective],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesComponent {
  services = [
    {
      icon: 'web',
      title: 'Desarrollo Web',
      description: 'SPAs, PWAs y plataformas enterprise con React, Angular, Next.js y TypeScript.',
      tags: ['React', 'Angular', 'Next.js', 'TypeScript']
    },
    {
      icon: 'cloud',
      title: 'Cloud & DevOps',
      description: 'Infraestructura cloud, CI/CD, arquitecturas serverless. Alta disponibilidad garantizada.',
      tags: ['AWS', 'Docker', 'Kubernetes']
    },
    {
      icon: 'mobile',
      title: 'Apps Moviles',
      description: 'Aplicaciones nativas y multiplataforma con UX fluida en iOS y Android.',
      tags: ['Flutter', 'React Native', 'Swift']
    },
    {
      icon: 'api',
      title: 'APIs & Backend',
      description: 'Microservicios, REST, GraphQL. Disenados para escalar sin limites.',
      tags: ['Node.js', 'Java', '.NET', 'GraphQL']
    },
    {
      icon: 'design',
      title: 'Diseno UX/UI',
      description: 'Interfaces que convierten. Research, prototipado y design systems completos.',
      tags: ['Figma', 'Design Systems', 'Prototyping']
    },
    {
      icon: 'data',
      title: 'Data & Analytics',
      description: 'Dashboards, BI personalizado y pipelines de datos para mejores decisiones.',
      tags: ['Python', 'PostgreSQL', 'Power BI']
    }
  ];
}
