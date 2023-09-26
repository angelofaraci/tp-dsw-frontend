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
          this.user.profilePicture = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
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
