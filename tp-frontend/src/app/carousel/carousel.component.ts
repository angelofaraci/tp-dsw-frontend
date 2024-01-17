import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
 
  constructor(private gameService: GameService){

  }

  featuredReviews: any = [
    {

    },
    {
     title: 'Super Mario Odyssey',
     img: 'https://i0.wp.com/losreyesdelmando.com/wp-content/uploads/2017/11/super-mario-odyssey-1.jpg?fit=1920%2C1080&ssl=1',
     rating: 65,
    },
    {
     title: 'Sonic Superstars',
     img: 'https://sonicsuperstars.com/img/hero/herobg_1920.jpg',
     rating: 35,
    },
   ];

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
