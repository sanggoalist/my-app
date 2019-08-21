import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Person } from './models/person';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private heroesUrl = 'api/persons';  // URL to web api

  constructor( private http: HttpClient) { }
/** GET heroes from the server */
getHeroes (): Observable<Person[]> {
  return this.http.get<Person[]>(this.heroesUrl);
}
}
