import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.scss'
})
export class TechStackComponent {
  technologies = [
    'React', 'Angular', 'TypeScript', 'Node.js', 'Java', 'Python',
    'AWS', 'Docker', 'PostgreSQL', 'MongoDB', 'GraphQL', 'Kubernetes'
  ];
}
