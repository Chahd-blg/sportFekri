import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.css']
})
export class TeamsTableComponent implements OnInit {

  teamsTab: any = [];

  constructor(
    private router :Router,
    private teamService: TeamService) { }

  ngOnInit() {
    this.teamService.getAllTeams().subscribe(
      (response) => {
        this.teamsTab = response.teams
      }
    );
  }

  getTeamById(id){
    this.router.navigate([`teamInfo/${id}`]);
  }
  editTeams(x: number) {
    alert("Display team N°" + x);
  }
  deleteTeamById(x: number) {
    alert("Display team N°" + x);
    this.teamService.deleteTeamById(x).subscribe(
      (response) => {
        console.log("here resp after delete", response.message);
        this.teamService.getAllTeams().subscribe(
          (response) => {
            this.teamsTab = response.teams
          });
      }
    );
  }


}
