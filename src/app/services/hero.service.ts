import { Injectable } from '@angular/core';
import { Hero } from '../contracts/hero';
import { HEROES } from '../mock-heroes';
import { Observable, map, tap, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'Application/json'})
  };

  constructor(private http: HttpClient, private messages: MessageService) {}

  private log(message: string) {
    this.messages.add(`HeroService: ${message}`);
  }

  getAllHeroes(): Observable<Hero[]> {
    const heroes = this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
        tap(_ => this.log('fetch heroes')),
        catchError(this.handleError<Hero[]>('getAllHeroes', []))
      );
    return heroes;
  }

  getHeroById(id: number): Observable<Hero | undefined> {
    const hero = this.http.get<Hero>(`${this.heroesUrl}/${id}`)
    .pipe(
        tap(_ => this.log(`fetched hero ${id}`)),
        catchError(this.handleError<Hero>(`getHeroById id=${id}`)),
    );
    return hero;
  }

  getHeroByName(name: string): Observable<Hero[]> {
    if(name === '') {
      
    }

    const hero = this.http.get<Hero[]>(`${this.heroesUrl}?name=${name}`)
    .pipe(
        tap(_ => this.log(`get hero ${name}`)),
        catchError(this.handleError<Hero[]>(`getHeroByName name=${name}`))
    );
    return hero;
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
    .pipe(
        tap(_ => this.log(`Update Hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
    )
  }

  saveHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`add new hero ${newHero.id}`)),
        catchError(this.handleError<Hero>('saveHero'))
      );
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`hero deleted id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
