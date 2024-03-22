import { Component, Output, EventEmitter } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../contracts/hero';

@Component({
  selector: 'app-search-heroes',
  templateUrl: './search-heroes.component.html',
  styleUrl: './search-heroes.component.css'
})
export class SearchHeroesComponent {
  @Output() heroesEvent: EventEmitter<Hero[]> = new EventEmitter<Hero[]>();

  constructor(
    private service: HeroService
  ) {}
  
  searchHero(text: string) {
    this.service.getHeroByName(text.toLowerCase())
        .subscribe(heroes => this.heroesEvent.emit(heroes))
    }
}
