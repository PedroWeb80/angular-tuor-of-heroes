import { Component, Input } from '@angular/core';
import { Hero } from '../../contracts/hero';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.css'
})
export class HeroDetailsComponent {
  @Input() hero?: Hero;
}
