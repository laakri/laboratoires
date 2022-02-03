import { Injectable } from "@angular/core";
import { Result } from "./result.model";
import {Subject}from 'rxjs'
import {HttpClient} from '@angular/common/http';
import { Router } from "@angular/router";
import {map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SuccesComponent } from "src/app/succes/succes.component";

@Injectable({providedIn: 'root'})
export class ResultsService {
  private results :Result[] = [];
  private resultUpdated = new Subject<Result[]>();

  constructor(private http: HttpClient, private router: Router,private _snackBar: MatSnackBar) {
  }

  addresults(num:string , object:string,filePath:File,userId:string){
    const resultData =new FormData();
    resultData.append("num",num);
    resultData.append("object",object);
    resultData.append("file",filePath,num );
    resultData.append("userId",userId);

    this.http.post<{message :string;result:Result }>('http://localhost:4401/api/resultats', resultData)
    .subscribe((responseData) => {
      console.log(filePath+","+num)
      console.log("Result added successfully")
      this.router.navigate(["/admin/users"]);
      const  successMessage ="Result Added Successfuly !";
      this._snackBar.openFromComponent( SuccesComponent,
        {data :{message :successMessage},
        duration: 2500,
        panelClass: ['green-snackbar']
      });
    });
  }
  getResults(UserId: string){
    this.http.get<{message :string, results :any}>('http://localhost:4401/api/resultats/data/'+UserId)
    .pipe(map((resultData) =>{
      return resultData.results.map((result: {_id: any; num: any; object: any;filePath:any; createdAt: any; updatedAt: any; }) => {
        return{
        id: result._id,
        num: result.num,
        object: result.object,
        filePath : result.filePath,
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
  getResultsAdmin(UserId: string){
    this.http.get<{message :string, results :any}>('http://localhost:4401/api/resultats/data-admin/'+UserId)
    .pipe(map((resultData) =>{
      return resultData.results.map((result: {_id: any; num: any; object: any;filePath:any; createdAt: any; updatedAt: any; }) => {
        return{
        id: result._id,
        num: result.num,
        object: result.object,
        filePath : result.filePath,
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
    this.http.get<{message :string, result :any}>('http://localhost:4401/api/resultats/'+code)
    .subscribe((results ) => {
      const jhon = {
        num: results.result.num,
        object: results.result.object,
        filePath: results.result.filePath,
        createdAt: results.result.createdAt,
      };
      if (jhon !==null)
      this.router.navigate(["/resultat-client", jhon]);
    },error =>{
      console.log(error);
    }
    );
  }

}
