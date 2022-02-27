import { Result } from './../admin/resultat/result.model';
import { UsersService } from 'src/app/auth/signup/user.service';
import { ResultsService } from './../admin/resultat/result.service';
import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clientpage',
  templateUrl: './clientpage.component.html',
  styleUrls: ['./clientpage.component.css']
})
export class ClientpageComponent implements OnInit {
    results : Result[]=[];
    public userId :any;
    public userName :any;
    public userRole :any;
    displayedColumns: string[] = ['time', 'object', 'num','tele'];
    numRows = 0;
    date:Date | undefined;


    resultSub: Subscription = new Subscription;

    constructor(public ResultsService:ResultsService ,public UsersService:UsersService ) {
      setInterval(() => {
        this.date = new Date()
      }, 1000)
     }

    ngOnInit(): void {
      this.userId= this.UsersService.getUserId();
      this.userName = this.UsersService.getUserName();
      this.userRole = this.UsersService.getUserRole();
      this.ResultsService.getResults(this.userId);
      this.resultSub = this.ResultsService.getResultUpdateListener()
      .subscribe((results:Result[]) => {
         this.results =results;
         this.results = this.results.reverse();
         this.numRows= this.results.length;
        });


    }

  }

