import { Component, OnInit } from '@angular/core';
import { UsersService } from './../auth/signup/user.service';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  date:Date | undefined;
  constructor( public UsersService:UsersService ){
    setInterval(() => {
      this.date = new Date()
    }, 1000)
  }

  ngOnInit(): void {
  }
  onLogout() {
    this.UsersService.logout();
  }
}
