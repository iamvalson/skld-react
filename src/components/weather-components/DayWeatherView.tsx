import { IoArrowBack, IoChevronBack, IoChevronForward } from "react-icons/io5";
import WeatherIcon from "./WeatherIcon";
import HourlyForecast from "./HourlyForecast";
import WeatherDetails from "./WeatherDetails";
import { getWeatherInfo } from "../../utils/weatherUtils";
import type {
  DetailedConditionsData,
  GeoLocation,
  TemperatureUnit,
  WeatherResponse,
} from "../../types/weather";

interface DayWeatherViewProps {
  dayIndex: number;
  weather: WeatherResponse;
  location: GeoLocation;
  unit: TemperatureUnit;
  onBack: () => void;
  onSelectDay: (index: number) => void;
}

function formatDayLabel(isoDate: string, index: number): string {
  if (index === 0) return "Today";
  if (index === 1) return "Tomorrow";
  return new Date(isoDate).toLocaleDateString("en-US", { weekday: "long" });
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function getWindDirection(deg: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
}

const DayWeatherView = ({
  dayIndex,
  weather,
  location,
  unit,
  onBack,
  onSelectDay,
}: DayWeatherViewProps) => {
  const daily = weather.daily;
  const totalDays = daily.time.length;
  const date = daily.time[dayIndex];
  const weatherCode = daily.weather_code[dayIndex];
  const maxTemp = daily.temperature_2m_max[dayIndex];
  const minTemp = daily.temperature_2m_min[dayIndex];
  const precipProb = daily.precipitation_probability_max[dayIndex];
  const precipSum = daily.precipitation_sum?.[dayIndex] ?? 0;
  const sunrise = daily.sunrise[dayIndex];
  const sunset = daily.sunset[dayIndex];

  const info = getWeatherInfo(weatherCode, true);
  const unitSymbol = unit === "celsius" ? "°C" : "°F";

  // Filter 24-hour hourly indices for the selected date
  const dayHourlyIndices = weather.hourly.time
    .map((t, idx) => (t.startsWith(date) ? idx : -1))
    .filter((idx) => idx !== -1);

  // Compute average / representative metrics from hourly data
  const calcAvg = (arr?: number[], fallback = 0) => {
    if (!arr || dayHourlyIndices.length === 0) return fallback;
    const values = dayHourlyIndices.map((i) => arr[i]).filter((v) => v !== undefined);
    if (values.length === 0) return fallback;
    return values.reduce((a, b) => a + b, 0) / values.length;
  };

  const middayIdx = dayHourlyIndices[Math.floor(dayHourlyIndices.length / 2)] ?? 0;

  const humidity = calcAvg(weather.hourly.relative_humidity_2m, 50);
  const pressure = calcAvg(weather.hourly.surface_pressure, 1013);
  const visibility = calcAvg(weather.hourly.visibility, 10000);
  const windSpeed =
    daily.wind_speed_10m_max?.[dayIndex] ??
    calcAvg(weather.hourly.wind_speed_10m, 10);
  const windDirection =
    daily.wind_direction_10m_dominant?.[dayIndex] ??
    weather.hourly.wind_direction_10m?.[middayIdx] ??
    0;
  const uvIndex =
    daily.uv_index_max?.[dayIndex] ??
    Math.max(0, ...dayHourlyIndices.map((i) => weather.hourly.uv_index?.[i] ?? 0));

  const detailedConditions: DetailedConditionsData = {
    relative_humidity_2m: humidity,
    wind_speed_10m: windSpeed,
    wind_direction_10m: windDirection,
    surface_pressure: pressure,
    visibility: visibility,
    uv_index: uvIndex,
    precipitation: precipSum > 0 ? precipSum : precipProb > 0 ? precipProb : 0,
    precipitationLabel: precipProb > 0 ? `${precipProb}% chance` : "None",
  };

  const hasPrev = dayIndex > 0;
  const hasNext = dayIndex < totalDays - 1;

  return (
    <div className="animate-fadeIn">
      {/* ── Day Navigation Bar ── */}
      <section className="px-6 md:px-10 pt-4 pb-2">
        <div className="flex items-center justify-between gap-4 py-2">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-border dark:border-white/15 text-xs sm:text-sm font-poppins font-medium text-brand-dark dark:text-white hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all cursor-pointer shadow-sm"
            aria-label="Back to current weather"
          >
            <IoArrowBack className="text-base" />
            <span>Back to today</span>
          </button>

          {/* Quick day switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              disabled={!hasPrev}
              onClick={() => hasPrev && onSelectDay(dayIndex - 1)}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-full border border-brand-border dark:border-white/15 text-xs font-poppins text-brand-dark dark:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:bg-black/5 dark:hover:enabled:bg-white/10 transition-colors flex items-center gap-1"
              title="Previous Day"
              aria-label="Previous Day"
            >
              <IoChevronBack />
              <span className="hidden sm:inline">Prev</span>
            </button>

            <span className="px-2.5 py-1 text-xs font-poppins font-medium text-brand-dark/70 dark:text-white/70 bg-black/5 dark:bg-white/10 rounded-full">
              Day {dayIndex + 1} of {totalDays}
            </span>

            <button
              type="button"
              disabled={!hasNext}
              onClick={() => hasNext && onSelectDay(dayIndex + 1)}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-full border border-brand-border dark:border-white/15 text-xs font-poppins text-brand-dark dark:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:enabled:bg-black/5 dark:hover:enabled:bg-white/10 transition-colors flex items-center gap-1"
              title="Next Day"
              aria-label="Next Day"
            >
              <span className="hidden sm:inline">Next</span>
              <IoChevronForward />
            </button>
          </div>
        </div>
      </section>

      {/* ── Day Hero Weather Section (Formatted just like CurrentWeather) ── */}
      <section className="px-6 md:px-10 pt-2 pb-10">
        {/* Location + Date */}
        <div className="flex flex-col mb-8">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-poppins text-brand-dark/50 dark:text-white/40 uppercase tracking-widest">
              📍
            </span>
            <h2 className="text-lg font-poppins font-semibold text-brand-dark dark:text-white">
              {location.name}
              {location.admin1 ? `, ${location.admin1}` : ""}
              {location.country ? ` — ${location.country}` : ""}
            </h2>
          </div>
          <div className="flex items-center gap-2 mt-0.5 pl-6">
            <span className="text-xs px-2 py-0.5 rounded-full bg-brand-dark/10 dark:bg-white/15 text-brand-dark dark:text-white font-poppins font-medium uppercase tracking-wider">
              {formatDayLabel(date, dayIndex)}
            </span>
            <p className="text-sm font-poppins text-brand-dark/50 dark:text-white/40">
              {formatDate(date)}
            </p>
          </div>
        </div>

        {/* Hero temperature block */}
        <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
          {/* Left: big temp */}
          <div className="flex items-start gap-4">
            <WeatherIcon
              code={weatherCode}
              isDay={true}
              size="xl"
              className="mt-2"
            />
            <div>
              <div className="flex items-start leading-none">
                <span className="font-newsreader font-light text-[clamp(5rem,14vw,9rem)] text-brand-dark dark:text-white leading-none">
                  {Math.round(maxTemp)}
                </span>
                <span className="font-newsreader text-[clamp(2rem,5vw,4rem)] text-brand-dark/40 dark:text-white/30 mt-4">
                  {unitSymbol}
                </span>
              </div>
              <p className="font-poppins text-base text-brand-dark/60 dark:text-white/50 mt-1">
                {info.label}
              </p>
              <p className="font-poppins text-sm text-brand-dark/40 dark:text-white/30 mt-0.5">
                High {Math.round(maxTemp)}{unitSymbol} · Low {Math.round(minTemp)}{unitSymbol}
              </p>
            </div>
          </div>

          {/* Right: quick stats strip */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 md:mb-4 pb-2 border-b border-brand-border dark:border-white/10 md:border-none">
            <Stat label="Humidity" value={`${Math.round(humidity)}%`} />
            <Stat
              label="Wind"
              value={`${Math.round(windSpeed)} km/h ${getWindDirection(windDirection)}`}
            />
            <Stat label="UV Index" value={`${Math.round(uvIndex)}`} />
            <Stat
              label="Precip."
              value={precipSum > 0 ? `${precipSum} mm` : `${precipProb}%`}
            />
          </div>
        </div>

        {/* Thin divider */}
        <div className="mt-10 h-px bg-brand-border dark:bg-white/10" />
      </section>

      {/* ── 24-Hour Hourly Forecast for This Day ── */}
      <HourlyForecast
        hourly={weather.hourly}
        unit={unit}
        selectedDate={date}
        title={`Hourly Forecast · ${formatDayLabel(date, dayIndex)}`}
      />

      {/* ── Weather Details / Conditions for This Day ── */}
      <WeatherDetails
        detailsData={detailedConditions}
        unit={unit}
        sunrise={sunrise}
        sunset={sunset}
      />
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-xs font-poppins text-brand-dark/40 dark:text-white/30 uppercase tracking-widest">
      {label}
    </span>
    <span className="text-sm font-poppins font-medium text-brand-dark dark:text-white">
      {value}
    </span>
  </div>
);

export default DayWeatherView;
