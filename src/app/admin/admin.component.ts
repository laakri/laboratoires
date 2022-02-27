import { UsersService } from 'src/app/auth/signup/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public UsersService:UsersService) { }

  ngOnInit(): void {
  }
  onlogout(){
    this.UsersService.logout()
  }



}
