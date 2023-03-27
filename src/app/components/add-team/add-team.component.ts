import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TeamService } from 'src/app/services/team.service';



@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  //form id 
  teamForm:FormGroup;
  team:any={};

  constructor(
    private teamService:TeamService
  ) { }

  ngOnInit() {
  }

  addTeam(){
    console.log("Here team object", this.team );
    return this.teamService.addTeam(this.team).subscribe(
      (data)=>{
        console.log("here is resp afer adding", data.message);
        
      }
    );
    
      }

}
