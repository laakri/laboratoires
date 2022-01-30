import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ClientpageComponent } from './clientpage/clientpage.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './admin/users/users.component';
import { ResultatComponent } from './admin/resultat/resultat.component';
import { EditComponent } from './admin/users/edit/edit.component';
import { OneResultPageComponent } from './one-result-page/one-result-page.component';
import { AuthGuard } from './auth/signup/user.guard';
import {AuthGuardAdmin}from './admin-login/admin.guard'
import { ContactusComponent } from './contactus/contactus.component';
import { ResultatsUserComponent } from './admin/resultats-user/resultats-user.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

const routes: Routes = [
  { path: '', component: MainpageComponent },
  { path: 'main', component: MainpageComponent },
  {path: 'auth',
  component: AuthComponent,
  children:[
   { path: '', redirectTo: '/auth/signin', pathMatch: 'full' },
   {path:'signin', component: SigninComponent },
   {path:'signup',component: SignupComponent}
  ]
},
{path: 'admin',
  component: AdminComponent,canActivate: [AuthGuardAdmin] ,
  children:[
   { path: '', redirectTo: '/admin/users', pathMatch: 'full' },
   {path:'users', component: UsersComponent},
   {path:'resultat/:userId', component: ResultatComponent },
   {path:'edit/:editId',component:EditComponent,},
   {path:'resultats/:userId',component:ResultatsUserComponent,}
  ]
},
{path:'resultat-client',component:OneResultPageComponent,},
{path:'clientpage',component:ClientpageComponent,canActivate: [AuthGuard]},
{path:'contact',component:ContactusComponent,},
{path:'login-admin',component:AdminLoginComponent,}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard,AuthGuardAdmin]

})
export class AppRoutingModule { }
