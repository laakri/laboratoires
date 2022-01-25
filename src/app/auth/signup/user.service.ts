import { Injectable } from "@angular/core";
import { User } from "./user.model";
import {Subject}from 'rxjs'
import {HttpClient} from '@angular/common/http';
import { Router } from "@angular/router";
import {map} from 'rxjs/operators';



@Injectable({providedIn: 'root'})
export class UsersService {
  private isAuthenticated = false;

  private token: any;
  private tokenTimer: any;
  private users :User[] = [];
  private authStatusListener = new Subject<boolean>();

  private userUpdated = new Subject<User[]>();

  constructor(private http: HttpClient, private router: Router) {
  }


  getUsers(){
    this.http.get<{message :string, users :any}>('http://localhost:4401/api/users/data')
    .pipe(map((userData) =>{
      return userData.users.map((user: {_id: any; name: any; tel: any;  }) => {
        return{
        id: user._id,
        name: user.name,
        tel: user.tel

        };
      });
    }))
    .subscribe(transformedUsers => {
      this.users = transformedUsers;
      this.userUpdated.next([...this.users]);
    });
  }
  getUserUpdateListener(){
    return this.userUpdated.asObservable();
  }

  addUser(  name : string ,tel :string,  password :string){
    const user :User= {name :name ,tel :tel,  password :password};
    this.http.post<{message :string }>('http://localhost:4401/api/users/signup', user)
    .subscribe((responseData) => {
      console.log(responseData.message);
      this.users.push(user);
      this.userUpdated.next([...this.users]);
    });
  }




  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }


  login(tel: string, password: string) {
    const user : User = {
      tel: tel, password: password,
      name: ""
    };
    this.http
      .post<{ token: string; expiresIn: number }>("http://localhost:4401/api/users/login",user)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate);
          this.router.navigate(["/"]);
        }
      });
  }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }
  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }
  deleteUser(UserId: string) {
    this.http.delete('http://localhost:4401/api/users/'+UserId)
    .subscribe((responseData) => {
      console.log(responseData);
    });
  }



}

