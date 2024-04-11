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
    console.log('LLEGA')
    await this.userService
      .getAllUserPublicData()
      .pipe(
        catchError((err: any) => {
          return err;
        })
      )
      .subscribe(
        res => {
          this.users = this.users.concat(res)
          console.log(this.users)

        }
      );
  }
}
