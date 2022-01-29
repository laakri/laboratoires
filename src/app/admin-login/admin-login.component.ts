import { AdminsService } from './admin.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  isLoading = false;
  hide = true;
  constructor(public AdminsService: AdminsService) { }

  ngOnInit(): void {
  }
  onSignup(form : NgForm ){
    if (form.invalid){
      return;
    }
    this.isLoading = true;
    this.AdminsService.addAdmin(form.value.nom, form.value.tel  , form.value.password);
  }

}
