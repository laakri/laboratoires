import { UsersService } from './../signup/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  isLoading = false;
  hide = true;

  constructor( public UsersService: UsersService ) { }

  ngOnInit(): void {

  }
  onLogin(form : NgForm){
    if (form.invalid){
      return;
    }
    this.UsersService.login(form.value.tel, form.value.password);
  }




}
