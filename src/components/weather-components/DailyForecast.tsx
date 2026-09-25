import { IoChevronForward } from "react-icons/io5";
import WeatherIcon from "./WeatherIcon";
import type { DailyWeatherData, TemperatureUnit } from "../../types/weather";

interface DailyForecastProps {
  daily: DailyWeatherData;
  unit: TemperatureUnit;
  onSelectDay?: (index: number) => void;
  selectedDayIndex?: number | null;
}

function formatDay(isoDate: string, index: number): string {
  if (index === 0) return "Today";
  if (index === 1) return "Tomorrow";
  return new Date(isoDate).toLocaleDateString("en-US", { weekday: "long" });
}

const DailyForecast = ({
  daily,
  unit,
  onSelectDay,
  selectedDayIndex,
}: DailyForecastProps) => {
  const unitSymbol = unit === "celsius" ? "°" : "°";

  // Pre-round temperatures for exact pixel & percentage alignment
  const roundedMins = daily.temperature_2m_min.map((t) => Math.round(t));
  const roundedMaxes = daily.temperature_2m_max.map((t) => Math.round(t));
  const globalMin = Math.min(...roundedMins);
  const globalMax = Math.max(...roundedMaxes);
  const globalRange = Math.max(globalMax - globalMin, 1);

  return (
    <section className="px-6 md:px-10 pb-10">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xs font-poppins uppercase tracking-widest text-brand-dark/40 dark:text-white/30">
          7-Day Forecast
        </h3>
        <span className="text-xs font-poppins text-brand-dark/40 dark:text-white/30 hidden sm:inline">
          Click any day for details
        </span>
      </div>

      <div className="flex flex-col divide-y divide-brand-border dark:divide-white/10 rounded-2xl overflow-hidden border border-brand-border dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-sm">
        {daily.time.map((date, i) => {
          const min = roundedMins[i];
          const max = roundedMaxes[i];
          const precip = daily.precipitation_probability_max[i];
          const isSelected = selectedDayIndex === i;

          // Clamped percentage calculations
          const leftPercent = Math.max(
            0,
            Math.min(100, ((min - globalMin) / globalRange) * 100)
          );
          const rawWidthPercent = Math.max(
            0,
            Math.min(100 - leftPercent, ((max - min) / globalRange) * 100)
          );
          const barWidth = Math.max(rawWidthPercent, 4);
          const barLeft = Math.min(leftPercent, 100 - barWidth);

          return (
            <button
              type="button"
              key={date}
              onClick={() => onSelectDay?.(i)}
              className={`w-full text-left flex items-center gap-3 sm:gap-4 px-4 py-3.5 transition-all duration-150 group cursor-pointer ${
                isSelected
                  ? "bg-black/10 dark:bg-white/10 font-medium"
                  : "hover:bg-black/[0.04] dark:hover:bg-white/[0.06] active:scale-[0.995]"
              }`}
              title={`View weather details for ${formatDay(date, i)}`}
              aria-label={`View weather details for ${formatDay(date, i)}`}
            >
              {/* Day */}
              <span className="w-24 sm:w-28 shrink-0 text-sm font-poppins font-medium text-brand-dark dark:text-white group-hover:text-brand-dark dark:group-hover:text-white">
                {formatDay(date, i)}
              </span>

              {/* Icon + precip */}
              <div className="flex items-center gap-1.5 w-16 shrink-0">
                <WeatherIcon code={daily.weather_code[i]} isDay size="sm" />
                {precip > 0 && (
                  <span className="text-xs text-brand-dark/40 dark:text-white/30 font-poppins">
                    {precip}%
                  </span>
                )}
              </div>

              {/* Temp range bar */}
              <div className="flex-1 flex items-center gap-2 sm:gap-3 min-w-0">
                <span className="text-sm font-newsreader text-brand-dark/50 dark:text-white/40 w-7 text-right shrink-0">
                  {min}{unitSymbol}
                </span>
                <div className="flex-1 relative h-1.5 rounded-full bg-brand-border/60 dark:bg-white/10 overflow-hidden">
                  <div
                    className="absolute top-0 h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400 group-hover:brightness-105 transition-all"
                    style={{
                      left: `${barLeft}%`,
                      width: `${barWidth}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-newsreader text-brand-dark dark:text-white w-7 text-left shrink-0">
                  {max}{unitSymbol}
                </span>
              </div>

              {/* Chevron */}
              <IoChevronForward className="text-sm text-brand-dark/30 dark:text-white/20 group-hover:text-brand-dark/60 dark:group-hover:text-white/60 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default DailyForecast;
