import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { concat } from 'cypress/types/lodash';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  
  user: any = {
    username: '',
    email: '',
    password: ''
  };

error: boolean = false;
errorMessage: string = '';
userstring: string = ' Username';
invalid_username: boolean = false;
invalid_email: boolean = false;
invalid_password: boolean = false;
  constructor(private router: Router, private authService: AuthService){

  }
  
  signUp(){
    this.invalid_email = false;
    this.invalid_password = false;
    this.invalid_username = false;
    if (!this.user.username || !this.user.email || !this.user.password){
      if (!this.user.username){
        this.invalid_username = true;
      }
      if (!this.user.email){
        this.invalid_email = true;
      }
      if (!this.user.password){
        this.invalid_password = true;
      }
      this.errorMessage = 'You must enter an username, email and password'
      this.error = true;
    }
    else {

      this.authService.signUp(this.user)
      .pipe(
        catchError((err: any) => {
          this.error = true
          if (err.error.case == 'username'){
            this.invalid_username = true;
          }
          if (err.error.case == 'email'){
            this.invalid_email = true;
          }
          this.errorMessage=err.error.message
          return ''} )
      )
        .subscribe(
          res => {
            localStorage.setItem('token', res.token)
            this.router.navigate(['/home'])
          }
        )
    }
}


}
