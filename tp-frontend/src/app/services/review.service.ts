import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {

private URL = 'http://localhost:3000/api/reviews'


constructor(private http: HttpClient, private router: Router) { }

addReview(review: any){
  console.log(review)
  return this.http.post<any>(this.URL + '/', review)
}

checkIfReviewed(userId: any, gameId: any){

  console.log('Esto es en el servicio review', userId, ' ', gameId)
  const body = {
    userId,
    gameId
  }
  return this.http.post<any>(this.URL + '/check', body)
}

}
