import { User } from './../../General/UserInfo';
import { TeamModel } from 'src/General/TeamModel';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceClass } from 'src/Services/ServiceClass';
import { Methods } from 'src/General/Enumerators';
import { faHandPointLeft, faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  myForm:FormGroup;
  TeamToEdit:TeamModel = new TeamModel();
  Users:User[];
  Searched:boolean = false;
  faHandPointLeft = faHandPointLeft;
  faHandPointRight = faHandPointRight;
  
  constructor(private Url:ActivatedRoute,
    private fb:FormBuilder,
    private service:ServiceClass) { 

    }

  ngOnInit(): void {
    this.Url.params.subscribe(params =>{
      if(this.Searched) //Solo se busque el usuario la primera vez
          return;

      this.TeamToEdit.Teamid=params?.Teamid <= 0 ? 0 : params?.Teamid;

      this.myForm = this.fb.group({
        Name: new FormControl({ value: this.TeamToEdit.Name, disabled: false }, [Validators.required])
      });

      this.service.ConsumeWebMethod('Get', Methods.GetUsers ).subscribe(u => 
        {
          //console.log(this.TeamToEdit);
          if(u != null && u.isSaved)
          {
              this.Users = u.UsersList;
          }

          if(this.TeamToEdit.Teamid > 0)
          {
              this.service.ConsumeWebMethod('Get', Methods.GetTeam, {Teamid: this.TeamToEdit.Teamid} ).subscribe(r => 
              {
                console.log(r);
                this.TeamToEdit = new TeamModel();
                if(r != null && r.isSaved)
                {
                    this.TeamToEdit = r.Teams[0];
                    this.TeamToEdit.Users = this.TeamToEdit.Users?.length == 0 ? [] : this.TeamToEdit.Users;

                    this.myForm = this.fb.group({
                      Name: new FormControl({ value: this.TeamToEdit.Name, disabled: false }, [Validators.required])
                    });

                    this.TeamToEdit.Users.forEach(element => {
                      const index = this.Users.findIndex( i => i.Userid == element.Userid);
                      if (index > -1) {
                        this.Users.splice(index, 1);
                      }
                    });

                }

              });
          }

          this.Searched=true; //Instanciamos para que ya no busque si activa el metodo de params
          
        });

    });

  }


  onClick(){
    if(this.myForm.invalid){
      this.ShowMessageError('Please fill all the required fields');
      this.myForm.controls.Name.markAllAsTouched();
      return;
    }

    if(this.validateForm()){
      return;
    }

    const UsersArray:number[] = Array.from(this.TeamToEdit.Users, x => x.Userid);

    const request = {
      Teamid : this.TeamToEdit.Teamid,
      TeamName : this.myForm.controls.Name.value,
      Users : UsersArray
    };

    this.service.ConsumeWebMethod('Post', Methods.SaveTeam, request).subscribe(r =>{
      console.log(r);
      if(r != null && r.isSaved){
        this.ShowSuccessMesasge('Team Saved');
        this.service.goTo('/teams');
        return;
      }else if (r!= null && r.Message != ''){
        this.ShowMessageError(r.Message);
      }else{
        this.ShowMessageError('Error saving team');
      }
    });


  }

  validateForm():boolean{
    if (this.TeamToEdit.Users?.length == 0){
      this.ShowMessageError('Select at least one user for this team');
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

  Cancel(){
    this.service.goTo('/teams');
  }

  AddTeamUser(index:number){
    if(this.TeamToEdit?.Users == null){
      this.TeamToEdit.Users = []; //Instanciar lista para la creacion de equipos
    }
    let user = this.Users[index];
    this.TeamToEdit.Users.push(user);
    this.Users.splice(index,1);
  }

  RemoveTeamUser(index:number){
    let user = this.TeamToEdit.Users[index];
    this.Users.push(user);
    this.TeamToEdit.Users.splice(index, 1);
  }

  Delete(){
    if(this.TeamToEdit.Teamid <= 0)
      return;
    
    Swal.fire({
      title: 'Are you sure about that?',
      text: 'You will not be able to recover this Team!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.onDeleteEvent();
        //this.ShowSuccessMesasge('Your imaginary file has been deleted.');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.ShowMessageError('Your Team is safe');
      }
    });

  }

  onDeleteEvent(){
    this.service.ConsumeWebMethod('Delete', Methods.DeleteTeam, {Teamid : this.TeamToEdit.Teamid}).toPromise()
    .then(response =>{
      if(response?.isSaved)
      {
        this.ShowSuccessMesasge('Your Team has been deleted.');
        this.service.goTo('/teams');
      }else if(response != null)
      {
        this.ShowMessageError(response.Message);
      }else{
        this.ShowMessageError('Error on delete Team');
      }
    })
    .catch(ex =>{
      console.log(ex);
      this.ShowMessageError('Error on delete Team ex');
    });
  }


}
