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
  
  featuredReviews: any = [
    {
      title: 'Undertale',
      img: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.deviantart.com%2Fignysound%2Fart%2FUndertale-Banner-563650549&psig=AOvVaw3GPXas3YtD2bnv-iTnyPh9&ust=1723921909404000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLjl_9ib-ocDFQAAAAAdAAAAABAJ',
      rating: 75
    },
    {
     title: 'Super Mario Odyssey',
     img: 'https://i.imgur.com/9NlsvBJ.png',
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
