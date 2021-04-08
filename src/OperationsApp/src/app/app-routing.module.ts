import { TeamLogsComponent } from './team-logs/team-logs.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AccountsComponent } from './accounts/accounts.component';
import { TeamsComponent } from './teams/teams.component';
import { UsersComponent } from './users/users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home' },
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'users', component: UsersComponent},
  {path: 'userDetail/:Userid', component: UserDetailComponent},
  {path: 'teams', component:TeamsComponent},
  {path: 'teamLogs', component:TeamLogsComponent},
  {path: 'teamDetail/:Teamid', component:TeamDetailComponent},
  {path: 'account', component:AccountsComponent},
  {path: 'accountDetail/:Accountid', component:AccountDetailComponent},
  {path: 'profile', component: UserProfileComponent},

  {path:'**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
