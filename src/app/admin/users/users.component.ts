import { AddadminComponent } from './../addadmin/addadmin.component';
import { User } from './../../auth/signup/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild} from '@angular/core';
import { AdduserComponent } from './../adduser/adduser.component';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from 'src/app/auth/signup/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[]=[];
  displayedColumns: string[] = ['tel', 'name', 'add_result','Results', 'Delete'];
  isLoading = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  usersSub: Subscription = new Subscription;



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
  add_admin() {
    this.dialog.open(AddadminComponent,{
      width: '400px',
      height:'550px'
    });
  }
  onDelete(UserId :string){
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




