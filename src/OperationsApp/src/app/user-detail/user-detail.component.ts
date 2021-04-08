import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FunctionalRoles, FunctionalRolesNames, Methods } from 'src/General/Enumerators';
import { User } from 'src/General/UserInfo';
import { ServiceClass } from 'src/Services/ServiceClass';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  myForm:FormGroup;
  userToEdit:User = new User();
  Searched:boolean = false;
  Roles:FunctionalRoles[];
  public FunctionalRolesNames = FunctionalRolesNames;

  constructor(private Url:ActivatedRoute,
    private fb:FormBuilder,
    private service:ServiceClass) {
      //Code
      this.Roles = [ FunctionalRoles.Admin, FunctionalRoles.FinalUser];
   }

  ngOnInit(): void {
    this.Url.params.subscribe(params =>{
      if(this.Searched) //Solo se busque el usuario la primera vez
          return;

      this.userToEdit.Userid=params?.Userid <= 0 ? 0 : params?.Userid;

      this.FillFormForNew();

      if(this.userToEdit.Userid > 0){
          this.service.ConsumeWebMethod('Get', Methods.GetUser, {id: this.userToEdit.Userid} ).toPromise()
          .then(r => {
            this.userToEdit = new User();
            if(r != null && r.isSaved){
                this.userToEdit = r.UsersList[0];

                this.FillFormForEdit();

                setTimeout(() => {
                  console.log('timeOut');
                  this.myForm.controls.UserLogin.disable();
                  this.myForm.controls.Password.clearValidators();
                  this.myForm.controls.ConfirmPassword.clearValidators();
                  this.myForm.controls.Password.clearAsyncValidators()
                  this.myForm.controls.ConfirmPassword.clearAsyncValidators();
                  console.log('timeOut2');
                }, 400);

            }else{
              this.userToEdit.Userid = 0;
            }
          })
          .catch(ex =>{
            console.log(ex);
          });
      }

      this.Searched=true; //Instanciamos para que ya no busque si activa el metodo de params

    });
    
  }

  FillFormForEdit(){
    this.myForm = null;
    this.myForm = this.fb.group({
      FullName: new FormControl({ value: this.userToEdit.FullName, disabled: false }, [Validators.required]),
      Email: new FormControl({ value: this.userToEdit.Email, disabled: false }, [Validators.required]),
      Roleid: new FormControl({ value: this.userToEdit.Roleid, disabled: false }, [Validators.required]),
      UserLogin: new FormControl({ value: this.userToEdit.UserLogin, disabled: true }),
      Password: new FormControl({ value: '', disabled: false }),
      ConfirmPassword: new FormControl({ value: '', disabled: false }),
    });
  }

  FillFormForNew(){
    
    this.myForm = this.fb.group({
      FullName: new FormControl({ value: this.userToEdit.FullName, disabled: false }, [Validators.required]),
      Email: new FormControl({ value: this.userToEdit.Email, disabled: false }, [Validators.required]),
      Roleid: new FormControl({ value: this.userToEdit.Roleid, disabled: false }, [Validators.required]),
      UserLogin: new FormControl({ value: this.userToEdit.UserLogin, disabled: false }),
      Password: new FormControl({ value: '', disabled: false }, [Validators.required]),
      ConfirmPassword: new FormControl({ value: '', disabled: false }, [Validators.required]),
    });
  }

  onClick(){
    console.log(this.myForm);
    if (this.myForm.invalid){
      this.ShowMessageError('Please fill all the required fields');
      this.MarkFields();
      return;
    }
    
    if(this.ValidateInfo()){
      this.MarkFields();
      return;
    }

    this.userToEdit.Email = this.myForm.controls.Email.value;
    this.userToEdit.Password = this.myForm.controls.Password.value;
    this.userToEdit.FullName = this.myForm.controls.FullName.value;
    this.userToEdit.UserLogin = this.myForm.controls.UserLogin.value;
    this.userToEdit.Roleid = this.myForm.controls.Roleid.value;
    
    const request = {
      UserInfo: this.userToEdit,
      HasNewPassword : this.myForm.controls.ConfirmPassword.value != ''
    };


    this.service.ConsumeWebMethod('Post', Methods.SaveUser,  request).toPromise()
    .then(response =>{
      if(response != null && response.isSaved){
        this.ShowSuccessMesasge('User Saved');
        this.service.goTo('/users');
        return;
      }
      else{
        this.ShowMessageError('Error trying update/save user');
      }
    })
    .catch(error =>{
      console.log(error);
    });
    
  }

  ValidateInfo():boolean{

    if ( (this.myForm.controls.Password.value != '' && this.myForm.controls.ConfirmPassword.value == '') || //Campos llenos
    (this.myForm.controls.Password.value == '' && this.myForm.controls.ConfirmPassword.value != '') ){
      this.ShowMessageError('Fill Password and the Confirmation Password');
      return true;
    }
    else if (this.myForm.controls.Password.value != '' && this.myForm.controls.ConfirmPassword.value != '' &&
            this.myForm.controls.Password.value != this.myForm.controls.ConfirmPassword.value){
      this.ShowMessageError('Password and the Confirmation Password must match');
      return true;
    }

    return false;
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

  MarkFields(){
      this.myForm.controls.FullName.markAsTouched();
      this.myForm.controls.Password.markAsTouched();
      this.myForm.controls.ConfirmPassword.markAsTouched();
      this.myForm.controls.Roleid.markAsTouched();
      this.myForm.controls.UserLogin.markAsTouched();
      this.myForm.controls.Email.markAsTouched();
  }


  Cancel(){
    this.service.goTo('/users');
  }

  Delete(){
    if(this.userToEdit.Userid <= 0)
      return;
    
    Swal.fire({
      title: 'Are you sure about that?',
      text: 'You will not be able to recover this User!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.onDeleteEvent();
        //this.ShowSuccessMesasge('Your imaginary file has been deleted.');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.ShowMessageError('Your User is safe');
      }
    });

  }

  onDeleteEvent(){
    this.service.ConsumeWebMethod('Delete', Methods.DeleteUser, {Userid : this.userToEdit.Userid}).toPromise()
    .then(response =>{
      if(response?.isSaved)
      {
        this.ShowSuccessMesasge('Your User has been deleted.');
        this.service.goTo('/users');
      }else if(response != null)
      {
        this.ShowMessageError(response.Message);
      }else{
        this.ShowMessageError('Error on delete User');
      }
    })
    .catch(ex =>{
      console.log(ex);
      this.ShowMessageError('Error on delete User ex');
    });
  }




}
