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
    updatedAt: ''
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

  
reviewDate = ''

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

    this.reviewDate = this.review.updatedAt!.substring(0, 10)
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

 



  editMode: boolean = false;

  
}
