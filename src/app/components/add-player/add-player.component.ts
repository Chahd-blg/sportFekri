import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerServiceService } from 'src/app/services/player-service.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {

  playerForm: FormGroup;
  player: any = {};
  constructor(
    private playerService: PlayerServiceService,
    //router thezna men page vers une autre page 
    private router:Router
  ) { }

  ngOnInit() {
  }
  addPlayer() {
    console.log("Here player object", this.player);
    this.playerService.addPlayer(this.player).subscribe(
      (data)=>{
        console.log("here is response after adding ",data.message)
       this.router.navigate(["admin"])
      })
  }
}
