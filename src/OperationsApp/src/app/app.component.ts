import { UserInfo } from 'src/General/UserInfo';
import { Globals } from './../General/Globals';
import { Component } from '@angular/core';
import { ServiceClass } from 'src/Services/ServiceClass';
import { AllRoles } from 'src/General/Enumerators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Operations Site';
  AdminPermisions:string[];
  FinalUserPermisions:string[];
  RouterClass:string = 'col-md-12';

  constructor(private service:ServiceClass,
              private _globals:Globals)
  {
    this.AdminPermisions = ['Accounts', 'Teams', 'Users', 'Profile', 'TeamLogs']
    this.FinalUserPermisions = ['Profile']
  }


  HasPermission(Page: string):boolean{
    switch(this._globals.User?.user?.Roleid){
      case AllRoles.SuperAdmin:
      case AllRoles.Admin:
      {
        return this.AdminPermisions.includes(Page);
      }
      case AllRoles.FinalUser:
      {
        return this.FinalUserPermisions.includes(Page);
      }
      default:
      {
        //Si no tiene rol, no puede acceder
        return false;
      }
    }
  }

  IsLoginView(){
    let ruta:string = this.service.GetRoute();
    let isLogin:boolean = ruta.includes('login');
    this.RouterClass = isLogin ? 'col-md-12' : 'col-md-10';
    return isLogin;
  }

  LogOut(){
    this._globals.User = new UserInfo(); //Borramos los datos del usuarios
    this.service.goTo('/login');
  }


}

