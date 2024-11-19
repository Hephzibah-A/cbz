import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City, Country, State } from 'country-state-city';

@Injectable({
  providedIn: 'root'
})
export class CountryStateCityService {

  constructor(private http: HttpClient) { }
   getAllCountries() {
    return Country.getAllCountries();
   }
  getStatesOfCountry(countryCode: string) {
    return State.getStatesOfCountry(countryCode);
  }
  
  getCitiesOfState(countryCode: string, stateCode: string) {
    return City.getCitiesOfState(countryCode, stateCode);
  }
}
