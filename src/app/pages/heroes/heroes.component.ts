import { Component, OnInit, inject } from '@angular/core';
import { Hero } from '../../contracts/hero';
import { HeroService } from '../../services/hero.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent implements OnInit{
  heroes: Hero[] = [];
  
  selectedHero?: Hero;

  constructor(
      private service: HeroService,
    ) {  }
  
  ngOnInit(): void {
    this.service.getAllHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(heroName: string): void {
    heroName = heroName.trim();

    if (!heroName) { return; }
    
    const newHero = { name: heroName }
    
    this.service.saveHero(newHero as Hero)
      .subscribe(hero => {
        this.heroes.push(hero)
      })
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.service.deleteHero(hero.id)
      .subscribe();
  }
}
