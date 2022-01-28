import { ResultsService } from './../admin/resultat/result.service';
import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-patient-popup',
  templateUrl: './code-patient-popup.component.html',
  styleUrls: ['./code-patient-popup.component.css']
})
export class CodePatientPopupComponent implements OnInit{

  constructor(public ResultsService:ResultsService) { }

  ngOnInit(): void {
  }



  onclick(form :NgForm){
    if (form.invalid)  {
    return;
    }
    console.log(form.value.code);
    this.ResultsService.getResult(form.value.code);
  }

}
