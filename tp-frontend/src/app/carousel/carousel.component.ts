import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { catchError } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
 
  @Input()
  games: any
  constructor(private gameService: GameService){}

  game: any = {
    name: null,
    description: null,
    cover: '',
    banner: '',
    release_date: null,
    rating: 0,
  };
  
  featuredReviews: any = [];

   calculateColorRating(number: number){
    if (number>=70) {
      return 'badge text-bg-success';
    }else if (number>=40){
      return 'badge text-bg-secondary';
    } else return 'badge text-bg-danger'
   }
  async ngOnInit(): Promise<void> {
    try{
      await this.gameService.getGameData(4)
      .pipe(
        catchError((err: any) => {return err} )
      )
      .subscribe(
        res => {
          this.featuredReviews[0] = res.data
        }
      )
    }catch(error){
      console.log(error)
    } 

  }      

}
