import { Injectable } from "@angular/core";
import { Admin } from "./admin.model";
import {Subject}from 'rxjs'
import {HttpClient} from '@angular/common/http';
import { Router } from "@angular/router";



@Injectable({providedIn: 'root'})
export class AdminsService {
  private isAuthenticated = false;
  private adminId :any;
  private adminName:any;
  private token: any;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private adminUpdated = new Subject<Admin[]>();


  constructor(private http: HttpClient, private router: Router) {
  }

  addAdmin(  name : string ,tel :string,  password :string){
    const Admin :Admin= {name :name ,tel :tel,  password :password};
    this.http.post<{message :string }>('http://localhost:4401/api/admins/signup', Admin)
    .subscribe(() => {
      this.router.navigate(["/"]);
    },error=>{
       console.log(error);
    }
    );
  }

  getToken() {
    return this.token;
  }

  getAdminId(){
    return this.adminId;
  }
  getAdminName(){
    return this.adminName;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  login(tel: string, password: string) {
    const admin : Admin = {
      tel: tel, password: password,
      name: ""
    };
    this.http
      .post<{ token: string; expiresIn: number;adminId:string;adminName:string; }>(
        "http://localhost:4401/api/admins/login",admin)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.adminId = response.adminId;
          this.adminName = response.adminName;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate,this.adminId,this.adminName);
          this.router.navigate(["/admin/users"]);
        }
      });
  }
  autoAuthAdmin() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.adminId = authInformation.adminId;
      this.adminName = authInformation.adminName;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.adminId = null;
    this.adminName = null;
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
  private saveAuthData(token: string, expirationDate: Date, adminId: string, adminName: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("adminId", adminId);
    localStorage.setItem("adminName", adminName);


  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("adminId");
    localStorage.removeItem("adminName");

  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const adminId = localStorage.getItem("adminId");
    const adminName = localStorage.getItem("adminName");
    if (!token || !expirationDate ||!adminId ||!adminName ) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      adminId: adminId,
      adminName:adminName

    }
  }


}
