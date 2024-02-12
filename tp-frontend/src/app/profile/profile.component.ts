import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ReviewService } from '../services/review.service';
import { GameService } from '../services/game.service';
import { catchError, pipe } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = {};
  reviews: any = [];

  review: any = {
    rating: null,
    body: null,
    spoiler_check: false,
    gameId: '',
    userId: '',
  };

  state: boolean = false;
  invalid_username: boolean = false;

  constructor(
    private userService: UserService,
    private reviewService: ReviewService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService
      .getUserData()
      .pipe(
        catchError((err: any) => {
          return err;
        })
      )
      .subscribe((res) => {
        this.user = res.userData;
        console.log(this.user);
        this.reviewService
          .findAllForUser(this.user._id)
          .pipe(
            catchError((err: any) => {
              return err;
            })
          )
          .subscribe((res) => {
            this.reviews = this.reviews.concat(res);
            console.log(this.reviews);
          });
      });
  }

  editUsername() {
    if (!this.user.username) {
      this.invalid_username = true;
    } else {
      this.userService
        .changeUsername(this.user)
        .pipe(
          catchError((err: any) => {
            this.invalid_username = true;
            return err;
          })
        )
        .subscribe((res) => {
          window.location.reload();
        });
    }
  }

  async deleteUser() {
    await this.userService
      .deleteUser(this.user._id)
      .pipe(
        catchError((err: any) => {
          return err;
        })
      )
      .subscribe((res) => {
        this.authService.logOut();
        this.router.navigate(['/home']);
        console.log(res);
      });
  }
}
