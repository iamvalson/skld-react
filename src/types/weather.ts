export interface GeoLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
  admin1?: string; // State / region
  timezone: string;
}

export interface CurrentWeatherData {
  time: string;
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  precipitation: number;
  weather_code: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  surface_pressure: number;
  visibility: number;
  uv_index: number;
  is_day: number; // 1 = day, 0 = night
}

export interface HourlyWeatherData {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
  precipitation_probability: number[];
  is_day: number[];
  apparent_temperature?: number[];
  relative_humidity_2m?: number[];
  precipitation?: number[];
  wind_speed_10m?: number[];
  wind_direction_10m?: number[];
  surface_pressure?: number[];
  visibility?: number[];
  uv_index?: number[];
}

export interface DailyWeatherData {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
  sunrise: string[];
  sunset: string[];
  apparent_temperature_max?: number[];
  apparent_temperature_min?: number[];
  precipitation_sum?: number[];
  wind_speed_10m_max?: number[];
  wind_direction_10m_dominant?: number[];
  uv_index_max?: number[];
}

export interface WeatherResponse {
  current: CurrentWeatherData;
  hourly: HourlyWeatherData;
  daily: DailyWeatherData;
  timezone: string;
  timezone_abbreviation: string;
}

export interface DetailedConditionsData {
  relative_humidity_2m: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  surface_pressure: number;
  visibility: number;
  uv_index: number;
  precipitation: number;
  precipitationLabel?: string;
}

export type TemperatureUnit = "celsius" | "fahrenheit";

export interface WeatherState {
  location: GeoLocation | null;
  weather: WeatherResponse | null;
  loading: boolean;
  error: string | null;
  unit: TemperatureUnit;
}
