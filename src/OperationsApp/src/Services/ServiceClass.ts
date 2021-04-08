import { Injectable, NgModule } from '@angular/core';
import { Globals } from '../General/Globals';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

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
      private router:Router){

    }

    LoginMethod(Method:string, parameters: any): Observable<any> {
        return this.http.post<any>(this._globals.Config.UrlService + Method, parameters, this.headerOptions);
    }

    getToken(): string{
      return this._globals.User.Token;
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
              'Authorization': this.getToken(),
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

    // getData(path: string, body?: object): Observable<CustomResponse> {
        
    //     const headerOptions = {
    //       headers: new HttpHeaders({
    //         'Content-Type': 'application/json; charset=UTF-8',
    //         // 'Authorization': 'Bearer ' + this.getToken(),
    //         'cache-control': 'no-cache'
    //       })
    //     };
    //     return this.http
    //       .post<CustomResponse>(this.globals.externalServiceURL + path, body, headerOptions)
    //       .pipe(
    //         timeout(30000),
    //         map(data => this.customResponse(data)),
    //         catchError(this.handleError)
    //       );
    //   }

    


}