import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  constructor(private gameService:GameService){}

  games: any = [];



  
  game: any = {
    name: '',
    description: '',
    cover: '',
    release_date: '',
    rating: 0
  }

  months = ["","January","February","March","April","May","June","July","August","September","October","November","December"]

  day = ''
  month = ''
  year = ''

arrayBooleans: any = []


index = 0


addElements(){
  const selectDays = document.getElementById('days');
        const selectMonths = document.getElementById('months');
        for (let i = 1; i <= 31; i++) {
          let option = document.createElement('option');
          option.value = i.toString();
          option.text = i.toString();
          if(selectDays) {selectDays.appendChild(option) }
        }
    
        for (let i = 1; i <= 12; i++) {
          let option = document.createElement('option');
          option.value = i.toString();
          option.text = this.months[i]
          if(selectMonths) {selectMonths.appendChild(option) }
        }
}
invalid_name:boolean = false;
invalid_description:boolean = false;

async editGame(){
this.invalid_name = !!!this.game.name;
this.invalid_description= !!!this.game.description;
let validation = !!(this.game.name && this.game.description)
if(validation){
this.game.release_date = this.games[this.index].release_date
await this.gameService.updateGame(this.game, this.games[this.index].id)
.pipe(
  catchError((err: any) => {return err} )
)
.subscribe(res =>{
  console.log(res)
  window.location.reload()})
}
}



  async ngOnInit():Promise<void>{
    await this.gameService.getGames()
    .pipe(
      catchError((err: any) => {return err} ))
    .subscribe(res => {
        this.games=this.games.concat(res.data)
        for(let i=0; i< this.games.length; i++){
          this.arrayBooleans.push(false);
        }
        console.log(this.games)})  
  }

  async deleteGame(id:any){
    await this.gameService.deleteGame(id)
    .pipe(
      catchError((err: any) => {return err} )
    )
    .subscribe(res =>{
      console.log(res)
      window.location.reload()})
    
  }
}
