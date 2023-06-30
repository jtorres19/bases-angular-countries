import {Region} from "./region.type";
import {CountryInterface} from "./country.interface";

export interface CacheStoreInterface {
  byCapital: TermCountries;
  byCountries: TermCountries;
  byRegion: RegionCountries;
}

export interface TermCountries {
  term: string;
  countries: CountryInterface[];
}

export interface RegionCountries {
  region?: Region;
  countries: CountryInterface[];
}
