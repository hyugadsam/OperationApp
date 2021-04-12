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
import { PermissionGuardGuard } from './permission-guard.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home' },
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'users', component: UsersComponent, canActivate:[PermissionGuardGuard]},
  {path: 'userDetail/:Userid', component: UserDetailComponent, canActivate:[PermissionGuardGuard]},
  {path: 'teams', component:TeamsComponent, canActivate:[PermissionGuardGuard]},
  {path: 'teamLogs', component:TeamLogsComponent, canActivate:[PermissionGuardGuard]},
  {path: 'teamDetail/:Teamid', component:TeamDetailComponent, canActivate:[PermissionGuardGuard]},
  {path: 'account', component:AccountsComponent, canActivate:[PermissionGuardGuard]},
  {path: 'accountDetail/:Accountid', component:AccountDetailComponent, canActivate:[PermissionGuardGuard]},
  {path: 'profile', component: UserProfileComponent, canActivate:[PermissionGuardGuard]},

  {path:'**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
