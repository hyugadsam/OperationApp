import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ServiceClass } from '../Services/ServiceClass';
import { Globals } from '../General/Globals';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserInfo } from 'src/General/UserInfo';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TeamLogsComponent } from './team-logs/team-logs.component';
import { TeamLogDetailComponent } from './team-log-detail/team-log-detail.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UsersComponent,
    UserDetailComponent,
    UserProfileComponent,
    AccountsComponent,
    AccountDetailComponent,
    TeamsComponent,
    TeamDetailComponent,
    TeamLogsComponent,
    TeamLogDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    Ng2SearchPipeModule
  ],
  providers: [
    ServiceClass,
    Globals,
    UserInfo
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
