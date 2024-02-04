import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { UserService } from '../services/user.service';
import { GameService } from '../services/game.service';
import { Observable, catchError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../interfaces/game.interface';
import { User } from '../interfaces/user.interface';
import { Review } from '../interfaces/review.interface';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private gameService: GameService,
    private reviewService: ReviewService
  ) {}

  gameData: Game = {
    rating: 0,
    id: '',
    name: '',
    description: '',
    cover: '',
    banner: '',
  };

  userData: User = { id: '', username: '', password: '', email: '' };

  reviews: Review[] = [];

  review: Review = {
    rating: 0,
    body: '',
    spoiler_check: false,
    gameId: '',
    userId: '',
  };

  reviewed: boolean = false;

  idToSearch = 0;

  isFromCurrentUser: boolean = false;

  async ngOnInit(): Promise<void> {
    try {
      this.route.params.subscribe((params) => {
        this.idToSearch = +params['id'];
      });
      await this.gameService
        .getGameData(this.idToSearch)
        .pipe(
          catchError((err: any) => {
            this.router.navigate(['/home']);
            return err;
          })
        )
        .subscribe((res) => {
          this.gameData = res.data;
          this.userService
            .getUserData()
            .pipe(
              catchError((err: any) => {
                return err;
              })
            )
            .subscribe((res) => {
              this.userData = res.userData;
              this.reviewService
                .checkIfReviewed(this.userData._id, this.gameData._id)
                .pipe(
                  catchError((err: any) => {
                    return err;
                  })
                )
                .subscribe((res) => {
                  this.reviewed = res.isReviewed;
                  this.reviewService
                    .findAllForGame(this.gameData._id)
                    .pipe(
                      catchError((err: any) => {
                        return err;
                      })
                    )
                    .subscribe((res) => {
                      this.reviews = this.reviews.concat(res);
                      console.log(this.reviews);

                      this.gameService
                        .getGameData(this.idToSearch)
                        .pipe(
                          catchError((err: any) => {
                            return err;
                          })
                        )
                        .subscribe((res) => {
                          this.gameData = res.data;
                        });
                    });
                });
            });
        });
    } catch (error) {
      console.log(error);
    }
  }

  calculateColorRating(number: number) {
    if (number >= 70) {
      return 'badge text-bg-success';
    } else if (number >= 40) {
      return 'badge text-bg-secondary';
    } else return 'badge text-bg-danger';
  }

  

  
}
