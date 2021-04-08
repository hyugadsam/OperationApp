import { Methods } from './../../General/Enumerators';
import { ServiceClass } from 'src/Services/ServiceClass';
import { AccountModel } from './../../General/AccountModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})

export class AccountsComponent implements OnInit {
Accounts:AccountModel[];

  constructor(private services:ServiceClass) {

  }

  ngOnInit(): void {
    this.services.ConsumeWebMethod('Get', Methods.GetAllAccounts).subscribe(r =>{
      if(r != null && r.isSaved){
        this.Accounts = r.Accounts;
      }
    });

  }


  onClick(Accountid:number){
    this.services.goTo('/accountDetail/'+Accountid);
  }

}
