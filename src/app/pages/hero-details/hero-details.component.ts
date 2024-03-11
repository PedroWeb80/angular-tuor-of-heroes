import { Component, OnInit} from '@angular/core';
import { Hero } from '../../contracts/hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../../services/hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.css'
})
export class HeroDetailsComponent implements OnInit{
  hero?: Hero;

  constructor(
    private route: ActivatedRoute,
    private service: HeroService,
    private location: Location
  ){}
  
  ngOnInit(): void {
    this.getHero()
  }

  getHero(): void {
    this.service.getHeroById(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back()
  }
}
