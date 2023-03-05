import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UService } from '../Services/u.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  headers:any;

  constructor(private u:UService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.u.token){
      this.headers = {
        headers : new HttpHeaders(
          {'Authorization': 'Bearer ' + this.u.token}
        )
      };
      const httpToken = request.clone(this.headers)
      return next.handle(httpToken);
    }

    return next.handle(request);
  }
}
