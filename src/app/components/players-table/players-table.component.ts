import { Component, OnInit } from '@angular/core';
import { PlayerServiceService } from 'src/app/services/player-service.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit {
  //recupuration of in the new version will be in the line 21 and 28
  // players:any=[
  //   {id:1,age:23,name:"messi",position:"AR-G",number:11},
  //   {id:2,age:33,name:"ISR",position:"AR-G",number:11},
  //   {id:3,age:43,name:"ikram",position:"AR-G",number:11},
  //   {id:4,age:53,name:"CR",position:"AR-G",number:11},

  // ];
  
  playersTab:any=[];

  constructor(
    private router:Router,
    private playerService: PlayerServiceService
  ) { }

  ngOnInit() { 
    //recupuration automatique du data dés qu'on lance la page
    this.playerService.getAllPlayers().subscribe(
      (response)=> {this.playersTab =response.players})
      
  }
  displayPlayers(id:number){
    alert("Display player N°" +id );
    this.router.navigate([`playerInfo/${id}`]);
  }
 editPlayers(x:number){
    alert("Display player N°" +x );
  }
  deletePlayers(x:number){
    alert("Display player N°" +x );
  }


}
