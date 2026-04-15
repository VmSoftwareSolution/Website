import { Directive, ElementRef, Input, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appCountUp]',
  standalone: true
})
export class CountUpDirective implements OnInit, OnDestroy {
  @Input('appCountUp') target = 0;
  @Input() countSuffix = '';
  @Input() countDuration = 2200;

  private observer: IntersectionObserver | null = null;
  private animated = false;
  private readonly el = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.el.nativeElement.textContent = '0' + this.countSuffix;

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !this.animated) {
          this.animated = true;
          this.animate();
          this.observer?.unobserve(this.el.nativeElement);
        }
      },
      { threshold: 0.5 }
    );

    this.observer.observe(this.el.nativeElement);
  }

  private animate(): void {
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / this.countDuration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(eased * this.target);
      this.el.nativeElement.textContent = current + this.countSuffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
