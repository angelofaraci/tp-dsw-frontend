import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameService {


  private URL = 'http://localhost:3000/api/games'


constructor(private http: HttpClient, private router: Router) { }

getGameData(id: number){
  return this.http.get<any>(this.URL + `/${id}`)
}

getGameId(){
  const game: any = this.http.get<any>(this.URL)
  return game._id
}


}
