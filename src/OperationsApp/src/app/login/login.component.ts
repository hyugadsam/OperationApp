import { ServiceClass } from '../../Services/ServiceClass';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Globals } from '../../General/Globals';
import {Methods} from '../../General/Enumerators';
import { UserInfo } from 'src/General/UserInfo';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm:FormGroup;
  
  constructor(private logging:ServiceClass,
    private fb:FormBuilder,
    private _globals: Globals) {
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      UserName: new FormControl({ value: '', disabled: false }, [Validators.required]),
      Password: new FormControl({ value: '', disabled: false }, [Validators.required])
  });
  }

  onClick(){
    if (this.myForm.invalid){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Please enter your credentials',
        showConfirmButton: false,
        timer: 2500
      });
      return;
    }

    const request = {
        Username: this.myForm.value.UserName,
        Password: this.myForm.value.Password,
    };

    this.logging.LoginMethod(Methods.Authenticate.toString(), request).toPromise().then(r => {
      this.logging.deleteToken();
      //console.log(this._globals.User);
      if(r.isSaved){
          this._globals.User = new UserInfo();
          this._globals.User.Token = r.Token;
          this._globals.User.user = r.UserLogged;

          let fecha:Date = new Date();
          this._globals.User.TokenExpiration = new Date(fecha.getTime() + this._globals.Config.TokenExpirationTime * 60000);
          //console.log(this._globals.User);
          this.logging.setToken();
          this.logging.goTo('/home')
      }
      else{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Incorrect User or Password',
          showConfirmButton: false,
          timer: 2500
        });
      }
      
    })
    .catch(ex =>{
      console.log(ex);
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Error in login',
        showConfirmButton: false,
        timer: 2500
      });
    });

  }

}
