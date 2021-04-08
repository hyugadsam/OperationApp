import { ServiceClass } from 'src/Services/ServiceClass';
import { Component, OnInit } from '@angular/core';
import { TeamModel } from 'src/General/TeamModel';
import { Methods } from 'src/General/Enumerators';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  Teams:TeamModel[];

  constructor(private service:ServiceClass) { 

  }

  ngOnInit(): void {
    this.service.ConsumeWebMethod('Get', Methods.GetAllTeams, null).subscribe(r =>{
      //console.log(r);
      if(r != null && r.isSaved == true){
          this.Teams = r.Teams;
      }

    });
  }


  onClick(TeamId: number){
    this.service.goTo('/teamDetail/' + TeamId);
  }

  
}
