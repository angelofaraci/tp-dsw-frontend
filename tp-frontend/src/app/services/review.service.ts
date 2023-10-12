import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {

private URL = 'http://localhost:3000/api/review'


constructor(private http: HttpClient, private router: Router) { }

addReview(review: any){

  return this.http.post<any>(this.URL + '/', review)
}

}
