import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';
import { CountUpDirective } from '../../directives/count-up.directive';

interface TerminalLine {
  text: string;
  type: 'success' | 'highlight';
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ScrollAnimateDirective, CountUpDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent implements OnInit, OnDestroy {
  private cdr = inject(ChangeDetectorRef);
  private timeouts: ReturnType<typeof setTimeout>[] = [];

  terminalLines: TerminalLine[] = [];
  showMetrics = false;
  showCursor = true;

  stats = [
    { value: 8, suffix: '+', label: 'Anos experiencia' },
    { value: 120, suffix: '+', label: 'Proyectos entregados' },
    { value: 98, suffix: '%', label: 'Satisfaccion cliente' },
    { value: 24, suffix: 'h', label: 'Tiempo de respuesta' }
  ];

  ngOnInit(): void {
    const lines: { text: string; type: 'success' | 'highlight'; delay: number }[] = [
      { text: '\u2713 Build optimizado (324kb gzip)', type: 'success', delay: 1400 },
      { text: '\u2713 Tests pasados (148/148)', type: 'success', delay: 2200 },
      { text: '\u2713 Docker image creada', type: 'success', delay: 2900 },
      { text: '\u2713 Deploy a produccion', type: 'success', delay: 3500 },
      { text: '\u26A1 Deployed en 2.3s \u2192 app.client.com', type: 'highlight', delay: 4500 },
    ];

    lines.forEach(line => {
      const t = setTimeout(() => {
        this.terminalLines = [...this.terminalLines, { text: line.text, type: line.type }];
        this.cdr.markForCheck();
      }, line.delay);
      this.timeouts.push(t);
    });

    const t = setTimeout(() => {
      this.showMetrics = true;
      this.showCursor = false;
      this.cdr.markForCheck();
    }, 5500);
    this.timeouts.push(t);
  }

  ngOnDestroy(): void {
    this.timeouts.forEach(t => clearTimeout(t));
  }
}
