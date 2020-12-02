import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

@Injectable()
export class LocalInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler){

    const clone = req.clone();
    clone.url.replace('localhost', '192.168.43.166');
    console.log(clone.url + "this isjskfddjfkdjkfjdkfj")
    return next.handle(clone);

  }
}
