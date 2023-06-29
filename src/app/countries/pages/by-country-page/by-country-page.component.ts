import {Component} from '@angular/core';
import {Country} from "../../interfaces/country";
import {CountriesService} from "../../services/countries.service";

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent {
  constructor(private countriesService: CountriesService) {
  }

  countriesByCountry: Country[] = [];

  searchByCountry(country: string) {
    this.countriesService.searchByCountry(country)
      .subscribe(countries => this.countriesByCountry = countries);
  }
}
