import { useState } from "react";
import { useWeather } from "../hooks/useWeather";
import Navbar from "../components/weather-components/Navbar";
import SearchModal from "../components/weather-components/SearchModal";
import CurrentWeather from "../components/weather-components/CurrentWeather";
import WeatherDetails from "../components/weather-components/WeatherDetails";
import HourlyForecast from "../components/weather-components/HourlyForecast";
import DailyForecast from "../components/weather-components/DailyForecast";
import { IoRefreshOutline } from "react-icons/io5";

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

  const [searchOpen, setSearchOpen] = useState(false);

  const handleUnitToggle = () => {
    setUnit(unit === "celsius" ? "fahrenheit" : "celsius");
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
        onSelectLocation={selectLocation}
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
          <DailyForecast daily={weather.daily} unit={unit} />

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
