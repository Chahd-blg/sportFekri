import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  teamUrl: string="http://localhost:3000/teams";

  constructor( 
    private httpClient:HttpClient) { }

addTeam(teamObj){
  return this.httpClient.post<{message:string}>(this.teamUrl,teamObj);
};

getAllTeams(){
  return this.httpClient.get<{teams:any}>(this.teamUrl);
}
//variable nsamih id ou bien x kif kif 
deleteTeamById(id){
  return this.httpClient.delete<{message:string}>(`${this.teamUrl}/${id}`);
}
getTeamById(x){
  return this.httpClient.get<{findedTeam:any}>(`${this.teamUrl}/${x}`);
}
}
