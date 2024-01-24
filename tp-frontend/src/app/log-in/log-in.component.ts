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

error: boolean = false;

  logIn(){
    this.authService.logIn(this.user)
    .pipe(
      catchError((err: any) => {
        console.log('ENTRO POR EL ERROR')

        this.error = true
        return ''})
    )
      .subscribe(
        res => {
          console.log('NO ENTRO POR EL ERROR')
          localStorage.setItem('token', res.token)
          this.router.navigate(['/home'])
        }
      )
    
  }

}
