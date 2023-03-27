import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  msgError:string;

  constructor(
    private router:Router,
    private formBuilder:FormBuilder,
    private userService: UserServiceService) { }

  ngOnInit() {
    this.loginForm=this.formBuilder.group({
      
      email:["", [ Validators.required , Validators.email] ],
      password:["", [Validators.required]],
    })
  }

  login(){
   
    //methode1
    // let usersTab = JSON.parse(localStorage.getItem("users" )|| "[]");
    // for (let i = 0; i < usersTab.length; i++) {
    //   if (usersTab[i].email==this.loginForm.value.email
    //     && usersTab[i].password==this.loginForm.value.password) {
    //    (usersTab[i].role=="admin")?
    //    this.router.navigate(["admin"]):
    //    this.router.navigate([" "]);
    //   } else {
    //     alert("user not found");
    //   }
      
    // }

    //methode 2 
    // this.userService.login(object).subscribe(
    //   (response)=>{
    //     console.log("resp after login",response);
    //     if (response.message=="2") {
    //       localStorage.setItem("connectedUser",response.user.id);
    //       if (response.user.role=="admin") {
    //         this.router.navigate(["admin"]);
    //       } else {
    //       this.router.navigate([" "]);
    //       }
    //     } else {
    //       this.msgError="please check Email/PWD"
    //     }
        
    //   }
    // );
    
    let user=this.loginForm.value;
    console.log("here is obj from formulaire",user);
    this.userService.login(user);
  }

}
