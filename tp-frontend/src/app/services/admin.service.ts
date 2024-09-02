import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  private REQ = environment.apiUrl
  private URL = this.REQ + 'api/admin'

  getUserData(){
    
    return  this.http.get<any>(this.URL + '/profile')
    
  }

  logIn(admin:any){
    return this.http.post<any>(this.URL + '/login', admin)
  }

  
   
   
  }

