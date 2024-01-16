import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-game-creation',
  templateUrl: './game-creation.component.html',
  styleUrls: ['./game-creation.component.scss']
})
export class GameCreationComponent implements OnInit {


  constructor(private gameService: GameService){}

game: any = {
  name: null,
  description: null,
  cover: '',
  banner: '',
  release_date: null,
  rating : 0
}



months = ["","January","February","March","April","May","June","July","August","September","October","November","December"]


day = null;
month = null;
year = null;

  async ngOnInit(): Promise<void>{
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
  invalid_day:boolean = false;
  invalid_month:boolean = false;
  invalid_year:boolean = false;

  

createGame(){
  this.invalid_name = !!!this.game.name;
  this.invalid_description= !!!this.game.description;
  this.invalid_day = !!!this.day;
  this.invalid_month = !!!this.month;
  this.invalid_year = !!!this.year;
  let validation = !!(this.game.name && this.game.description && this.day && this.month && this.year)
  if (validation){
  this.game.release_date = (this.year + '-' + this.month + '-' + this.day)
  this.gameService.createGame(this.game)
  .pipe(
    catchError((err: any) => {return err} )
  )
  .subscribe(
    res => {
      console.log(res)
      window.location.reload()
    }
  )
}
} 
}
