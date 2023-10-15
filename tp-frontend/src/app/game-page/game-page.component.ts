import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { UserService } from '../services/user.service';
import { GameService } from '../services/game.service';
import { Observable, catchError } from 'rxjs';



@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit, AfterViewInit {

constructor(private userService: UserService, private gameService: GameService, private reviewService: ReviewService) {}


gameData: any = {
  
}

userData: any = {

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

reviewed: boolean = false



 async ngOnInit(): Promise<void> {
  try{

    await this.gameService.getGameData(3).pipe(
      catchError((err: any) => {return err} )
    )
    .subscribe(
      res =>{
        this.gameData = res.data   
        this.userService.getUserData()
          .pipe(
            catchError((err: any) => {return err} )
          )
          .subscribe(
            res => {
              this.userData = res.userData
              this.reviewService.checkIfReviewed(this.userData._id, this.gameData._id)
                    .pipe(
                      catchError((err: any) => {return err} )
                    )
                    .subscribe(
                      res => {
                        this.reviewed = res.isReviewed
                        console.log(this.reviewed)
                      }
                    )
            }
          )
            }
          )
  
   
      
    

  } catch(error){
    console.log(error)
  } 
}

ngAfterViewInit(): void {
  
}

 



calculateColorRating(number: number){
  if (number>=70) {
    return 'badge text-bg-success';
  }else if (number>=40){
    return 'badge text-bg-secondary';
  } else return 'badge text-bg-danger'
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
