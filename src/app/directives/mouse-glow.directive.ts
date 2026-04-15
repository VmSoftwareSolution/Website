import { Directive, ElementRef, HostListener, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[appMouseGlow]',
  standalone: true
})
export class MouseGlowDirective implements OnInit {
  private readonly el = inject(ElementRef);

  ngOnInit(): void {
    this.el.nativeElement.classList.add('has-mouse-glow');
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.el.nativeElement.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
    this.el.nativeElement.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
  }
}
