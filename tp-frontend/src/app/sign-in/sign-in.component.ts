import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


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

  
  constructor(private router: Router, private authService: AuthService){

  }
  
  signUp(){
    this.authService.signUp(this.user)
      .subscribe(
        res => {
          console.log(res)
          localStorage.setItem('token', res.token)
          this.router.navigate(['/home'])
        },
        err => {
          console.log(err)
        }
      )
}


}
