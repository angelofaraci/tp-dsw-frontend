import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { catchError } from 'rxjs';
import { User } from '../interfaces/user.interface.js';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  

  constructor(private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    await this.userService
      .getAllUserPublicData()
      .pipe(
        catchError((err: any) => {
          return err;
        })
      )
      .subscribe((res) => {
        this.users = this.users.concat(res);
        console.log(this.users);
      });
  }

  changeLevel(user:User, action:any){
    this.userService.changeUserLevel(user, action).pipe(
      catchError((err: any) => {
        return err;
      })
    )
    .subscribe((res) => {
      console.log(res);
      window.location.reload();
    });
  }
}
