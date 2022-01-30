import { logging } from 'protractor';
import { AdminsService } from './../admin-login/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public AdminsService:AdminsService) { }

  ngOnInit(): void {
  }
  onlogout(){
    this.AdminsService.logout()
  }



}
