import { Injectable, NgModule } from '@angular/core';
import { Globals } from '../General/Globals';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

//import { catchError, map } from 'rxjs/operators';


@Injectable()
export class ServiceClass{

    headerOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=UTF-8'
        })
      };

    constructor(private _globals: Globals,
      private http:HttpClient,
      private router:Router,
      private cookieService: CookieService){

    }

    LoginMethod(Method:string, parameters: any): Observable<any> {
        return this.http.post<any>(this._globals.Config.UrlService + Method, parameters, this.headerOptions);
    }

    goTo(ruta:string){
      this.router.navigate([ruta]);
    }

    GetRoute():string{
      //console.log(this.router.url);
      return this.router.url;
    }


    ConsumeWebMethod(Petition:string, Method:string, parameters?: any): Observable<any> {
        let header = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json; charset=UTF-8',
              'Authorization': 'Bearer ' + this._globals.User.Token,
              'cache-control': 'no-cache'
            })
        };

        switch(Petition){
          case 'Get':{
            let params:string = this.toParamsString(parameters);
            //console.log(params);
            return this.http.get<any>(this._globals.Config.UrlService + Method + params, header);
          }
          case 'Post':{
            return this.http.post<any>(this._globals.Config.UrlService + Method, parameters, header);
          }
          case 'Delete':{
            let params:string = this.toParamsString(parameters);
            return this.http.delete<any>(this._globals.Config.UrlService + Method + params, header);
          }
          default:{
            console.log('Method Type not supported');
            return null;
          }
        }

        //return this.http.post<any>(this._globals.Config.UrlService , parameters, this.headerOptions);
        //.pipe(map(data => data, catchError(this.handleLoginError));
    }

    toParamsString(o:any):string
    {
      let str: string = '?';
      if(o == null)
        return '';

      Object.keys(o).forEach(k => {
        if (typeof o[k] === 'object') {
          return '';
        }
        
        str += k + '=' + o[k] + '&';
      });

      return str;
    }


    deleteToken() {
      this.cookieService.delete(this._globals.Config.CookieName);
    }
  
    setToken() {
      this.cookieService.set(this._globals.Config.CookieName, JSON.stringify(this._globals.User), this._globals.User.TokenExpiration, '/');
    }
  
    getToken(): boolean 
    {
      try{
        if (this.cookieService.check(this._globals.Config.CookieName)) 
        {
          this._globals.User = JSON.parse(this.cookieService.get(this._globals.Config.CookieName));
          return true;
        }
        else
        {
          return false;
        }
      }
      catch(ex){
        console.log(ex);
      }

    }

    validateToken(): boolean {
      
      if (this.cookieService.check(this._globals.Config.CookieName)) {
        return true;
      } else {
        
        this,this.deleteToken();
        return false;
      }
    }
    
}