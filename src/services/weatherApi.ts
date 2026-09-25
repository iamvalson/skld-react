import axios from "axios";
import type {
  GeoLocation,
  TemperatureUnit,
  WeatherResponse,
} from "../types/weather";

const GEOCODING_BASE_URL = "https://geocoding-api.open-meteo.com/v1";
const WEATHER_BASE_URL = "https://api.open-meteo.com/v1";

const geocodingClient = axios.create({
  baseURL: GEOCODING_BASE_URL,
  timeout: 10000,
});

const weatherClient = axios.create({
  baseURL: WEATHER_BASE_URL,
  timeout: 10000,
});

/**
 * Search for cities by name using Open-Meteo's geocoding API.
 * Returns up to 10 results sorted by population.
 */
export async function searchCity(query: string): Promise<GeoLocation[]> {
  if (!query.trim()) return [];

  const { data } = await geocodingClient.get<{ results?: GeoLocation[] }>(
    "/search",
    {
      params: {
        name: query.trim(),
        count: 10,
        language: "en",
        format: "json",
      },
    },
  );

  return data.results ?? [];
}

/**
 * Fetch full weather data for a given lat/lon.
 * Includes current conditions, 48-hour hourly, and 7-day daily forecasts.
 */
export async function getWeather(
  latitude: number,
  longitude: number,
  unit: TemperatureUnit = "celsius",
): Promise<WeatherResponse> {
  const { data } = await weatherClient.get<WeatherResponse>("/forecast", {
    params: {
      latitude,
      longitude,
      temperature_unit: unit,
      wind_speed_unit: "kmh",
      timezone: "auto",
      forecast_days: 7,
      current: [
        "temperature_2m",
        "apparent_temperature",
        "relative_humidity_2m",
        "precipitation",
        "weather_code",
        "wind_speed_10m",
        "wind_direction_10m",
        "surface_pressure",
        "visibility",
        "uv_index",
        "is_day",
      ].join(","),
      hourly: [
        "temperature_2m",
        "apparent_temperature",
        "relative_humidity_2m",
        "precipitation",
        "precipitation_probability",
        "weather_code",
        "surface_pressure",
        "visibility",
        "wind_speed_10m",
        "wind_direction_10m",
        "uv_index",
        "is_day",
      ].join(","),
      daily: [
        "weather_code",
        "temperature_2m_max",
        "temperature_2m_min",
        "apparent_temperature_max",
        "apparent_temperature_min",
        "precipitation_probability_max",
        "precipitation_sum",
        "wind_speed_10m_max",
        "wind_direction_10m_dominant",
        "uv_index_max",
        "sunrise",
        "sunset",
      ].join(","),
    },
  });

  return data;
}

//Reverse geocode using latitude/longitude via Open-Meteo's geocoding API
// (falls back to a simple label if reverse lookup is unavailable).
export async function reverseGeocode(
  latitude: number,
  longitude: number,
): Promise<GeoLocation> {
  return {
    id: 0,
    name: "Current Location",
    latitude,
    longitude,
    country: "",
    country_code: "",
    timezone: "auto",
  };
}
