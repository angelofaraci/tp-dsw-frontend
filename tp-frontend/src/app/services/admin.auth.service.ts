import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  private URL = 'http://localhost:3000/api/admin'

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
    this.router.navigate(['/login'])
  }

}
