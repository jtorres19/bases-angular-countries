import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, tap} from "rxjs";
import {CountryInterface} from "../interfaces/country.interface";
import {CacheStoreInterface} from "../interfaces/cache-store.interface";
import {Region} from "../interfaces/region.type";


@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  cacheStore: CacheStoreInterface = {
    byCapital: {
      term: '',
      countries: [],
    },
    byCountries: {
      term: '',
      countries: [],
    },
    byRegion: {
      countries: [],
    },
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    if (!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest(url: string): Observable<CountryInterface[]> {
    return this.http.get<CountryInterface[]>(url)
      .pipe(
        catchError(() => of([])),
      );
  }

  searchByCapital(capital: string): Observable<CountryInterface[]> {
    const url = `${this.apiUrl}/capital/${capital}`;

    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCapital = {term: capital, countries}),
        tap(() => this.saveToLocalStorage()),
      );
  }

  searchByCountry(country: string): Observable<CountryInterface[]> {
    const url = `${this.apiUrl}/name/${country}`;

    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCountries = {term: country, countries}),
        tap(() => this.saveToLocalStorage()),
      );
  }

  searchCountryByAlphaCode(code: string): Observable<CountryInterface | null> {
    const url = `${this.apiUrl}/alpha/${code}`;

    return this.http.get<CountryInterface[]>(url)
      .pipe(
        map(countries => countries.length ? countries[0] : null),
        catchError(() => of(null)),
      );
  }

  searchByRegion(region: Region): Observable<CountryInterface[]> {
    const url = `${this.apiUrl}/region/${region}`;

    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = {region: region, countries}),
        tap(() => this.saveToLocalStorage()),
      );
  }
}
