import { Injectable } from "@angular/core";
import { Admin } from "./admin.model";
import {Subject}from 'rxjs'
import {HttpClient} from '@angular/common/http';
import { Router } from "@angular/router";
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AdminsService {
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





}
