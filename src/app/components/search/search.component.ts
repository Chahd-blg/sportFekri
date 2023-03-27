import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matchService: MatchService) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({

      scoreOne: [""],
      scoreTwo: [""],
    })
  }

  searchMatch() {
    this.matchService.searchMatch(this.searchForm.value).subscribe(
      (response)=>{
        console.log("here responses from BE", response.matches);
        
      }
    );

  }

}
