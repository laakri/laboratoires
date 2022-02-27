import { UsersService } from 'src/app/auth/signup/user.service';
import {CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot,Router} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export class AuthGuardAdmin implements CanActivate {
  constructor(private UsersService: UsersService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.UsersService.getIsAuth();
    const isAdmin =this.UsersService.getUserRole();
    if (!isAuth || isAdmin != "admin")
    {
      return false;
    }
    else{
      return true;
    }
  }
}
