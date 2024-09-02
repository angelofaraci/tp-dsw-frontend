import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private REQ = environment.apiUrl
  private URL = this.REQ + 'api/user'

  constructor(private http: HttpClient, private router: Router) { }

  signUp(user: any){
    return this.http.post<any>(this.URL + '/signup', user)
  }


  logIn(user: any): Observable<any>{
    return this.http.post<any>(this.URL + '/login', user)
  }

  loggedIn(): Boolean{
    return !!localStorage.getItem('token')
  }
  
  getToken(){
    return localStorage.getItem('token')
  }

  logOut(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

}
