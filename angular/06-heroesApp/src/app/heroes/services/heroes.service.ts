import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of} from 'rxjs';

import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class HeroesService {

  private baseUrl: string = environments.baseUrl;


  constructor(private http: HttpClient) { }


  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError(error => of(undefined))
      );
  }

  

  getSuggestions(query: string, limit = 6): Observable<Hero[]> {
    query = this.filterValue(query);
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`).pipe(
      map<Hero[], Hero[]>(
        (heroes: Hero[], i) => 
          heroes.filter((hero: Hero) =>
            this.filterValue(hero.superhero).includes(query)
          ).slice(0, limit)
      )
    );
  }

  filterValue(value: string) {
    return value.trim().toLowerCase();
  }


}