import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from './../auth/signup/user.service';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit,OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs!: Subscription;

  date:Date | undefined;
  constructor( public UsersService:UsersService ){
    setInterval(() => {
      this.date = new Date()
    }, 1000)
  }

  ngOnInit(): void {
    this.userIsAuthenticated =this.UsersService.getIsAuth();
    this.authListenerSubs=this.UsersService.getAuthStatusListener()
    .subscribe(isAuthenticated =>{
      this.userIsAuthenticated = isAuthenticated;
    });
  }
  ngOnDestroy(): void {

  }
  onLogout() {
    this.UsersService.logout();
  }
}
