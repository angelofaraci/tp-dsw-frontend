import { Component, Input } from '@angular/core';
import { Game } from '../interfaces/game.interface.js';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css']
})
export class GameInfoComponent {

  @Input() gameData: Game = {
    rating: 0,
    id: '',
    name: '',
    description: '',
    cover: '',
    banner: '',
  }

  calculateColorRating(number: number) {
    if (number >= 70) {
      return 'badge text-bg-success';
    } else if (number >= 40) {
      return 'badge text-bg-secondary';
    } else return 'badge text-bg-danger';
  }
}
