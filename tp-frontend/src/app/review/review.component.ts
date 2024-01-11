import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})



export class ReviewComponent implements OnInit {

  
    constructor(private reviewService: ReviewService){}
    ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  @Input()
  review: any 

  @Input()
  gameData: any

  @Input()
  userData: any


  deleteReview(review: any) {
    this.reviewService
      .deleteReview(review._id)
      .pipe(
        catchError((err: any) => {
          return err;
        })
      )
      .subscribe((res) => {
        window.location.reload();
        console.log(res);
      });
    //window.location.reload()
  }

  reviewed: boolean = false;

  isFromCurrentUser: boolean = false;

  

  invalid_rating: boolean = false;
  invalid_body: boolean = false;

  toggleSwitchSpoiler() {
    this.review.spoiler_check = !this.review.spoiler_check;
    console.log(this.review);
  }

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
      this.review.gameId = this.gameData._id;
      this.review.userId = this.userData._id;

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

  editMode: boolean = false;

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
      this.review.gameId = this.gameData._id;
      this.review.userId = this.userData._id;
      this.reviewService
        .editReview(this.review, this.userData._id, this.gameData._id)

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

