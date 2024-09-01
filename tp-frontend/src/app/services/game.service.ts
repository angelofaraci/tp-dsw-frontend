import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Game } from '../interfaces/game.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {


  private URL = 'http://localhost:3000/api/games'


constructor(private http: HttpClient, private router: Router) { }

getGameData(id: number){
  return this.http.get<any>(this.URL + `/${id}`)
}

getGamesDataByDate(cant:number){
  return this.http.get<any>(this.URL + `/date/${cant}` )
}

getGamesDataByRating(cant:number){
  return this.http.get<any>(this.URL + `/rating/${cant}` )
}

getGames(){
  return this.http.get<any>(this.URL + '/')
}

getGameId(){
  const game: any = this.http.get<any>(this.URL)
  return game._id
}

createGame(game: Game){
  return this.http.post<any>(this.URL + '/', game)
}

deleteGame(id: any){
  return this.http.delete<any>(this.URL + '/' + id)
}

updateGame(game:any, id:any){
  console.log(game, '    ', id)
  return this.http.put(this.URL + '/' + id, game)
}

}
