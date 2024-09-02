import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  game: any


  ngOnInit(): void {
    let words = this.game.description.split(' ')
    let shortDescription = words.slice(0, 40).join(' ')
    shortDescription = shortDescription+'...'
    this.game.description = shortDescription
  }

  calculateColorRating(number: number) {
    if (number >= 70) {
      return 'badge text-bg-success';
    } else if (number >= 40) {
      return 'badge text-bg-secondary';
    } else return 'badge text-bg-danger';
  }
}
