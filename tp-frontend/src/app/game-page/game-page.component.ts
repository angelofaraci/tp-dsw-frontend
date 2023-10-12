import { Component } from '@angular/core';
import { ReviewService } from '../services/review.service.js';
import { UserService } from '../services/user.service.js';
import { GameService } from '../services/game.service.js';


@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent {

  gameData = {
    title: 'The Legend Of Zelda: Tears of the Kingdom',
    rating: 96,
    description: '',
    cover: 'https://media.vandal.net/i/1440x1080/5-2023/2023591016846_1.jpg',
    release_date: '2023-05-12',
    socials : []
   
}

constructor(private userService: UserService, private gameService: GameService) {}

calculateColorRating(number: number){
  if (number>=70) {
    return 'badge text-bg-success';
  }else if (number>=40){
    return 'badge text-bg-secondary';
  } else return 'badge text-bg-danger'
 }

 reviews = []

 review = {
  rating: '',
  body: '',
  spoiler_check: '',
  state: '',
  gameId: '',
  userId: ''

}

async postReview(){
  this.review.userId = await this.userService.getUserId()
  this.review.gameId = await this.gameService.getGameId()
}
 
}
