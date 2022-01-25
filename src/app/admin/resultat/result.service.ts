import { Injectable } from "@angular/core";
import { Result } from "./result.model";
import {Subject}from 'rxjs'
import {HttpClient} from '@angular/common/http';
import { Router } from "@angular/router";


@Injectable({providedIn: 'root'})
export class ResultsService {
  private results :Result[] = [];
  private resultUpdated = new Subject<Result[]>();

  constructor(private http: HttpClient, private router: Router) {
  }


  addresults(num:number , object:string,filePath:string,userId:string){
    const result :Result=
    {num :num ,object :object,filePath:filePath,userId:userId};
    this.http.post<{message :string }>('http://localhost:4401/api/resultats/resultat', result)
    .subscribe((responseData) => {
      console.log(responseData.message);
      this.results.push(result);
      this.resultUpdated.next([...this.results]);
    });




  }
}
