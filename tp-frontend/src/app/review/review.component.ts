import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { catchError } from 'rxjs';
import { Game } from '../interfaces/game.interface';
import { Review } from '../interfaces/review.interface';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  constructor(private reviewService: ReviewService) {}

  @Input()
  review: Review = {
    rating: 0,
    body: '',
    spoiler_check: false,
    gameId: '',
    userId: '',
    updatedAt: '',
    likeState: []
  };

  @Input()
  gameData: Game = {
    rating: 0,
    id: '',
    name: '',
    description: '',
    cover: '',
    banner: '',
  };

  @Input()
  userData: User = { id: '', username: '', password: '', email: '' };

  reviewDate = '';

  liked: boolean = false;
  disliked: boolean = false;

  BodyLine1 = ''
  BodyLine2 = ''
  BodyLine3 = ''

  async likeClicked() {
    if (this.liked) {
      this.reviewService
        .changeLikes(this.review._id, 'removeLike', this.review.userId._id)
        .pipe(
          catchError((err: any) => {
            return err;
          })
        )
        .subscribe((res) => {
          console.log(res);
        });
    }
    if (this.disliked) {
      this.reviewService
        .changeLikes(this.review._id, 'likeFromDislike', this.review.userId._id)
        .pipe(
          catchError((err: any) => {
            return err;
          })
        )
        .subscribe((res) => {
          console.log(res);
        });
    }
    if (!this.liked && !this.disliked) {
      this.reviewService
        .changeLikes(this.review._id, 'like', this.review.userId._id)
        .pipe(
          catchError((err: any) => {
            return err;
          })
        )
        .subscribe((res) => {
          console.log(res);
        });
    }

    this.liked = !this.liked;
    this.disliked = false;
  }

  async dislikeClicked() {
    if (this.liked) {
      this.reviewService
        .changeLikes(this.review._id, 'dislikeFromLike', this.review.userId._id)
        .pipe(
          catchError((err: any) => {
            return err;
          })
        )
        .subscribe((res) => {
          console.log(res);
        });
    }
    if (this.disliked) {
      this.reviewService
        .changeLikes(this.review._id, 'removeDislike', this.review.userId._id)
        .pipe(
          catchError((err: any) => {
            return err;
          })
        )
        .subscribe((res) => {
          console.log(res);
        });
    }
    if (!this.liked && !this.disliked) {
      this.reviewService
        .changeLikes(this.review._id, 'dislike', this.review.userId._id)
        .pipe(
          catchError((err: any) => {
            return err;
          })
        )
        .subscribe((res) => {
          console.log(res);
        });
    }

    this.disliked = !this.disliked;
    this.liked = false;
  }


  ngOnInit(): void {
    let color1 = String(0);
    let color2 = String(0);
    let color3 = String(0);
    if (this.gameData.rating >= 50) {
      color1 = String((100 - this.gameData.rating) * 2 * 2.55);
      color2 = String(255);
      color3 = String(this.gameData.rating);
    } else {
      color1 = String(255);
      color2 = String(this.gameData.rating * 2 * 2.55);
      color3 = String(this.gameData.rating);
    }
    document.documentElement.style.setProperty('--color1', color1);
    document.documentElement.style.setProperty('--color2', color2);
    document.documentElement.style.setProperty('--color3', color3);

    this.reviewDate = this.review.updatedAt!.substring(0, 10);

    this.BodyLine1 = this.review.body.substring(0,100)
    this.BodyLine2 = this.review.body.substring(100,200)
    this.BodyLine3 = this.review.body.substring(200,300)

    const state = this.review.likeState.find(i => i.userId === this.userData._id)
    if (state?.state === 'like'){
      this.liked = true
    }
    if (state?.state === 'dislike'){
      this.disliked = true
    }
    if (state?.state === 'neutral'){
      this.liked = false
      this.disliked = false
    }
    if (!state){
      this.liked = false
      this.disliked = false
    }
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
  }

  editMode: boolean = false;


}
