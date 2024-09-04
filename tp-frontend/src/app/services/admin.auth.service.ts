import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  private REQ = environment.apiUrl
  private URL = this.REQ + 'api/admin'

  constructor(private http: HttpClient, private router: Router) { }

  signUp(admin: any){
    return this.http.post<any>(this.URL + '/signup', admin)
  }


  logIn(admin: any){
    return this.http.post<any>(this.URL + '/login', admin)
  }

  loggedIn(): Boolean{
   return !!localStorage.getItem('admin_token')  
  }
  
  getToken(){
    return localStorage.getItem('admin_token')
  }

  logOut(){
    localStorage.removeItem('admin_token')
    this.router.navigate(['/'])
  }

}
