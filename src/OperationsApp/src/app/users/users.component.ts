import { User } from './../../General/UserInfo';
import { Component, OnInit } from '@angular/core';
import { ServiceClass } from 'src/Services/ServiceClass';
import { Methods } from 'src/General/Enumerators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
Users:User[];
  constructor(private service:ServiceClass) { 

    }

  ngOnInit(): void {
    this.service.ConsumeWebMethod('Get', Methods.GetUsers, null).subscribe(r =>{
      //console.log(r);
      if(r != null && r.isSaved == true){
          this.Users = r.UsersList;
      }
    });

  }

  onClick(UserId: number){
    this.service.goTo('/userDetail/' + UserId);
  }

}
