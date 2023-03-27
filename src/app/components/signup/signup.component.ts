import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { generateId } from 'src/app/shared/genericFunctions';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  //form id 
  signupForm: FormGroup;
  user: any = {};
  path: string;
  msgError: string;
  imagePreview:any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserServiceService) { }

  ngOnInit() {
    //recuperation de la path à travers router
    this.path = this.router.url;
    //create form input by formBuilder
    this.signupForm = this.formBuilder.group({
      
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      img: [""]

    })
  }
  //event function the even github
  signup() {
    // if (this.path=="/signupAdmin") {
    //   this.signupForm.value.role= "admin"
    // } else {
    //   this.signupForm.value.role= "user"
    // }
    this.signupForm.value.role = (this.path == "/signupAdmin") ? "admin" : "user";

    //log hedha nel9ah f navigateur
    console.log(this.signupForm.value);
    this.userService.signup(this.signupForm.value, this.signupForm.value.img).subscribe(
      (data) => { console.log("here response from BE", data);
      if (data.message=="ERROR") {
        this.msgError="Email Exist";
      } else {
        this.router.navigate(["signin"])
      }
    })
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
    }

}
