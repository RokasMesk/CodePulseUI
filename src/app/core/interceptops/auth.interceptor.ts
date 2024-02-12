import { HttpInterceptorFn } from '@angular/common/http';
import { Injector } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookieService:CookieService){

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.shouldInterceptRequest(req)){
      const authRequest = req.clone({
        setHeaders:{
          'Authorization': this.cookieService.get('Authorization')
        }
      });
      return next.handle(authRequest);
    }
    return next.handle(req);
    
  }
  private shouldInterceptRequest(request:HttpRequest<any>):boolean{
    return request.urlWithParams.indexOf('addAuth=true', 0) > -1? true:false;
  }
}
