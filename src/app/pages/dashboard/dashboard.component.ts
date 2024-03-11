import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../contracts/hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  
  constructor(private service: HeroService) {}

  ngOnInit(): void {
    this.service.getAllHeroes().subscribe((heroes) => (this.heroes = heroes));
  }
}
