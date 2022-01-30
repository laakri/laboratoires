import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {HttpClient} from '@angular/common/http';
import { Contact } from "./contactus.model";






@Injectable({providedIn: 'root'})
export class ContactusService {

  constructor(private http: HttpClient, private router: Router) {
  }

  sendMail(  name : string ,email :string,  textA :string){
    const cantact :Contact= {name :name ,email :email,  textA :textA};
    this.http.post<{message :string }>('http://localhost:4401/api/email', cantact)
    .subscribe(() => {

    },error=>{
       console.log(error);
    }
    );
  }

}
