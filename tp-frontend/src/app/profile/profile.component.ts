import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user = {}

  constructor(private userService: UserService) {}

  ngOnInit(){
    this.userService.getUserData()
      .subscribe(
        res =>{
          console.log(res)
        },
        err => {
          console.log(err);
          
        }
      )
  }
  


}
