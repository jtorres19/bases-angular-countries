import {Component, OnInit} from '@angular/core';
import {CountryInterface} from "../../interfaces/country.interface";
import {CountriesService} from "../../services/countries.service";
import {Region} from "../../interfaces/region.type";

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent implements OnInit {
  countriesByRegion: CountryInterface[] = [];
  regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  selectedRegion?: Region;
  isLoading: boolean = false;

  constructor(private countriesService: CountriesService) {
  }

  ngOnInit(): void {
    this.countriesByRegion = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion(region: Region) {
    this.isLoading = true;
    this.selectedRegion = region;

    this.countriesService.searchByRegion(region)
      .subscribe(countries => {
        this.countriesByRegion = countries;
        this.isLoading = false;
      });
  }
}
