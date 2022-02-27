import { UsersService } from './../../auth/signup/user.service';
import { Component, OnInit } from '@angular/core';
import {  NgForm  } from '@angular/forms';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  hide = true;
  constructor(public UsersService:UsersService) { }

  ngOnInit(): void {
  }
  onSignup(form : NgForm ){
    if (form.invalid){
      return;
    }
    this.UsersService.addUserAdmin(form.value.nom, form.value.tel  , form.value.password);
  }
}
