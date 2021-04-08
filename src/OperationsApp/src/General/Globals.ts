import { UserInfo } from './UserInfo';
import { Injectable } from '@angular/core';
import { AppConfiguration } from './AppConfiguration';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class Globals{
    Config: AppConfiguration = new AppConfiguration();
    User:UserInfo = new UserInfo();

    constructor(private http: HttpClient){

        const jsonFile:string = './webConfig.json';
        this.http.get(jsonFile).toPromise().then((response: any) => {
            this.FillConfig(response);
        }).catch(error => {
            console.log(error);
        });

    }

    FillConfig(obj: any){
        if(obj == null)
            return;

        Object.keys(obj).forEach(key => {
            if (this.Config.hasOwnProperty(key)) {
                this.Config[key] = obj[key];
            }
        });

    }

}