import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-matches-table',
  templateUrl: './matches-table.component.html',
  styleUrls: ['./matches-table.component.css']
})
export class MatchesTableComponent implements OnInit {

  matches:any=[];

  constructor(
    private router:Router,
    private matchService:MatchService) { }

  ngOnInit() {
    // this.matches = JSON.parse(localStorage.getItem("matches") || "[]");
    this.matchService.getAllMatches().subscribe(
      (data)=>{ this.matches=data.matches}
    );

  }
  displayMatches(x:number){
    this.router.navigate([`matchInfo/${x}`]);
  }
  goToEdit(id:number){
  this.router.navigate([`editMatch/${id}`]);
  }

  deleteMatchById(id:number){
    alert("Display matches N°" +id );
    // for (let i = 0; i < this.matches.length; i++) {
    //   if (this.matches[i].id==id) {
    //     this.matches.splice(i, 1);
    //     break;
    //   }
    // }
    // localStorage.setItem("matches", JSON.stringify(this.matches));
  this.matchService.deleteMatchById(id).subscribe(
    (data)=>{
      console.log("here is resp after delete", data.message);
      this.matchService.getAllMatches().subscribe(
        (data)=>{ this.matches=data.matches}
      );
    }
  )
  
  
  }
}
