// types/index.ts

export interface WorldBankMetadata {
  page: number;
  pages: number;
  per_page: string;
  total: number;
}

export interface CountryData {
  id: string;
  iso2Code: string;
  name: string;
  region: { id: string; value: string };
  adminregion: { id: string; value: string };
  incomeLevel: { id: string; value: string };
  lendingType: { id: string; value: string };
  capitalCity: string;
  longitude: string;
  latitude: string;
}

export type WorldBankCountryResponse = [WorldBankMetadata, CountryData[]];

export interface IndicatorData {
  indicator: { id: string; value: string };
  country: { id: string; value: string };
  countryiso3code: string;
  date: string;
  value: number | null;
  unit: string;
  obs_status: string;
  decimal: number;
}

export type WorldBankIndicatorResponse = [WorldBankMetadata, IndicatorData[]];

export interface WeatherData {
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
    is_day: number;
    weather_code: number;
  };
}