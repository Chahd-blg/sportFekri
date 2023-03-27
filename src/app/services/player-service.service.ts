import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerServiceService {

  playerUrl: string = "http://localhost:3000/players";
  constructor(private httpClient: HttpClient) { }

  addPlayer(player) {
    return this.httpClient.post<{message:string,isadded:boolean}>(this.playerUrl, player);
  }

  editPlayer(newplayer) {
   return  this.httpClient.put(this.playerUrl, newplayer);
  }

  deletePlayerById(id) {
    return this.httpClient.delete(`${this.playerUrl}/${id}`);
  }

  getAllPlayers() {
    return this.httpClient.get<{players:any}>(this.playerUrl);
  }

  getPlayerById(id) {
    return this.httpClient.get<{player:any}>(`${this.playerUrl}/${id}`);
  }
}
