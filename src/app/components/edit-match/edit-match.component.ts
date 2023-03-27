import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-edit-match',
  templateUrl: './edit-match.component.html',
  styleUrls: ['./edit-match.component.css']
})
export class EditMatchComponent implements OnInit {
  matchForm: FormGroup;
  match: any = {};
  // initialisation du id
  id: any;
  matches: any = [];

  constructor(
    private activateRoute: ActivatedRoute ,
    private router:Router,
    private matchService:MatchService) { }

  ngOnInit() {
    // this.matches = JSON.parse(localStorage.getItem("matches") || "[]");
    //get id value from actif path 
    this.id = this.activateRoute.snapshot.paramMap.get("id");
    //Search Object by id
    // for (let i = 0; i < this.matches.length; i++) {
    //   if (this.matches[i].id == this.id) {
    //     this.match = this.matches[i];
    //     break;
    //   }
    // }
    this.matchService.getMatchById(this.id).subscribe(
      (data)=>{this.match=data.findedMatch}
    )
  }
  editMatch(){
    console.log("hello obj",this.match);
    this.matchService.editMatch(this.match).subscribe(
      (response)=>{
        console.log("here msg :" ,response.message);
        this.router.navigate(["admin"]);
      }
    )
   
  };
}



