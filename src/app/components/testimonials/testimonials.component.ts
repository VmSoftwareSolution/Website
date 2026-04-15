import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, ScrollAnimateDirective],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestimonialsComponent {
  testimonials = [
    {
      quote: 'VmSoftware transformo nuestra plataforma de pagos. Codigo limpio, rendimiento excepcional y una comunicacion impecable durante todo el proyecto.',
      name: 'Carlos Mendez',
      role: 'CTO',
      company: 'PayFlow',
      initials: 'CM'
    },
    {
      quote: 'Entendieron nuestro negocio desde el dia uno. Triplicamos ventas online con el producto final. Son nuestro partner tecnologico permanente.',
      name: 'Laura Torres',
      role: 'Dir. Operaciones',
      company: 'LuxMarket',
      initials: 'LT'
    },
    {
      quote: 'Arquitectura solida, sprints predecibles y un equipo que realmente se involucra. Migramos a cloud con cero downtime y costos reducidos 40%.',
      name: 'Andres Rivera',
      role: 'CEO',
      company: 'SyncBoard',
      initials: 'AR'
    }
  ];
}
