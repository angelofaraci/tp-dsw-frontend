import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Review } from '../interfaces/review.interface';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private URL = 'http://localhost:3000/api/reviews';

  constructor(private http: HttpClient, private router: Router) {}

  addReview(review: Review) {
    return this.http.post<any>(this.URL + '/', review);
  }

  checkIfReviewed(userId: any, gameId: any) {
    const body = {
      userId,
      gameId,
    };
    return this.http.post<any>(this.URL + '/check', body);
  }

  findAllForGame(gameId: any) {
    const body = {
      gameId,
    };
    return this.http.post<any>(this.URL + '/getreviews/game', body);
  }

  findAllForUser(userId: any) {
    const body = {
      userId,
    };
    return this.http.post<any>(this.URL + '/getreviews/user', body);
  }

  deleteReview(reviewId: any) {
    return this.http.delete(this.URL + '/' + reviewId);
  }

  editReview(review: Review, userId: any, gameId: any) {
    const body = {
      review: review,
      userId: userId,
      gameId: gameId,
    };
    return this.http.put<any>(this.URL + '/' + review._id, body);
  }

  changeLikes(reviewId: any, action: any, userId: any) {
    console.log(reviewId, '  ', action, '   ', userId);
    return this.http.post<any>(this.URL + `/${reviewId}/${action}/${userId}`, null);
  }
}
