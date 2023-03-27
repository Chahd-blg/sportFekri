import { Component, OnInit } from '@angular/core';
import { PlayerServiceService } from 'src/app/services/player-service.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.css']
})
export class PlayerInfoComponent implements OnInit {
  player:any={}
  id:any;

  constructor(
    // activateRouter : nest3mlouha pour la recupération de l'id mel path mt3 navigateur dans ce cas 
    private activateRoute: ActivatedRoute,
    private playerService: PlayerServiceService,
  ) { }

  ngOnInit() {
    //nommage du parametre dans ce cas "id" cas dans le app routing on a déclarer ce variable sous le nom de ":id"
    this.id = this.activateRoute.snapshot.paramMap.get("id");
    this.playerService.getPlayerById(this.id).subscribe(
      (data)=>{
       this.player = data.player}
    )
 

  }

}
