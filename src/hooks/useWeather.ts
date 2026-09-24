import { useState, useEffect, useCallback } from "react";
import { getWeather, searchCity, reverseGeocode } from "../services/weatherApi";
import type {
  GeoLocation,
  WeatherResponse,
  TemperatureUnit,
} from "../types/weather";

const LOCATION_STORAGE_KEY = "atmosphere-location";
const UNIT_STORAGE_KEY = "atmosphere-unit";

interface UseWeatherReturn {
  location: GeoLocation | null;
  weather: WeatherResponse | null;
  loading: boolean;
  error: string | null;
  unit: TemperatureUnit;
  setUnit: (unit: TemperatureUnit) => void;
  selectLocation: (loc: GeoLocation) => void;
  searchLocations: (query: string) => Promise<GeoLocation[]>;
  retry: () => void;
}

export function useWeather(): UseWeatherReturn {
  const [location, setLocation] = useState<GeoLocation | null>(() => {
    try {
      const saved = localStorage.getItem(LOCATION_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as GeoLocation) : null;
    } catch {
      return null;
    }
  });

  const [unit, setUnitState] = useState<TemperatureUnit>(() => {
    const saved = localStorage.getItem(UNIT_STORAGE_KEY);
    return saved === "fahrenheit" ? "fahrenheit" : "celsius";
  });

  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshIndex, setRefreshIndex] = useState(0);

  // If no location saved in storage, request browser geolocation on mount
  useEffect(() => {
    if (location) return;
    if (!navigator.geolocation) return;

    let ignore = false;
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const loc = await reverseGeocode(
            pos.coords.latitude,
            pos.coords.longitude
          );
          if (!ignore) {
            setLocation(loc);
            try {
              localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(loc));
            } catch {
              // ignore storage errors
            }
          }
        } catch {
          if (!ignore) {
            setError("Couldn't determine your location.");
          }
        }
      },
      () => {
        if (!ignore) {
          setError("Allow location access or search for a city to get started.");
        }
      }
    );

    return () => {
      ignore = true;
    };
  }, [location]);

  // Synchronize weather data when location, unit, or refresh trigger changes
  useEffect(() => {
    if (!location) return;

    let ignore = false;

    const loadWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getWeather(location.latitude, location.longitude, unit);
        if (!ignore) {
          setWeather(data);
        }
      } catch (err) {
        if (!ignore) {
          setError("Couldn't fetch weather data. Please try again.");
          console.error(err);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    void loadWeather();

    return () => {
      ignore = true;
    };
  }, [location, unit, refreshIndex]);

  const selectLocation = useCallback((loc: GeoLocation) => {
    setLocation(loc);
    try {
      localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(loc));
    } catch {
      // ignore storage errors
    }
  }, []);

  const setUnit = useCallback((newUnit: TemperatureUnit) => {
    setUnitState(newUnit);
    try {
      localStorage.setItem(UNIT_STORAGE_KEY, newUnit);
    } catch {
      // ignore storage errors
    }
  }, []);

  const searchLocations = useCallback(async (query: string) => {
    return searchCity(query);
  }, []);

  const retry = useCallback(() => {
    setRefreshIndex((prev) => prev + 1);
  }, []);

  return {
    location,
    weather,
    loading,
    error,
    unit,
    setUnit,
    selectLocation,
    searchLocations,
    retry,
  };
}
