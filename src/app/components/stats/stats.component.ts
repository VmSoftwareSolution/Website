import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';
import { CountUpDirective } from '../../directives/count-up.directive';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, ScrollAnimateDirective, CountUpDirective],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsComponent {
  stats = [
    { value: 98, suffix: '%', label: 'Proyectos a tiempo', description: 'Entregas predecibles con metodologia agil' },
    { value: 3, suffix: 'x', label: 'Mas rapido', description: 'Velocidad de desarrollo vs equipos tradicionales' },
    { value: 99, suffix: '.9%', label: 'Uptime', description: 'Disponibilidad garantizada en produccion' },
    { value: 85, suffix: '%', label: 'Clientes recurrentes', description: 'Relaciones a largo plazo basadas en resultados' }
  ];
}
