import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ReviewService } from '../services/review.service';
import { GameService } from '../services/game.service';
import { catchError, pipe } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  sameUser: boolean = false
  state: boolean = false;
  invalid_username: boolean = false;
  mailToSearch: string = '';
  constructor(
    private userService: UserService,
    private reviewService: ReviewService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    if (this.router.url === '/myprofile') {
      this.sameUser = true
      this.userService
        .getUserData()
        .pipe(
          catchError((err: any) => {
            return err;
          })
        )
        .subscribe((res) => {
          this.user = res.userData;
          this.reviewService
            .findAllForUser(this.user._id)
            .pipe(
              catchError((err: any) => {
                return err;
              })
            )
            .subscribe((res) => {
              this.reviews = this.reviews.concat(res)
            });
        });
    } else {
      this.route.params.subscribe((params) => {
        this.mailToSearch = params['email'];
      });
      await this.userService
        .getUserPublicData(this.mailToSearch)
        .pipe(
          catchError((err: any) => {
            return err;
          })
        )
        .subscribe((res) => {
          this.user = res.publicInput;
          this.reviewService
            .findAllForUser(this.user._id)
            .pipe(
              catchError((err: any) => {
                return err;
              })
            )
            .subscribe((res) => {
              this.reviews = this.reviews.concat(res);
            });
        });
    }
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
