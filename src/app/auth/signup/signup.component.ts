import { UsersService } from './user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading = false;
  hide = true;

  constructor( public UsersService: UsersService) { }

  ngOnInit() {}


  onSignup(form : NgForm ){
    if (form.invalid){
      return;
    }
    this.isLoading = true;
    this.UsersService.addUser(form.value.nom, form.value.tel  , form.value.password);
  }




}



