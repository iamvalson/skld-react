import { useRef } from "react";
import WeatherIcon from "./WeatherIcon";
import type { HourlyWeatherData, TemperatureUnit } from "../../types/weather";

interface HourlyForecastProps {
  hourly: HourlyWeatherData;
  unit: TemperatureUnit;
  currentTime: string;
}

function formatHour(isoTime: string): string {
  const date = new Date(isoTime);
  const h = date.getHours();
  if (h === 0) return "12am";
  if (h === 12) return "12pm";
  return h > 12 ? `${h - 12}pm` : `${h}am`;
}

const HourlyForecast = ({ hourly, unit, currentTime }: HourlyForecastProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const unitSymbol = unit === "celsius" ? "°" : "°";

  // Show 24 hours starting from current hour
  const now = new Date(currentTime);
  const startIndex = hourly.time.findIndex((t) => new Date(t) >= now);
  const sliceStart = startIndex === -1 ? 0 : startIndex;
  const times = hourly.time.slice(sliceStart, sliceStart + 24);
  const temps = hourly.temperature_2m.slice(sliceStart, sliceStart + 24);
  const codes = hourly.weather_code.slice(sliceStart, sliceStart + 24);
  const precips = hourly.precipitation_probability.slice(sliceStart, sliceStart + 24);
  const isDays = hourly.is_day.slice(sliceStart, sliceStart + 24);

  return (
    <section className="px-6 md:px-10 pb-10">
      <h3 className="text-xs font-poppins uppercase tracking-widest text-brand-dark/40 dark:text-white/30 mb-5">
        Next 24 Hours
      </h3>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {times.map((t, i) => {
          const isNow = i === 0;
          return (
            <div
              key={t}
              className={`flex flex-col items-center gap-2 px-4 py-4 rounded-2xl shrink-0 border transition-colors ${
                isNow
                  ? "bg-brand-dark dark:bg-white text-white dark:text-brand-dark border-transparent"
                  : "bg-white/60 dark:bg-white/5 border-brand-border dark:border-white/10 text-brand-dark dark:text-white"
              }`}
            >
              <span
                className={`text-xs font-poppins uppercase tracking-wider ${
                  isNow ? "opacity-80" : "opacity-40"
                }`}
              >
                {isNow ? "Now" : formatHour(t)}
              </span>
              <WeatherIcon code={codes[i]} isDay={isDays[i] === 1} size="sm" />
              <span className="font-newsreader text-xl">
                {Math.round(temps[i])}{unitSymbol}
              </span>
              {precips[i] > 0 && (
                <span
                  className={`text-xs font-poppins ${
                    isNow ? "opacity-70" : "opacity-50"
                  }`}
                >
                  💧 {precips[i]}%
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-10 h-px bg-brand-border dark:bg-white/10" />
    </section>
  );
};

export default HourlyForecast;
