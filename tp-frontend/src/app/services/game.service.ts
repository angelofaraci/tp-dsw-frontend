import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameService {


  private URL = 'http://localhost:3000/api/game'


constructor(private http: HttpClient, private router: Router) { }

getGameId(){
  const game: any = this.http.get<any>(this.URL)
  return game._id
}
}
