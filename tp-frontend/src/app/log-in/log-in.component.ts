import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';




@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  constructor(private authService: AuthService, private router: Router){  }

  user = {
    email: '',
    password: ''
  }

invalid_email : boolean = false;
invalid_password : boolean = false;

error: boolean = false;
errorMessage: string = '';

  logIn(){
    this.invalid_email = false;
    this.invalid_password = false;

    if (!this.user.email || !this.user.password){
      if (!this.user.email){
        this.invalid_email = true;
      }
      if (!this.user.password){
        this.invalid_password = true;
      }
      this.errorMessage = 'You must enter email and password'
      this.error = true;
    }
    else {
    this.authService.logIn(this.user)
    .pipe(
      catchError((err: any) => {
        this.errorMessage = err.error.message
        if (err.error.case == 'email'){
          this.invalid_email = true;
        }
        if (err.error.case == 'password'){
          this.invalid_password = true;
        }
        this.error = true
        return ''})
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
