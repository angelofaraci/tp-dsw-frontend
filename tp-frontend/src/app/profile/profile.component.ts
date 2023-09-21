import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user = {
    username: '',
    email: '',
    profilePicture: ''

  }

  constructor(private userService: UserService) {}

  ngOnInit(){
    this.userService.getUserData()
      .subscribe(
        res =>{
          this.user = res.userData
          console.log(this.user)
          this.user.profilePicture = 'https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg'
        },
        err => {
          console.log(err);
          
        }
      )
  }

  changeProfilePicture(image: string){
    this.user.profilePicture = image
  }

  


}
