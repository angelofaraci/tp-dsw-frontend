import { Component } from '@angular/core';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent {

  gameData = {
    title: 'The Legend Of Zelda: Tears of the Kingdom',
    rating: 96,
    description: '',
    cover: 'https://media.vandal.net/i/1440x1080/5-2023/2023591016846_1.jpg',
    release_date: '2023-05-12',
    socials : []
   
}

calculateColorRating(number: number){
  if (number>=70) {
    return 'badge text-bg-success';
  }else if (number>=40){
    return 'badge text-bg-secondary';
  } else return 'badge text-bg-danger'
 }

 reviews = []


 
}
