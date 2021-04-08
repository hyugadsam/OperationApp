import { TeamLogsModel } from './../../General/TeamModel';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-team-log-detail',
  templateUrl: './team-log-detail.component.html',
  styleUrls: ['./team-log-detail.component.css']
})
export class TeamLogDetailComponent implements OnInit {
  @Input() InputLog:TeamLogsModel = new TeamLogsModel();
  @Output() GoBack:EventEmitter<TeamLogsModel>;

  constructor() {
    this.GoBack = new EventEmitter();
   }

  ngOnInit(): void {
    // console.log('this.InputLog');
    // console.log(this.InputLog);
  }

  onClick(){
    this.GoBack.emit(this.InputLog);
  }


}
