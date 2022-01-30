import { AdminsService } from './admin.service';
import {CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot,Router} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export class AuthGuardAdmin implements CanActivate {
  constructor(private AdminsService: AdminsService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.AdminsService.getIsAuth();
    if (!isAuth) {
      this.router.navigate(['/']);
    }
    return isAuth;
  }
}
