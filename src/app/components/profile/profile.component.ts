import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profilForm: FormGroup
  user: any = {};
  id: any;

  constructor(
    private router: Router,
    private userService: UserServiceService,
  ) { }

  ngOnInit() {
    this.id = localStorage.getItem('UserId');

    console.log("here the id", this.id);
    this.userService.getUserInfo(this.id).subscribe(
      (doc)=>{
        this.user = doc.findedUser
        console.log("here is userinfo",doc.findedUser);
        
      },
    )
  };

  editProfile(){
    console.log("hello obj",this.user);
    this.userService.editProfile(this.user).subscribe(
      (response)=>{
      
      }
    )

  };

 }
