import { Injectable } from "@angular/core";
import { User } from "./user.model";
import {Subject}from 'rxjs'
import {HttpClient} from '@angular/common/http';
import { Router } from "@angular/router";
import {map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SuccesComponent } from "src/app/succes/succes.component";

@Injectable({providedIn: 'root'})
export class UsersService {
  private isAuthenticated = false;
  private userId :any;
  private userName:any;
  private userRole:any;
  private token: any;
  private tokenTimer: any;
  private users :User[] = [];
  private authStatusListener = new Subject<boolean>();
  private userUpdated = new Subject<User[]>();
  constructor(private http: HttpClient, private router: Router,private _snackBar: MatSnackBar) {
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
    .subscribe(() => {
      this.login(tel,password)
    },error=>{
       console.log(error);
    }
    );
  }
  addUserAdmin(  name : string ,tel :string,  password :string ){
    const user :User= {name :name ,tel :tel,  password :password };
    this.http.post<{message :string }>('http://localhost:4401/api/users/signup/admin', user)
    .subscribe(() => {
      const  successMessage ="Success !";
      this._snackBar.openFromComponent( SuccesComponent,
        {data :{message :successMessage},
        duration: 2500,
        panelClass: ['green-snackbar']
      });
    },error=>{
       console.log(error);
    }
    );
  }

  getToken() {
    return this.token;
  }

  getUserId(){
    return this.userId;
  }
  getUserName(){
    return this.userName;
  }
  getUserRole(){
    return this.userRole;
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
      .post<{ token: string; expiresIn: number;userId:string; userName:string; userRole:string; }>(
        "http://localhost:4401/api/users/login",user)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.userName = response.userName;
          this.userRole = response.userRole;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate,this.userId,this.userName,this.userRole);
          this.router.navigate(["/clientpage"]);
        }
      },error => {
        this.authStatusListener.next(false);
      });
  }
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.userName = authInformation.userName;
      this.userRole = authInformation.userRole;


      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    this.userName = null;
    this.userRole= null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    console.log("Logout runs seccesfully!")
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration + " Secends");
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, userName: string,userRole:string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", userName);
    localStorage.setItem("userRole", userRole);


  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");

  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const userRole = localStorage.getItem("userRole");

    if (!token || !expirationDate  ) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      userName:userName,
      userRole:userRole

    }
  }
  deleteUser(UserId: string) {
    this.http.delete('http://localhost:4401/api/users/'+UserId)
    .subscribe((responseData) => {
      const  successMessage ="Success !";
      this._snackBar.openFromComponent( SuccesComponent,
        {data :{message :successMessage},
        duration: 2500,
        panelClass: ['green-snackbar']
      });
    });
  }



}

