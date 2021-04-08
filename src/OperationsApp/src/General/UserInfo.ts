import { Injectable } from '@angular/core';

@Injectable()
export class UserInfo{
    Token: string;
    TokenExpiration:Date = new Date();
    user:User = new User();
}

export class User{
    Userid:number;
    FullName:string;
    EnglishLevel:string;
    KnowlEdge:string;
    InsertDate:Date;
    UrlResume:string;
    isActive:boolean;
    Roleid:number;
    Email:string;
    Salt:string;
    UserLogin:string;
    Password:string;
}