import { AdminsService } from './admin.service';
import {HttpInterceptor,HttpRequest,HttpHandler} from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptorAdmin implements HttpInterceptor {
  constructor(private AdminsService: AdminsService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.AdminsService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authToken)
    });
    return next.handle(authRequest);
  }
}
