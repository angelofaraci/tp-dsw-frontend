import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';




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

  logIn(){
    this.authService.logIn(this.user)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token)
          this.router.navigate(['/home'])
        },
        err => {
          console.log(err);
          
        }
      )
    
  }

}
