import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  footerLinks = [
    {
      title: 'Servicios',
      links: [
        { label: 'Desarrollo Web', href: '#servicios' },
        { label: 'Cloud & DevOps', href: '#servicios' },
        { label: 'Apps Moviles', href: '#servicios' },
        { label: 'APIs & Backend', href: '#servicios' }
      ]
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Nosotros', href: '#nosotros' },
        { label: 'Proyectos', href: '#proyectos' },
        { label: 'Proceso', href: '#proceso' },
        { label: 'Contacto', href: '#contacto' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Politica de Privacidad', href: '#' },
        { label: 'Terminos de Uso', href: '#' },
        { label: 'Cookies', href: '#' }
      ]
    }
  ];

  socialLinks = [
    { label: 'LinkedIn', href: '#', icon: 'linkedin' },
    { label: 'GitHub', href: '#', icon: 'github' },
    { label: 'Twitter', href: '#', icon: 'twitter' }
  ];
}
