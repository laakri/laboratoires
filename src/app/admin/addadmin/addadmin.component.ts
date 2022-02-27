import { UsersService } from 'src/app/auth/signup/user.service';
import { Component, OnInit } from '@angular/core';
import {  NgForm} from '@angular/forms';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddadminComponent implements OnInit {
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
