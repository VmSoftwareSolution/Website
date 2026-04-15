import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';
import { MouseGlowDirective } from '../../directives/mouse-glow.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ScrollAnimateDirective, MouseGlowDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {
  projects = [
    {
      category: 'Fintech',
      title: 'PayFlow',
      subtitle: 'Plataforma de pagos B2B',
      description: 'Dashboard analitico en tiempo real con arquitectura de microservicios. Procesamiento de +10M transacciones mensuales con 99.9% uptime.',
      tags: ['Java', 'React', 'AWS', 'Kafka'],
      accentText: 'PF',
      gradient: 'linear-gradient(135deg, #FF6B00 0%, #FF9500 100%)'
    },
    {
      category: 'SaaS',
      title: 'SyncBoard',
      subtitle: 'Colaboracion en tiempo real',
      description: 'Tableros, sprints y metricas para equipos distribuidos. WebSockets para sincronizacion instantanea entre +500 usuarios concurrentes.',
      tags: ['TypeScript', 'Node.js', 'MongoDB', 'Socket.io'],
      accentText: 'SB',
      gradient: 'linear-gradient(135deg, #333333 0%, #666666 100%)'
    },
    {
      category: 'E-Commerce',
      title: 'LuxMarket',
      subtitle: 'Marketplace premium',
      description: 'Recomendaciones IA y pagos multi-divisa. 3x crecimiento en ventas en los primeros 6 meses post-lanzamiento.',
      tags: ['Next.js', 'Python', 'PostgreSQL', 'Stripe'],
      accentText: 'LM',
      gradient: 'linear-gradient(135deg, #FF9500 0%, #FFAD33 100%)'
    }
  ];
}
