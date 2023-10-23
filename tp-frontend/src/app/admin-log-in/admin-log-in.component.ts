import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-admin-log-in',
  templateUrl: './admin-log-in.component.html',
  styleUrls: ['./admin-log-in.component.scss']
})
export class AdminLogInComponent {

  constructor(private adminService: AdminService, private router: Router){  }

  admin= {
    email:'',
    password:''
  }

  logIn(){
    this.adminService.logIn(this.admin).pipe(
      catchError((err: any) => {return err} )
    )
      this.router.navigate(['/admin'])
  }
}
