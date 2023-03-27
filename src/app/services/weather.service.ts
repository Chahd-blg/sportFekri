import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherUrl: string = "http://localhost:3000/weather";
  constructor(private httpClient: HttpClient) { }

  weatherSearch(obj) {
    return this.httpClient.post<{weatherData:any}>(this.weatherUrl, obj);

  }


}
