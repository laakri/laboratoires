import { Injectable } from "@angular/core";
import { Result } from "./result.model";
import {Subject}from 'rxjs'
import {HttpClient} from '@angular/common/http';
import { Router } from "@angular/router";
import {map} from 'rxjs/operators';


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
  getResults(UserId: string){
    this.http.get<{message :string, results :any}>('http://localhost:4401/api/resultats/data/'+UserId)
    .pipe(map((resultData) =>{
      return resultData.results.map((result: {_id: any; num: any; object: any; createdAt: any; updatedAt: any; }) => {
        return{
        id: result._id,
        num: result.num,
        object: result.object,
        createdAt : result.createdAt,
        updatedAt : result.updatedAt
        };
      });
    }))
    .subscribe(transformedResult => {
      this.results = transformedResult;
      this.resultUpdated.next([...this.results]);
    });
  }
  getResultUpdateListener(){
    return this.resultUpdated.asObservable();
  }
  getResult(code: string){
    this.http.get<{message :string, results :any}>('http://localhost:4401/api/resultats/datas/'+code)
    .pipe(map((resultData) =>{
      return resultData.results.map((result: { num: any; object: any; filePath:any}) => {
        return{
        num: result.num,
        object: result.object,
        filePath:result.filePath
        };
      });
    }))
    .subscribe(transformedResult => {
      this.results = transformedResult;
      this.resultUpdated.next([...this.results]);
      this.router.navigate(["/"]);

    });
  }

}
