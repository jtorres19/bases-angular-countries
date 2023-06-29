import {Component} from '@angular/core';
import {CountriesService} from "../../services/countries.service";
import {Country} from "../../interfaces/country";

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css']
})
export class ByCapitalPageComponent {
  countriesByCapital: Country[] = []

  constructor(private countriesService: CountriesService) {
  }

  searchByCapital(termSearch: string): void {
    this.countriesService.searchByCapital(termSearch)
      .subscribe(countries => this.countriesByCapital = countries)
  }
}
