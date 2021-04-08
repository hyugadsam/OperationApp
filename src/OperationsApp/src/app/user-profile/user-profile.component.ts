import { User } from './../../General/UserInfo';
import { ServiceClass } from 'src/Services/ServiceClass';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Globals } from 'src/General/Globals';
import {Methods} from '../../General/Enumerators';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  myForm:FormGroup;
  userToEdit:User = new User();
  
  
  constructor(private fb:FormBuilder,
    private service:ServiceClass,
    private _globals: Globals) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      FullName: new FormControl({ value: this.userToEdit.FullName, disabled: false }, [Validators.required]),
      EnglishLevel: new FormControl({ value: this.userToEdit.EnglishLevel, disabled: false }, [Validators.required]),
      KnowlEdge: new FormControl({ value: this.userToEdit.KnowlEdge, disabled: false }, [Validators.required]),
      UrlResume: new FormControl({ value: this.userToEdit.UrlResume, disabled: false }, [Validators.required]),
      Email: new FormControl({ value: this.userToEdit.Email, disabled: true }, [Validators.required]),
    });
    // console.log('Profile');
    // console.log(this._globals.User.user.Userid);

    this.service.ConsumeWebMethod('Get', Methods.GetUser, {id: this._globals.User.user.Userid}, ).subscribe(r => {
        this.userToEdit = new User();
        if(r != null && r.isSaved){
            this.userToEdit = r.UsersList[0];

            console.log(r.UsersList[0]);
            
            this.myForm = this.fb.group({
              FullName: new FormControl({ value: this.userToEdit.FullName, disabled: false }, [Validators.required]),
              EnglishLevel: new FormControl({ value: this.userToEdit.EnglishLevel, disabled: false }, [Validators.required]),
              KnowlEdge: new FormControl({ value: this.userToEdit.KnowlEdge, disabled: false }, [Validators.required]),
              UrlResume: new FormControl({ value: this.userToEdit.UrlResume, disabled: false }, [Validators.required]),
              Email: new FormControl({ value: this.userToEdit.Email, disabled: true }, [Validators.required]),
            });

        }
    });
    
  }

  onClick(){
    if (this.myForm.invalid){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Please fill all the required fields',
        showConfirmButton: false,
        timer: 2500
      });
      this.myForm.controls.FullName.markAsTouched();
      this.myForm.controls.EnglishLevel.markAsTouched();
      this.myForm.controls.KnowlEdge.markAsTouched();
      this.myForm.controls.UrlResume.markAsTouched();
      this.myForm.controls.Email.markAsTouched();
      return;
    }
    this.userToEdit.Email = this.myForm.controls.Email.value;
    this.userToEdit.EnglishLevel = this.myForm.controls.EnglishLevel.value;
    this.userToEdit.FullName = this.myForm.controls.FullName.value;
    this.userToEdit.KnowlEdge = this.myForm.controls.KnowlEdge.value;
    this.userToEdit.UrlResume = this.myForm.controls.UrlResume.value;

    const request = {
      UserInfo: this.userToEdit
    };

    this.service.ConsumeWebMethod('Post', Methods.UpdatePersonalInfo, request).subscribe(r => {
      //console.log(r);
      if(r != null && r.isSaved){
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Update Success',
          showConfirmButton: false,
          timer: 2500
        });
        this.service.goTo('/profile');
      }else{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Error trying to update profile',
          showConfirmButton: false,
          timer: 2500
        });
      }

    });
  }

  Cancel(){
    this.service.goTo('/home');
  }



}
