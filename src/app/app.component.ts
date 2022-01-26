import { UsersService } from 'src/app/auth/signup/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LABO';

  constructor(private UsersService:UsersService ){}
  ngOnInit(){
    this.UsersService.autoAuthUser();

  }
}
