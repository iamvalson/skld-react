import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWeather } from "../hooks/useWeather";
import Navbar from "../components/weather-components/Navbar";
import SearchModal from "../components/weather-components/SearchModal";
import CurrentWeather from "../components/weather-components/CurrentWeather";
import WeatherDetails from "../components/weather-components/WeatherDetails";
import HourlyForecast from "../components/weather-components/HourlyForecast";
import DailyForecast from "../components/weather-components/DailyForecast";
import DayWeatherView from "../components/weather-components/DayWeatherView";
import { IoRefreshOutline } from "react-icons/io5";
import type { GeoLocation } from "../types/weather";

function resolveDayIndex(
  day: string | undefined,
  times: string[] | undefined
): number | null {
  if (!day || !times) return null;

  const normalized = day.toLowerCase().trim();

  // 1. Match ISO date string (e.g., "2026-09-25")
  const dateIdx = times.findIndex(
    (t) => t === normalized || t.startsWith(normalized)
  );
  if (dateIdx !== -1) return dateIdx;

  // 2. Named aliases ("today", "tomorrow")
  if (normalized === "today") return 0;
  if (normalized === "tomorrow" && times.length > 1) return 1;

  // 3. Numeric index (0..6)
  const num = parseInt(normalized, 10);
  if (!isNaN(num) && num >= 0 && num < times.length) {
    return num;
  }

  // 4. Weekday names (e.g. "monday", "friday", "fri")
  const weekdayIdx = times.findIndex((t) => {
    const longName = new Date(t)
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();
    const shortName = new Date(t)
      .toLocaleDateString("en-US", { weekday: "short" })
      .toLowerCase();
    return longName === normalized || shortName === normalized;
  });
  if (weekdayIdx !== -1) return weekdayIdx;

  return null;
}

const Weather = () => {
  const {
    location,
    weather,
    loading,
    error,
    unit,
    setUnit,
    selectLocation,
    searchLocations,
    retry,
  } = useWeather();

  const { day } = useParams<{ day?: string }>();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);

  const selectedDayIndex = resolveDayIndex(day, weather?.daily?.time);

  const handleSelectDay = (index: number) => {
    if (weather?.daily?.time[index]) {
      navigate(`/weather/${weather.daily.time[index]}`);
    }
  };

  const handleBackToToday = () => {
    navigate("/weather");
  };

  const handleUnitToggle = () => {
    setUnit(unit === "celsius" ? "fahrenheit" : "celsius");
  };

  const handleSelectLocation = (loc: GeoLocation) => {
    navigate("/weather");
    selectLocation(loc);
  };

  return (
    <div className="min-h-screen bg-brand-cream dark:bg-[#0f1015] transition-colors duration-300">
      {/* Navbar */}
      <Navbar
        onSearchOpen={() => setSearchOpen(true)}
        unit={unit}
        onUnitToggle={handleUnitToggle}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectLocation={handleSelectLocation}
        searchLocations={searchLocations}
      />

      {/* ── Loading State ── */}
      {loading && (
        <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
          <span className="text-5xl animate-pulse">🌤️</span>
          <p className="text-sm font-poppins text-brand-dark/50 dark:text-white/40 animate-pulse">
            Fetching weather…
          </p>
        </div>
      )}

      {/* ── Error State ── */}
      {!loading && error && (
        <div className="flex flex-col items-center justify-center min-h-[70vh] gap-5 px-6 text-center">
          <span className="text-5xl">⛈️</span>
          <div>
            <p className="text-base font-poppins font-medium text-brand-dark dark:text-white">
              Something went wrong
            </p>
            <p className="text-sm font-poppins text-brand-dark/50 dark:text-white/40 mt-1 max-w-xs">
              {error}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={retry}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand-border dark:border-white/15 text-sm font-poppins text-brand-dark dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <IoRefreshOutline /> Try again
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-dark dark:bg-white text-white dark:text-brand-dark text-sm font-poppins hover:opacity-90 transition-opacity"
            >
              Search a city
            </button>
          </div>
        </div>
      )}

      {/* ── No Location Prompt ── */}
      {!loading && !error && !location && (
        <div className="flex flex-col items-center justify-center min-h-[70vh] gap-5 px-6 text-center">
          <span className="text-6xl">🌍</span>
          <div>
            <p className="text-xl font-newsreader text-brand-dark dark:text-white">
              Where in the world are you?
            </p>
            <p className="text-sm font-poppins text-brand-dark/50 dark:text-white/40 mt-2 max-w-xs">
              Allow location access or search for a city to see today's weather.
            </p>
          </div>
          <button
            onClick={() => setSearchOpen(true)}
            className="px-6 py-2.5 rounded-full bg-brand-dark dark:bg-white text-white dark:text-brand-dark text-sm font-poppins font-medium hover:opacity-90 transition-opacity"
          >
            Search a city
          </button>
        </div>
      )}

      {/* ── Weather Content ── */}
      {!loading && !error && location && weather && (
        <main className="max-w-3xl mx-auto">
          {selectedDayIndex !== null ? (
            /* Detailed view for selected day (without 7-day forecast) */
            <DayWeatherView
              dayIndex={selectedDayIndex}
              weather={weather}
              location={location}
              unit={unit}
              onBack={handleBackToToday}
              onSelectDay={handleSelectDay}
            />
          ) : (
            /* Main / Current day view with 7-day forecast */
            <>
              <CurrentWeather
                current={weather.current}
                location={location}
                unit={unit}
              />
              <HourlyForecast
                hourly={weather.hourly}
                unit={unit}
                currentTime={weather.current.time}
              />
              <WeatherDetails
                current={weather.current}
                unit={unit}
                sunrise={weather.daily.sunrise[0]}
                sunset={weather.daily.sunset[0]}
              />
              <DailyForecast
                daily={weather.daily}
                unit={unit}
                selectedDayIndex={selectedDayIndex}
                onSelectDay={handleSelectDay}
              />
            </>
          )}

          {/* Footer credit */}
          <footer className="px-6 md:px-10 py-8 text-center">
            <p className="text-xs font-poppins text-brand-dark/30 dark:text-white/20">
              Powered by{" "}
              <a
                href="https://open-meteo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:opacity-70 transition-opacity"
              >
                Open-Meteo
              </a>{" "}
              · Free & open weather API
            </p>
          </footer>
        </main>
      )}
    </div>
  );
};

export default Weather;
