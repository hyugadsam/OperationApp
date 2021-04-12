import { UserInfo } from 'src/General/UserInfo';
import { Globals } from './../General/Globals';
import { Component, OnInit } from '@angular/core';
import { ServiceClass } from 'src/Services/ServiceClass';
import { AllRoles } from 'src/General/Enumerators';
import { WebConfig } from 'src/Services/webconfig.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Operations Site';
  
  RouterClass:string = 'col-md-12';

  constructor(private service:ServiceClass,
              private _globals:Globals,
              private webc: WebConfig)
  {

  }

  ngOnInit(){
    this._globals.FillConfig(this.webc.getSettings());
    if(this.service.getToken()){
      this.service.goTo('/home');
    }else{
      this.service.goTo('/login');
    }

    setInterval(() => {
      // console.log('Timer Session')
      if(!this.service.validateToken()){
        this.service.goTo('/login');
      }
    }, this._globals.Config.MinCheckCookie * 60000);
  }


  HasPermission(Page: string):boolean{
    //return true;
    switch(this._globals.User?.user?.Roleid){
      case AllRoles.SuperAdmin:
      case AllRoles.Admin:
      {
        return this._globals.AdminPermisions.includes(Page);
      }
      case AllRoles.FinalUser:
      {
        return this._globals.FinalUserPermisions.includes(Page);
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
    this.service.deleteToken();
    this._globals.User = new UserInfo(); //Borramos los datos del usuarios
    this.service.goTo('/login');
  }


}

