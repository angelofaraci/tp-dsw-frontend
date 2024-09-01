import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private gameService: GameService) {}
  game: any = {
    id: null,
    name: null,
    description: null,
    cover: '',
    banner: '',
    release_date: null,
    rating: 0,
  };
  recentGames = [this.game];
  moreLikedGames = [this.game]
  async ngOnInit(): Promise<void> {
    try {
      await this.gameService
        .getGamesDataByDate(3)
        .pipe(
          catchError((err: any) => {
            return err;
          })
        )
        .subscribe((res) => {
          console.log(res.data);
          this.recentGames = res.data;
        });
    } catch (error) {
      console.log(error);
    }

    try {
      await this.gameService
        .getGamesDataByRating(4)
        .pipe(
          catchError((err: any) => {
            return err;
          })
        )
        .subscribe((res) => {
          console.log(res.data);
          this.moreLikedGames = res.data;
        });
    } catch (error) {
      console.log(error);
    }
  }
}
