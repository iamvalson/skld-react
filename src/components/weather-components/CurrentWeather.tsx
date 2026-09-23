import WeatherIcon from "./WeatherIcon";
import { getWeatherInfo } from "../../utils/weatherUtils";
import type { CurrentWeatherData, GeoLocation, TemperatureUnit } from "../../types/weather";

interface CurrentWeatherProps {
  current: CurrentWeatherData;
  location: GeoLocation;
  unit: TemperatureUnit;
}

function formatDate(isoTime: string): string {
  const date = new Date(isoTime);
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

const CurrentWeather = ({ current, location, unit }: CurrentWeatherProps) => {
  const isDay = current.is_day === 1;
  const info = getWeatherInfo(current.weather_code, isDay);
  const unitSymbol = unit === "celsius" ? "°C" : "°F";

  return (
    <section className="px-6 md:px-10 pt-4 pb-10">
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
        <p className="text-sm font-poppins text-brand-dark/50 dark:text-white/40 mt-0.5 pl-6">
          {formatDate(current.time)}
        </p>
      </div>

      {/* Hero temperature block */}
      <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
        {/* Left: big temp */}
        <div className="flex items-start gap-4">
          <WeatherIcon
            code={current.weather_code}
            isDay={isDay}
            size="xl"
            className="mt-2"
          />
          <div>
            <div className="flex items-start leading-none">
              <span className="font-newsreader font-light text-[clamp(5rem,14vw,9rem)] text-brand-dark dark:text-white leading-none">
                {Math.round(current.temperature_2m)}
              </span>
              <span className="font-newsreader text-[clamp(2rem,5vw,4rem)] text-brand-dark/40 dark:text-white/30 mt-4">
                {unitSymbol}
              </span>
            </div>
            <p className="font-poppins text-base text-brand-dark/60 dark:text-white/50 mt-1">
              {info.label}
            </p>
            <p className="font-poppins text-sm text-brand-dark/40 dark:text-white/30 mt-0.5">
              Feels like {Math.round(current.apparent_temperature)}{unitSymbol}
            </p>
          </div>
        </div>

        {/* Right: quick stats strip */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 md:mb-4 pb-2 border-b border-brand-border dark:border-white/10 md:border-none">
          <Stat label="Humidity" value={`${current.relative_humidity_2m}%`} />
          <Stat
            label="Wind"
            value={`${Math.round(current.wind_speed_10m)} km/h ${getWindDirection(current.wind_direction_10m)}`}
          />
          <Stat label="UV Index" value={`${Math.round(current.uv_index)}`} />
          <Stat
            label="Precip."
            value={`${current.precipitation} mm`}
          />
        </div>
      </div>

      {/* Thin divider */}
      <div className="mt-10 h-px bg-brand-border dark:bg-white/10" />
    </section>
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

export default CurrentWeather;
