import { User } from './../../auth/signup/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild} from '@angular/core';
import { AdduserComponent } from './../adduser/adduser.component';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from 'src/app/auth/signup/user.service';
import { Subscription } from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';

import {MatSort, Sort} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users : User[]=[];
  displayedColumns: string[] = ['tel', 'name', 'add_result', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource<User>(this.users);
  isLoading = false;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  usersSub: Subscription = new Subscription;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }
  constructor(public dialog: MatDialog,public UsersService:UsersService) {
  }


  ngOnInit(): void {
   this.UsersService.getUsers();
   this.isLoading = true;
    this.usersSub = this.UsersService.getUserUpdateListener()
    .subscribe((users:User[]) => {
      this.isLoading = false;
      this.users =users;
    });
  }
  add_user() {
    this.dialog.open(AdduserComponent,{
      width: '400px',
      height:'550px'
    });
  }
  onDelete(UserId :string){
    console.log(UserId);
    this.UsersService.deleteUser(UserId);
    this.UsersService.getUsers();
    this.isLoading = true;
     this.usersSub = this.UsersService.getUserUpdateListener()
     .subscribe((users:User[]) => {
       this.isLoading = false;
       this.users =users;
     });

  }




}






