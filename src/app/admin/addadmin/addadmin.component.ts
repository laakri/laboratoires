import { AdminsService } from './../../admin-login/admin.service';
import { Component, OnInit } from '@angular/core';
import {  NgForm} from '@angular/forms';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddadminComponent implements OnInit {
  hide = true;
  constructor(public AdminsService:AdminsService) { }

  ngOnInit(): void {
  }
  onSignup(form : NgForm ){
    if (form.invalid){
      return;
    }
    this.AdminsService.addAdmin(form.value.nom, form.value.tel  , form.value.password);
  }
}
