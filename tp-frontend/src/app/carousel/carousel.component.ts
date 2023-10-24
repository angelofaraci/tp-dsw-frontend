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
     title: 'Mario',
     img: 'https://media.vandal.net/ivandal/11/60/1146x600/5/5-2023/2023522338074_1.jpg',
     rating: 35,
    },
    {
     title: 'Sonic',
     img: 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2020/02/sonic-pelicula-1862103.jpg?tf=3840x',
     rating: 65,
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
      await this.gameService.getGameData(3)
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
