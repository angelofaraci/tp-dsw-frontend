import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.scss'],
})
export class UserReviewComponent {
  constructor(private reviewService: ReviewService) {}


  @Input()
  review: any;

  @Input()
  userData: any;

  BodyLine1 = ''
  BodyLine2 = ''
  BodyLine3 = ''

  @Input()
  sameUser: boolean = false;

  ngOnInit(): void {
    let color1 = String(0);
    let color2 = String(0);
    let color3 = String(0);
    if (this.review.rating >= 50) {
      color1 = String((100 - this.review.rating) * 2 * 2.55);
      color2 = String(255);
      color3 = String(this.review.rating);
    } else {
      color1 = String(255);
      color2 = String(this.review.rating * 2 * 2.55);
      color3 = String(this.review.rating);
    }
    document.documentElement.style.setProperty('--color1', color1);
    document.documentElement.style.setProperty('--color2', color2);
    document.documentElement.style.setProperty('--color3', color3);

    this.BodyLine1 = this.review.body.substring(0,100)
    this.BodyLine2 = this.review.body.substring(100,200)
    this.BodyLine3 = this.review.body.substring(200,300)
  }

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

  

  editReview() {
    const gameData = this.review.gameId._id;
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
      this.review.userId = this.userData._id;
      this.reviewService
        .editReview(this.review, this.userData._id, gameData)
        .pipe(
          catchError((err: any) => {
            console.log(this.review.gameId)
            return err;
          })
        )
        .subscribe((res) => {
          console.log(res);
          window.location.reload();

        });
    }
  }
}
