import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-clientpage',
  templateUrl: './clientpage.component.html',
  styleUrls: ['./clientpage.component.css']
})
export class ClientpageComponent implements OnInit {
    displayedColumns: string[] = ['position', 'name', 'date','resultat'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
    constructor() { }

    ngOnInit(): void {
    }

  }

    export interface PeriodicElement {
      name: string;
      position: number;
      date: String;
      resultat: string;
    }


    const ELEMENT_DATA: PeriodicElement[] = [
      {position: 1, name: 'Hydrogen de merde de teste de la sas', date: 'Monday 17:00:15', resultat: 'Télécharger'},
      {position: 2, name: 'Helium', date: 'Thisdy 15:30:15', resultat: 'Télécharger'},
      {position: 3, name: 'Lithium', date: 'Tusday 8:15:50' ,resultat: 'Télécharger'},
      {position: 4, name: 'Beryllium', date: 'Monday 17:00:15', resultat: 'Télécharger'},
      {position: 5, name: 'Boron', date: 'Monday 17:00:15', resultat: 'Télécharger'},
      {position: 6, name: 'Carbon', date: 'Monday 17:00:15', resultat: 'Télécharger'},
      {position: 7, name: 'Nitrogen', date: 'Tusday 8:15:50', resultat: 'Télécharger'},
      {position: 8, name: 'Oxygen', date: 'Monday 17:00:15', resultat: 'Télécharger'},
      {position: 9, name: 'Fluorine', date: 'Monday 17:00:15', resultat: 'Télécharger'},
      {position: 10, name: 'Neon', date: 'Monday 17:00:15', resultat: 'Téléchargere'},
      {position: 11, name: 'Sodium', date: 'Monday 17:00:15', resultat: 'Téléchargera'},
      {position: 12, name: 'Magnesium', date: 'Monday 17:00:15', resultat: 'Télécharger'},
      {position: 13, name: 'Aluminum', date: 'Monday 17:00:15', resultat: 'Télécharger'},
      {position: 14, name: 'Silicon', date: 'Monday 17:00:15', resultat: 'Télécharger'},
      {position: 15, name: 'Phosphorus', date: 'Tusday 8:15:50', resultat: 'Télécharger'},
      {position: 16, name: 'Sulfur', date: 'Monday 17:00:15', resultat: 'Télécharger'},
      {position: 17, name: 'Chlorine', date: 'Monday 17:00:15', resultat: 'Télécharger'},
      {position: 18, name: 'Argon', date: 'Monday 17:00:15', resultat: 'Télécharger'},
      {position: 19, name: 'Potassium', date: 'Monday 17:00:15', resultat: 'Télécharger'},
      {position: 20, name: 'Calcium', date: 'Monday 17:00:15', resultat: 'Télécharger'},
    ];

