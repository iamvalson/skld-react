import { useRef } from "react";
import WeatherIcon from "./WeatherIcon";
import type { HourlyWeatherData, TemperatureUnit } from "../../types/weather";

interface HourlyForecastProps {
  hourly: HourlyWeatherData;
  unit: TemperatureUnit;
  currentTime?: string;
  selectedDate?: string;
  title?: string;
}

function formatHour(isoTime: string): string {
  const date = new Date(isoTime);
  const h = date.getHours();
  if (h === 0) return "12am";
  if (h === 12) return "12pm";
  return h > 12 ? `${h - 12}pm` : `${h}am`;
}

const HourlyForecast = ({
  hourly,
  unit,
  currentTime,
  selectedDate,
  title,
}: HourlyForecastProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const unitSymbol = unit === "celsius" ? "°" : "°";

  let indices: number[] = [];

  if (selectedDate) {
    indices = hourly.time
      .map((t, idx) => (t.startsWith(selectedDate) ? idx : -1))
      .filter((idx) => idx !== -1);
  }

  // Fallback if no specific date or not found: slice 24 hours from currentTime
  if (indices.length === 0) {
    const now = currentTime ? new Date(currentTime) : new Date();
    const startIndex = hourly.time.findIndex((t) => new Date(t) >= now);
    const sliceStart = startIndex === -1 ? 0 : startIndex;
    indices = Array.from({ length: Math.min(24, hourly.time.length - sliceStart) }, (_, i) => sliceStart + i);
  }

  const times = indices.map((i) => hourly.time[i]);
  const temps = indices.map((i) => hourly.temperature_2m[i]);
  const codes = indices.map((i) => hourly.weather_code[i]);
  const precips = indices.map((i) => hourly.precipitation_probability[i]);
  const isDays = indices.map((i) => hourly.is_day[i]);

  const displayTitle = title || (selectedDate ? "Hourly Forecast" : "Next 24 Hours");

  return (
    <section className="px-6 md:px-10 pb-10">
      <h3 className="text-xs font-poppins uppercase tracking-widest text-brand-dark/40 dark:text-white/30 mb-5">
        {displayTitle}
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
