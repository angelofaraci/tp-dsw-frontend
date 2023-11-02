import { Component } from '@angular/core';
@Component({
  selector: 'app-game-creation',
  templateUrl: './game-creation.component.html',
  styleUrls: ['./game-creation.component.scss']
})
export class GameCreationComponent {
months = ["","January","February","March","April","May","June","July","August","September","October","November","December"]

  async ngOnInit(): Promise<void>{
    const selectDays = document.getElementById('days');
    const selectMonths = document.getElementById('months');
                      
    for (let i = 1; i <= 31; i++) {
      var option = document.createElement('option');
      option.value = i.toString();
      option.text = i.toString();
      if(selectDays) {selectDays.appendChild(option) }
    }

    for (var i = 1; i <= 12; i++) {
      var option = document.createElement('option');
      option.value = i.toString();
      option.text = this.months[i]
      if(selectMonths) {selectMonths.appendChild(option) }
    }

  }

  
}
