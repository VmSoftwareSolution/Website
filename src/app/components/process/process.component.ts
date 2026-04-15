import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [CommonModule, ScrollAnimateDirective],
  templateUrl: './process.component.html',
  styleUrl: './process.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProcessComponent {
  steps = [
    {
      number: '01',
      title: 'Descubrimiento',
      description: 'Entendemos tu negocio, objetivos y usuarios para definir el alcance exacto del proyecto.',
      details: ['Analisis de requerimientos', 'Research de usuarios', 'Definicion de alcance', 'Estimacion inicial']
    },
    {
      number: '02',
      title: 'Estrategia',
      description: 'Definimos arquitectura, stack tecnologico y roadmap con sprints planificados.',
      details: ['Arquitectura tecnica', 'Seleccion de stack', 'Roadmap del proyecto', 'Planificacion de sprints']
    },
    {
      number: '03',
      title: 'Desarrollo',
      description: 'Sprints agiles con entregas incrementales, code review y testing automatizado.',
      details: ['Sprints de 2 semanas', 'Code review continuo', 'Testing automatizado', 'Demos frecuentes']
    },
    {
      number: '04',
      title: 'Lanzamiento',
      description: 'Deploy a produccion con CI/CD, monitoreo 24/7 y soporte continuo post-launch.',
      details: ['CI/CD pipeline', 'Monitoreo 24/7', 'Soporte post-launch', 'Iteracion continua']
    }
  ];
}
