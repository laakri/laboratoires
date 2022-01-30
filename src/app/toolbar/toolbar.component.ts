import { AdminsService } from './../admin-login/admin.service';
import { AdminLoginComponent } from './../admin-login/admin-login.component';
import { MatDialog } from '@angular/material/dialog';
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
  adminIsAuthenticated = false;
  private authListenerSubs!: Subscription;
  private AdminauthListenerSubs!: Subscription;

  date:Date | undefined;
  constructor( public UsersService:UsersService ,public dialog:MatDialog, public AdminsService:AdminsService){
    setInterval(() => {
      this.date = new Date()
    }, 1000)
  }
  log_admin() {
    this.dialog.open(AdminLoginComponent,{
      width: '400px',
      height:'400px'
    });
  }
  ngOnInit(): void {
    this.userIsAuthenticated =this.UsersService.getIsAuth();
    this.authListenerSubs=this.UsersService.getAuthStatusListener()
    .subscribe(isAuthenticated =>{
    this.userIsAuthenticated = isAuthenticated;

      this.adminIsAuthenticated=this.AdminsService.getIsAuth();
      console.log(this.userIsAuthenticated);
      this.AdminauthListenerSubs=this.AdminsService.getAuthStatusListener()
      .subscribe(iisAuthenticated =>{
        this.adminIsAuthenticated = iisAuthenticated;
      })
    });
  }
  ngOnDestroy(): void {

  }
  onLogout() {
    this.UsersService.logout();
  }
}
