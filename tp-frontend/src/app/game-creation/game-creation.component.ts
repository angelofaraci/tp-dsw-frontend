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
  name: '',
  description: '',
  cover: '',
  release_date: '',
  rating: 1
}



months = ["","January","February","March","April","May","June","July","August","September","October","November","December"]


day = ''
month = ''
year = ''

  async ngOnInit(): Promise<void>{
    const selectDays = document.getElementById('days');
    const selectMonths = document.getElementById('months');
                      
    for (let i = 1; i <= 31; i++) {
      var option = document.createElement('option');
      option.value = i.toString();
      option.text = i.toString();
      if(selectDays) {selectDays.appendChild(option) }
    }

    for (var i = 1; i <= 12; i++) {
      var option = document.createElement('option');
      option.value = i.toString();
      option.text = this.months[i]
      if(selectMonths) {selectMonths.appendChild(option) }
    }

  }

createGame(){
  this.game.release_date = (this.year + '-' + this.month + '-' + this.day)
  console.log(this.game)
  this.gameService.createGame(this.game)
  .pipe(
    catchError((err: any) => {return err} )
  )
  .subscribe(
    res => {
      window.location.reload()
      console.log(res)
    }
  )
}

  
}
