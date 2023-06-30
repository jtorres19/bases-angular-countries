import {Component, OnInit} from '@angular/core';
import {CountryInterface} from "../../interfaces/country.interface";
import {CountriesService} from "../../services/countries.service";

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent implements OnInit {
  countriesByCountry: CountryInterface[] = [];
  isLoading: boolean = false;
  initialValue: string = '';

  constructor(private countriesService: CountriesService) {
  }

  ngOnInit(): void {
    this.countriesByCountry = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
  }

  searchByCountry(country: string) {
    this.isLoading = true;

    this.countriesService.searchByCountry(country)
      .subscribe(countries => {
        this.countriesByCountry = countries;
        this.isLoading = false
      });
  }
}
