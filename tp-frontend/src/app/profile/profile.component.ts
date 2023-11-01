import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { catchError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any = {
   
  }

  game ={
    score: 30,
  }

  state:boolean = false;
  invalid_username:boolean = false;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
  }


  ngOnInit(){
    this.userService.getUserData()
      .subscribe(
        res =>{
          this.user = res.userData
          console.log(this.user)         
        },
        err => {
          console.log(err);
          
        }
      )
      let color1=String(0)
      let color2=String(0)
      if(this.game.score >= 50){
        color1=String((100-this.game.score)*2*2.55)
        color2=String(255)
      }
      else{
        color1=String(255)
        color2=String(this.game.score*2*2.55)
      }
      document.documentElement.style.setProperty('--color1', color1);
      document.documentElement.style.setProperty('--color2', color2);
        

  }

  editUsername() {
    if(!this.user.username){
      this.invalid_username = true;
    }
    else{
      this.userService.changeUsername(this.user)
      .pipe(
        catchError((err: any) => {this.invalid_username = true;return err} )
      )
      .subscribe(
        res => {
          window.location.reload()
        }
      )
    }
      
  }
  
 async deleteUser(){
    await this.userService.deleteUser(this.user._id)
    .pipe(
      catchError((err: any) => {return err} )
    )
    .subscribe(
      res => {
        this.authService.logOut()
        this.router.navigate(['/home'])
        console.log(res)
      })
  }


}
