import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  //Server backend adress:
  //une classe c l'esemble des attributs et des méthodes:
  //matchUrl:string="http://localhost:3000" -> c'est un attribut
  matchUrl: string = "http://localhost:3000/matches";
  constructor(private httpClient: HttpClient) { }

  //request to add match -> methode :
  addMatch(obj) {
    return this.httpClient.post<{message:string,isadded:boolean}>(this.matchUrl, obj);
  }

  //Request to get all matches(non param) -> Response: [{},{},....]
  getAllMatches() {
    return this.httpClient.get<{matches:any , message:string}>(this.matchUrl);
  }

  //Request to get match by ID -> ResONSE : ONE OBJ
  getMatchById(id) {
    return this.httpClient.get<{findedMatch:any}>(`${this.matchUrl}/${id}`);
  }

  //Request to delete match by ID->Response : Message
  deleteMatchById(id) {
    return this.httpClient.delete<{message:string}>(`${this.matchUrl}/${id}`);
  }
  //Request to UPDATE match by ID->Response : Message
  editMatch(newObj) {
    return this.httpClient.put<{message:string}>(this.matchUrl, newObj);
  }

  //request to search 
  searchMatch(obj){
    return this.httpClient.post<{matches:any}>(this.matchUrl+ "/search",obj)
  }
}
