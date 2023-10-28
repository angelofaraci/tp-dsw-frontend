import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  

  lanzamientos = [
    {
      name: `Baldur's Gate 3`,
      img: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Baldur%27s_Gate_3_cover_art.jpg/220px-Baldur%27s_Gate_3_cover_art.jpg',
    },
    {
      name: 'Resident Evil 4',
      img: 'https://image.api.playstation.com/vulcan/ap/rnd/202210/0712/Excr73ZmEiSIQT18r070yhX5.png',
    },
    {
      name: 'Lies of P',
      img: 'https://upload.wikimedia.org/wikipedia/en/d/de/Lies_of_p_cover_art.jpg',
    },
    {
      name: 'Alan Wake 2',
      img: 'https://cdn1.epicgames.com/offer/c4763f236d08423eb47b4c3008779c84/EGS_AlanWake2_RemedyEntertainment_S2_1200x1600-c7c8091ddac0f9669c8e5905bca88aaa',
    },
  ]

}

  

