import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResultsService } from '../resultat/result.service';
import { ActivatedRoute, } from "@angular/router";
import { Result } from '../resultat/result.model';

@Component({
  selector: 'app-resultats-user',
  templateUrl: './resultats-user.component.html',
  styleUrls: ['./resultats-user.component.css']
})
export class ResultatsUserComponent implements OnInit {
  results : Result[]=[];
  private routeSub: Subscription | undefined;
  private resultatId: any;
  resultSub: Subscription = new Subscription;
  displayedColumns: string[] = ['time', 'object', 'num','tele'];

  constructor(public ResultsService:ResultsService,public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
    this.resultatId = params['userId'];
  });

    this.ResultsService.getResults(this.resultatId);
      this.resultSub = this.ResultsService.getResultUpdateListener()
      .subscribe((results:Result[]) => {
         this.results =results;
         this.results = this.results.reverse();
        });


  }

}
