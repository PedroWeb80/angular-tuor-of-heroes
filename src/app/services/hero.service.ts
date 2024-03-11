import { Injectable } from '@angular/core';
import { Hero } from '../contracts/hero';
import { HEROES } from '../mock-heroes';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroes = HEROES;
  private heroesUrl = 'api/heroes';

  constructor(private http: HttpClient, private messages: MessageService) {}

  private log(message: string) {
    this.messages.add(`HeroService: ${message}`)
  }
  getAllHeroes(): Observable<Hero[]> {
    const heroes = this.http.get<Hero[]>(this.heroesUrl);
    this.messages.add('heroService: fetch heroes');
    return heroes;
  }

  getHeroById(id: number): Observable<Hero | undefined> {
    const hero = of(this.heroes.find((hero) => hero.id === id));
    this.messages.add(`GetById hero: ${id}`);
    return hero;
  }

  getHeroByName(name: string): Observable<Hero[]> {
    const hero = of(
      this.heroes.filter((hero) => hero.name.toLocaleLowerCase().includes(name))
    );
    return hero;
  }
}
