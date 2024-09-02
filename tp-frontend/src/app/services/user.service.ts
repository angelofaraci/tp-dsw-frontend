import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { map } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { environment } from 'src/enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private REQ = environment.apiUrl;

  private URL = this.REQ + 'api/user'

  getUserPublicData(username: string){
    return this.http.get<any>(this.URL + '/user/' + username)
  }

  getAllUserPublicData(){
    return this.http.get<any>(this.URL + '/getall')
  }

  getUserData(){
    
    return  this.http.get<any>(this.URL + '/profile')
    
  }

  changeUserLevel(user: User, action:any){
    return this.http.put<any>(this.URL + `/levelUp/${action}`, user)
  }

  changeUsername(user:User){
    return this.http.put<any>(this.URL + '/update', user)
  }

  deleteUser(id: string){

    return this.http.delete<any>(this.URL + '/' + id)
  }
  
   
   
  }


