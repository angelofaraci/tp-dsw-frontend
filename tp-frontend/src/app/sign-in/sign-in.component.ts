import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  
  user: any = {
    email: '',
    password: '',
    username: ''
  };

error: boolean = false;
  
  constructor(private router: Router, private authService: AuthService){

  }
  
  signUp(){
    this.authService.signUp(this.user)
    .pipe(
      catchError((err: any) => {
        console.error(err);
        this.error = true
        return err} )
    )
      .subscribe(
        res => {
          console.log(res)
          localStorage.setItem('token', res.token)
          this.router.navigate(['/home'])
        }
      )
}


}
