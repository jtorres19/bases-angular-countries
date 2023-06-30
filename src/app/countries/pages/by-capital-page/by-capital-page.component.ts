import {Component, OnInit} from '@angular/core';
import {CountriesService} from "../../services/countries.service";
import {CountryInterface} from "../../interfaces/country.interface";

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css']
})
export class ByCapitalPageComponent implements OnInit {
  countriesByCapital: CountryInterface[] = [];
  isLoading: boolean = false;
  initialValue: string = ''

  constructor(private countriesService: CountriesService) {
  }

  ngOnInit(): void {
    this.countriesByCapital = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  searchByCapital(termSearch: string): void {
    this.isLoading = true;

    this.countriesService.searchByCapital(termSearch)
      .subscribe(countries => {
        this.countriesByCapital = countries;
        this.isLoading = false;
      })
  }
}
