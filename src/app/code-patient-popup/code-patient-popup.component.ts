import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-patient-popup',
  templateUrl: './code-patient-popup.component.html',
  styleUrls: ['./code-patient-popup.component.css']
})
export class CodePatientPopupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  onclick(form :NgForm){
    if (form.invalid)  {
    return
    }
    else
    console.log(form.value.code)
  }

}
