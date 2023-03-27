import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';


@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.css']
})
export class MatchInfoComponent implements OnInit {
  match: any = {};
  // initialisation du id
  id: any;
  matches: any = [];

  //activateRoute : pour la gestion des pages actifs
  constructor(
    private activateRoute: ActivatedRoute,
    private matchService: MatchService) { }

  ngOnInit() {
    //get all matchess from localSorage
    // this.matches = JSON.parse(localStorage.getItem("matches") || "[]");
    //Search Object by id
    // for (let i = 0; i < this.matches.length; i++) {
    //   if (this.matches[i].id==this.id) {
    //     this.match = this.matches[i];
    //     break;
    //   }
    // }

    //get id value from actif path 
    this.id = this.activateRoute.snapshot.paramMap.get("id");
    this.matchService.getMatchById(this.id).subscribe(
      (data) => { this.match = data.findedMatch }
    )
  }

}
