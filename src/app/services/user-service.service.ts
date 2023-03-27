import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
// import {jwt} from 'jsonwebtoken';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  userUrl: string = "http://localhost:3000/allUsers";

  public token: string
  //subject will emit boolean values indicating whether the user is currently authenticated or not.
  private authStatusListener = new Subject<boolean>();
  private isUserAuthenticated = false;
  private name: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }
  
  getToken() {
    return this.token;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  isUserAuth() {
    return this.isUserAuthenticated;
  }
  getName() {
    return this.name;
  }

  // login(user) {
  //   return this.httpClient.post<{ message: string, user: any }>(this.userUrl + "/signin", user);
  // }
  

  login(user) {
    this.httpClient.post<{ user: any, message: string }>(this.userUrl + "/signin", user).subscribe(
      (res) => {
        const token = res.user.jwt;
        this.token = token;
        // Decode the JWT token
        // const decodedToken = jwt.decode(token);
        // console.log("here into decoded token",decodedToken );
        
        
        if (res.user) {
          this.isUserAuthenticated = true;
          this.name = res.user.firstName;
          this.authStatusListener.next(true);
          localStorage.setItem('token', token);
          localStorage.setItem('name', res.user.firstName);
          localStorage.setItem('UserId', res.user.id);
          (res.user.role == "admin")?
          this.router.navigate(['admin']):
          this.router.navigate([""])

          // if (res.user.role == "admin") {
          // this.router.navigate(['admin']);
          // } else {
          //   this.router.navigate([" "]);
          // }
          // this.router.navigate(['/']);
        }
      }
    )
  }

  signup(user, img: File) {
    let formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("img", img);

    return this.httpClient.post<{ message: string }>(this.userUrl + "/subscription", formData);
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    this.isUserAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }

  getUserInfo(id){
    return this.httpClient.get<{findedUser:any}>(`${this.userUrl}/${id}`);
  }

 

  editProfile(newUser) {
    return this.httpClient.put<{message:string}>(this.userUrl, newUser);

  }

}
