import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private URL = 'http://localhost:3000/api/user'

  getUserData(){
    return  this.http.get<any>(this.URL + '/profile')
  }

}
