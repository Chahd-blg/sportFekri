import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-allmatches',
  templateUrl: './allmatches.component.html',
  styleUrls: ['./allmatches.component.css']
})
export class AllmatchesComponent implements OnInit {

  // actualDate:any = new Date ();
  // title string="all matches"
  matchesTab: any = [];
  //appel à l'instance du sevice matches
  constructor(
    private matchService: MatchService
  ) { }

  ngOnInit() {
    // this.matchesTab = JSON.parse(localStorage.getItem("matches") || "[]");
    this.matchService.getAllMatches().subscribe(
      (response) => { this.matchesTab = response.matches });
  }
  updateMatches(objs: any) {
    this.matchesTab = objs;
  }

}
