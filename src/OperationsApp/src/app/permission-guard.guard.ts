import { Globals } from 'src/General/Globals';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AllRoles } from 'src/General/Enumerators';

@Injectable({
  providedIn: 'root'
})

export class PermissionGuardGuard implements CanActivate {
  constructor(private _globals:Globals){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
    switch(this._globals.User?.user?.Roleid){
      case AllRoles.SuperAdmin:
      case AllRoles.Admin:
      {
        let result:boolean = false;
        this._globals.AdminPermisions.forEach(p =>
          {
            if(route.routeConfig.path.trim().toLowerCase().startsWith(p.trim().toLowerCase()) )
            {
              result = true;
            }
          });
          
          return result;
      }
      case AllRoles.FinalUser:
      {
        let result:boolean = false;
        this._globals.FinalUserPermisions.every(p =>
          {
            if(route.routeConfig.path.trim().toLowerCase().startsWith(p.trim().toLowerCase()) )
            {
              result = true;
            }
          });
          return result;
      }
      default:
      {
        //Si no tiene rol, no puede acceder
        return false;
      }
    }
    
  }
  
}
