import { Methods } from 'src/General/Enumerators';
import { AccountModel } from './../../General/AccountModel';
import { TeamModel } from 'src/General/TeamModel';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceClass } from 'src/Services/ServiceClass';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {
  myForm:FormGroup;
  Teams:TeamModel [] = [];
  Searched:boolean = false;
  AccountToEdit:AccountModel = new AccountModel();
  
  constructor(private Url:ActivatedRoute,
    private fb:FormBuilder,
    private service:ServiceClass) {
      
    }

  ngOnInit(): void {
    this.initialiceForm();
    this.Url.params.subscribe(params =>{
      if(this.Searched) //Solo se busque el detalle la primera vez
          return;

      this.AccountToEdit.Accountid=params?.Accountid <= 0 ? 0 : params?.Accountid;

      this.service.ConsumeWebMethod('Get', Methods.GetAllTeams).toPromise().then( TeamsResponse=> {
          if(TeamsResponse?.isSaved){
            this.Teams = TeamsResponse.Teams;
          }
      }) //End then
      .finally(() =>{
        this.Searched = true;
        if(this.AccountToEdit.Accountid > 0)
        {
          this.service.ConsumeWebMethod('Get', Methods.GetAccount, { Accountid: this.AccountToEdit.Accountid}).toPromise().then(AccountResponse =>{
            //FillForm
            if(AccountResponse?.isSaved){
              this.AccountToEdit = AccountResponse.Accounts[0];
              this.initialiceForm();
            }
          });
        }

      }); //End Finally
      
    }); //End Subscribe

  } //End init

  initialiceForm(){
    this.myForm = this.fb.group({
      AccountName: new FormControl({ value: this.AccountToEdit.AccountName, disabled: false }, [Validators.required]),
      ClientName: new FormControl({ value: this.AccountToEdit.ClientName, disabled: false }, [Validators.required]),
      OperatorName: new FormControl({ value: this.AccountToEdit.OperatorName, disabled: false }, [Validators.required]),
      Teamid: new FormControl({ value: this.AccountToEdit.Teamid, disabled: false }, [Validators.required])
    });
  }


  onClick(){
    if(this.myForm.invalid){
      this.ShowMessageError('Please fill all the required fields');
      return;
    }

    this.AccountToEdit.AccountName = this.myForm.controls.AccountName.value;
    this.AccountToEdit.OperatorName = this.myForm.controls.OperatorName.value;
    this.AccountToEdit.ClientName = this.myForm.controls.ClientName.value;
    this.AccountToEdit.Teamid = this.myForm.controls.Teamid.value;

    this.service.ConsumeWebMethod('Post', Methods.SaveAccount, this.AccountToEdit).toPromise().then(Response =>{
      if(Response?.isSaved){
        this.ShowSuccessMesasge('Account Saved');
        this.service.goTo('/account');
        return;
      }
      else
      {
        this.ShowMessageError('Save Error');
      }

    }).catch(ex =>{
      this.ShowMessageError('Save Error (catch)');
      console.log(ex);
    });

  }

  Cancel(){
    this.service.goTo('/account');
  }

  ShowMessageError(str:string){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: str,
      showConfirmButton: false,
      timer: 2500
    });
  }

  ShowSuccessMesasge(str:string){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: str,
      showConfirmButton: false,
      timer: 2500
    });
  }

  Delete(){
    if(this.AccountToEdit.Accountid <= 0)
      return;
    
    Swal.fire({
      title: 'Are you sure about that?',
      text: 'You will not be able to recover this Account!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.onDeleteEvent();
        //this.ShowSuccessMesasge('Your imaginary file has been deleted.');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.ShowMessageError('Your Account is safe');
      }
    });

  }

  onDeleteEvent(){
    this.service.ConsumeWebMethod('Delete', Methods.DeleteAccount, {Accountid : this.AccountToEdit.Accountid}).toPromise()
    .then(response =>{
      if(response?.isSaved)
      {
        this.ShowSuccessMesasge('Your Account has been deleted.');
        this.service.goTo('/account');
      }else if(response != null)
      {
        this.ShowMessageError(response.Message);
      }else{
        this.ShowMessageError('Error on delete Account');
      }
    })
    .catch(ex =>{
      console.log(ex);
      this.ShowMessageError('Error on delete Account ex');
    });
  }

}
