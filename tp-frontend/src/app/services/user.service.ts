import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { map } from 'rxjs';
import { User } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private URL = 'http://localhost:3000/api/user'

  getUserPublicData(username: string){
    return this.http.get<any>(this.URL + '/user/' + username)
  }

  getUserData(){
    
    return  this.http.get<any>(this.URL + '/profile')
    
  }

  changeUsername(user:User){
    return this.http.put<any>(this.URL + '/update', user)
  }

  deleteUser(id: string){

    return this.http.delete<any>(this.URL + '/' + id)
  }
  
   
   
  }


