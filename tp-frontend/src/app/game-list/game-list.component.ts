import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent {

  constructor(private gameService:GameService){}
  games: any = [];


  async ngOnInit():Promise<void>{
    await this.gameService.getGames().pipe(
      catchError((err: any) => {return err} ))
      .subscribe(res => {
        this.games=this.games.concat(res.data)
        console.log(this.games)})
  }

  async deleteGame(id:any){
    await this.gameService.deleteGame(id).pipe(
      catchError((err: any) => {return err} )
    ).subscribe(res =>{
      console.log(res)
      window.location.reload()})
    
  }
}
