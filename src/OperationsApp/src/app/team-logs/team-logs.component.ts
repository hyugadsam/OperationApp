import { Methods } from 'src/General/Enumerators';
import { ServiceClass } from 'src/Services/ServiceClass';
import { TeamLogsModel } from './../../General/TeamModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-logs',
  templateUrl: './team-logs.component.html',
  styleUrls: ['./team-logs.component.css']
})
export class TeamLogsComponent implements OnInit {
TeamLogs:TeamLogsModel[]=[];
Log:TeamLogsModel=null;
term:string='';

  constructor(private service:ServiceClass) { 

  }

  ngOnInit(): void {
    this.service.ConsumeWebMethod('Get', Methods.GetTeamsLogs).toPromise()
    .then(response => {
      //console.log(response);
      if(response?.isSaved){
        this.TeamLogs = response.Logs;
      }
    })
    .catch(ex =>{
      console.log(ex);
    });

  }

  onClick(team:TeamLogsModel){
    this.Log = team;
  }

  onGoBack(param:any){
    console.log(param);
    this.Log = null;
  }

}
