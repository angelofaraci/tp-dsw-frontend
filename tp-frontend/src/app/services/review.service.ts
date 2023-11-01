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
  return this.http.post<any>(this.URL + '/', review)
}

checkIfReviewed(userId: any, gameId: any){

  
  const body = {
    userId,
    gameId
  }
  return this.http.post<any>(this.URL + '/check', body)
}

findAllForGame(gameId: any){
  const body = {
    gameId
  }
  return this.http.post<any>(this.URL + '/getreviews', body)
}

deleteReview(reviewId: any){
  
  return this.http.delete(this.URL + '/' + reviewId)
}

editReview(review: any, userId: any){
  const body = {
    review: review,
    userId: userId
  }
  console.log('llega')
  return this.http.put<any>(this.URL + '/' + review._id, body)
}


}
