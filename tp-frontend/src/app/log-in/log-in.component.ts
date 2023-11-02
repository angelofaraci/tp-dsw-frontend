import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';




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

error: boolean = false;

  logIn(){
    this.authService.logIn(this.user)
    .pipe(
      catchError((err: any) => {
        console.error(err);
        this.error = true
        return err} )
    )
      .subscribe(
        res => {
          localStorage.setItem('token', res.token)
          this.router.navigate(['/home'])
        }
      )
    
  }

}
