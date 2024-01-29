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
    let shortDescription = words.slice(0, 50).join(' ')
    shortDescription = shortDescription+'...'
    this.game.description = shortDescription
  }
}
