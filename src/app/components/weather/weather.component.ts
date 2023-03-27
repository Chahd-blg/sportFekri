import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherForm: FormGroup;
  weather: any ;


  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherService,
  ) { }

  ngOnInit() {
    this.weatherForm = this.formBuilder.group({
      city: ["", [Validators.required]],
    })
  }

  weatherSearch() {
    console.log(this.weatherForm.value);

    this.weatherService.weatherSearch(this.weatherForm.value).subscribe(
      (doc) => { 
        this.weather = doc.weatherData;
        console.log("here eather ", this.weather);
        
       }
    )
  }

}
