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
      private messages: MessageService
    ) {  }
  
  ngOnInit(): void {
    this.service.getAllHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}
