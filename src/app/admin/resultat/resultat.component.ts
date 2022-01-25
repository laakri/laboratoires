import { ResultsService } from './result.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.css']
})
export class ResultatComponent implements OnInit {

  private resultatId: any;
  private routeSub: Subscription | undefined;

  constructor( public ResultsService:ResultsService,public route: ActivatedRoute ) { }
  gen() {
    return Math.floor(Math.random() * (999999 - 100000) + 100000);
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.resultatId = params['resultatId'];
    });

  }

  onAddresult(form : NgForm,){
    if (form.invalid){
      return
    }
    this.ResultsService.addresults(this.gen(),form.value.object,form.value.filePath,this.resultatId);

  }

}
