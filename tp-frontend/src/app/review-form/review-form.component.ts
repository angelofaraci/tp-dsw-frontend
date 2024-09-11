import { Component, Input } from '@angular/core';
import { Review } from '../interfaces/review.interface';
import { ReviewService } from '../services/review.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent {

 constructor(private reviewService: ReviewService){}
  
@Input() userId: string = ''
@Input() gameId: string = ''
@Input() isThisEdit: boolean = false



  review: Review = {
    rating: 0,
    body: '',
    spoiler_check: false,
    gameId: '',
    userId: '',
    likeState: []
  };

  toggleSwitchSpoiler() {
    this.review.spoiler_check = !this.review.spoiler_check;
    console.log(this.review);
  }

  invalid_rating: boolean = false;
  invalid_body: boolean = false;

  postReview() {
    if (!this.review.body || !this.review.rating || this.review.rating > 100) {
      if (this.review.rating > 100) {
        this.invalid_rating = true;
      }
      if (!this.review.body) {
        this.invalid_body = true;
      }
      if (!this.review.rating) {
        this.invalid_rating = true;
      }
      if (
        this.review.rating &&
        this.review.rating <= 100 &&
        !this.review.body
      ) {
        this.invalid_rating = false;
      }
      if (
        (!this.review.rating || this.review.rating > 100) &&
        this.review.body
      ) {
        this.invalid_body = false;
      }
    } else {
      this.invalid_body = false;
      this.invalid_rating = false;
      this.review.gameId = this.gameId
      this.review.userId = this.userId
      console.log(this.review)
        if (this.isThisEdit){
          this.reviewService
            .editReview(this.review, this.userId, this.gameId)

            .pipe(
              catchError((err: any) => {
              return err;
              })
            )
            .subscribe((res) => {
              window.location.reload();
              console.log(res);
            });
        }
          else {
            this.reviewService
            .addReview(this.review)
  
            .pipe(
              catchError((err: any) => {
                return err;
              })
            )
            .subscribe((res) => {
              window.location.reload();
              console.log(res);
            });
          }

      }
      
      
  }

  editReview() {
    if (!this.review.body || !this.review.rating || this.review.rating > 100) {
      if (this.review.rating > 100) {
        this.invalid_rating = true;
      }
      if (!this.review.body) {
        this.invalid_body = true;
      }
      if (!this.review.rating) {
        this.invalid_rating = true;
      }
      if (
        this.review.rating &&
        this.review.rating <= 100 &&
        !this.review.body
      ) {
        this.invalid_rating = false;
      }
      if (
        (!this.review.rating || this.review.rating > 100) &&
        this.review.body
      ) {
        this.invalid_body = false;
      }
    } else {
      this.invalid_body = false;
      this.invalid_rating = false;
      this.review.gameId = this.gameId
      this.review.userId = this.userId
      this.reviewService
        
    }
  }

  sendInfo(){
    if(this.isThisEdit){
      this.editReview()
    } else {this.postReview()}
  }

}
