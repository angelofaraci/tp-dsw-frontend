import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { UserService } from '../services/user.service';
import { GameService } from '../services/game.service';
import { Observable, catchError } from 'rxjs';



@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {

 /*  gameData = {
    title: 'The Legend Of Zelda: Tears of the Kingdom',
    rating: 96,
    description: 'The Legend of Zelda: Tears of the Kingdom es un videojuego de acción-aventura de 2023 de la serie The Legend of Zelda, desarrollado por la filial Nintendo EPD en colaboración con Monolith Soft y publicado por Nintendo para la consola Nintendo Switch.',
    cover: 'https://media.vandal.net/i/1440x1080/5-2023/2023591016846_1.jpg',
    release_date: '2023-05-12',
    socials : []
   
} */
constructor(private userService: UserService, private gameService: GameService, private reviewService: ReviewService) {}


gameData: any = {
  
}

userData: any = {

}



ngOnInit(): void {
  this.gameService.getGameData(3).pipe(
    catchError((err: any) => {return err} )
  )
  .subscribe(
    res =>{
      this.gameData = res.data   
  
    }
  )

  this.userService.getUserData()
  .pipe(
    catchError((err: any) => {return err} )
  )
  .subscribe(
    res => {
      this.userData = res.userData
    }
  )

}

 



calculateColorRating(number: number){
  if (number>=70) {
    return 'badge text-bg-success';
  }else if (number>=40){
    return 'badge text-bg-secondary';
  } else return 'badge text-bg-danger'
 }

 reviews = []

 review: any = {
  rating: null,
  body: null,
  spoiler_check: false,
  private: false,
  gameId: '',
  userId: ''

}

invalid_rating:boolean = false
invalid_body:boolean = false


toggleSwitchSpoiler(){
  this.review.spoiler_check = !this.review.spoiler_check
}

toggleSwitchPrivate(){
  this.review.private = !this.review.private
}
 postReview(){

  if ((!this.review.body) || (!this.review.rating))  {

    if(!this.review.body ) { this.invalid_body = true}
    if(!this.review.rating ) { this.invalid_rating = true }
    if((this.review.rating ) && (!this.review.body )){ this.invalid_rating = false }
    if((!this.review.rating ) && (this.review.body )){ this.invalid_body = false }
  } 
  
  else {
    this.invalid_body = false
    this.invalid_rating = false
    this.review.gameId = this.gameData._id
    this.review.userId = this.userData._id
    this.reviewService.addReview(this.review)
    .pipe(
      catchError((err: any) => {return err} )
    )
    .subscribe(
      res => {
        console.log(res)
      }
    )
  }
  
  

}
 
}
