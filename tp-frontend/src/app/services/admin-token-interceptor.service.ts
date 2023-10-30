import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http/index.js';
import { Observable } from 'rxjs';
import { AdminAuthService } from './admin.auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AdminAuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenizeRequest = req.clone(
      {
        setHeaders: {
          Authorization: `Bearer ${this.authService.getToken()}`
        }
      }
    )
      return next.handle(tokenizeRequest)
  }


}
