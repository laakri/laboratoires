import {HttpInterceptor,HttpRequest,HttpHandler} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UsersService } from "./user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private UsersService: UsersService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.UsersService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authToken)
    });
    return next.handle(authRequest);
  }
}
