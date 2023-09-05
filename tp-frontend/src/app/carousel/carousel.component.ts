import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  
  featuredReviews = [
    {
     title: 'The Legend Of Zelda',
     img: 'https://media.vandal.net/i/1440x1080/5-2023/2023591016846_1.jpg',
     rating: 83,
    },
    {
     title: 'Mario',
     img: 'https://media.vandal.net/ivandal/11/60/1146x600/5/5-2023/2023522338074_1.jpg',
     rating: 35,
    },
    {
     title: 'Sonic',
     img: 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2020/02/sonic-pelicula-1862103.jpg?tf=3840x',
     rating: 65,
    },
   ];

   calculateColorRating(number: number){
    if (number>=70) {
      return 'badge text-bg-success';
    }else if (number>=40){
      return 'badge text-bg-secondary';
    } else return 'badge text-bg-danger'
   }

}
