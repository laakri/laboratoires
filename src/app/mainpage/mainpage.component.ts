import { CodePatientPopupComponent } from './../code-patient-popup/code-patient-popup.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  popup:boolean=true;

  date:Date | undefined;
  constructor(public dialog: MatDialog){
    setInterval(() => {
      this.date = new Date()
    }, 1000)
  }


  code_analyse() {
    this.dialog.open(CodePatientPopupComponent,{
      width: '400px',
      height:'200px'
    });
  }

  slides = [
    {'image': 'https://i.ibb.co/brZhXP5/hand-with-protective-gloves-holding-blood-sample-covid-test.jpg'},
    {'image': 'https://i.ibb.co/cbPG30r/back-view-doctor-holding-blood-sample.jpg'},
    {'image': 'https://i.ibb.co/7WpQQjM/hand-with-protective-gloves-holding-blood-samples-covid-test.jpg'}
  ];



  ngOnInit(): void {
  }




}
