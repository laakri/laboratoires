import { AuthInterceptor } from './auth/signup/user.interceptor';
import {AuthInterceptorAdmin} from './admin-login/admin.interceptor'
import {ErrorInterceptor}from'./error-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { ClientpageComponent } from './clientpage/clientpage.component';
import { CodePatientPopupComponent } from './code-patient-popup/code-patient-popup.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './admin/users/users.component';
import { AuthComponent } from './auth/auth.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ResultatComponent } from './admin/resultat/resultat.component';
import { EditComponent } from './admin/users/edit/edit.component';
import { OneResultPageComponent } from './one-result-page/one-result-page.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ErrorComponent } from './error/error.component';
import { ResultatsUserComponent } from './admin/resultats-user/resultats-user.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AddadminComponent } from './admin/addadmin/addadmin.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { SuccesComponent } from './succes/succes.component';
import { AdduserComponent } from './admin/adduser/adduser.component';

/* *******************MODELS******************** */
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule,} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCarouselModule } from '@ngmodule/material-carousel';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {A11yModule} from '@angular/cdk/a11y';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


/* ********************************************* */

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    MainpageComponent,
    AuthComponent,
    SignupComponent,
    SigninComponent,
    CodePatientPopupComponent,
    FooterComponent,
    ClientpageComponent,
    AdminComponent,
    UsersComponent,
    AdduserComponent,
    ResultatComponent,
    EditComponent,
    OneResultPageComponent,
    ErrorComponent,
    ContactusComponent,
    ResultatsUserComponent,
    AdminLoginComponent,
    AddadminComponent,
    SuccesComponent,
    AboutusComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatCarouselModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    MatSidenavModule,
    A11yModule,
    MatSortModule,
    MatSnackBarModule,
    MatListModule,
    MatAutocompleteModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorAdmin,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true},

  ],
  bootstrap: [AppComponent],
  entryComponents:[ErrorComponent]
})
export class AppModule { }
