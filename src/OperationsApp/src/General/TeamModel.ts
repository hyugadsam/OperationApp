import { User } from "./UserInfo";

export class TeamModel{
    Teamid:number;
    Name:string;
    Users:User [] = []
}


export class TeamLogsModel
{
    Teamid:number;
    Name:string;
    DateOfMovement:Date;
    Users:User [] = [];
    NewUsers:User [] = [];
}