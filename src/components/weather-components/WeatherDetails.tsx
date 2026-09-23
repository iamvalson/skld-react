import type { CurrentWeatherData, TemperatureUnit } from "../../types/weather";
import {
  IoWaterOutline,
  IoSpeedometerOutline,
  IoEyeOutline,
  IoSunnyOutline,
  IoUmbrellaOutline,
  IoNavigateOutline,
} from "react-icons/io5";

interface WeatherDetailsProps {
  current: CurrentWeatherData;
  unit: TemperatureUnit;
  sunrise?: string;
  sunset?: string;
}

function getWindDirection(deg: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8];
}

function formatTime(isoTime: string): string {
  return new Date(isoTime).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function getUVLabel(uv: number): string {
  if (uv <= 2) return "Low";
  if (uv <= 5) return "Moderate";
  if (uv <= 7) return "High";
  if (uv <= 10) return "Very High";
  return "Extreme";
}

function getUVColor(uv: number): string {
  if (uv <= 2) return "text-green-600 dark:text-green-400";
  if (uv <= 5) return "text-yellow-600 dark:text-yellow-400";
  if (uv <= 7) return "text-orange-500 dark:text-orange-400";
  if (uv <= 10) return "text-red-500 dark:text-red-400";
  return "text-purple-500 dark:text-purple-400";
}

const WeatherDetails = ({
  current,
  sunrise,
  sunset,
}: WeatherDetailsProps) => {
  const details = [
    {
      icon: <IoWaterOutline className="text-xl" />,
      label: "Humidity",
      value: `${current.relative_humidity_2m}%`,
      sub: current.relative_humidity_2m > 70 ? "High" : current.relative_humidity_2m > 40 ? "Moderate" : "Low",
    },
    {
      icon: <IoNavigateOutline className="text-xl" />,
      label: "Wind",
      value: `${Math.round(current.wind_speed_10m)} km/h`,
      sub: getWindDirection(current.wind_direction_10m),
    },
    {
      icon: <IoSpeedometerOutline className="text-xl" />,
      label: "Pressure",
      value: `${Math.round(current.surface_pressure)}`,
      sub: "hPa",
    },
    {
      icon: <IoEyeOutline className="text-xl" />,
      label: "Visibility",
      value:
        current.visibility >= 1000
          ? `${(current.visibility / 1000).toFixed(1)} km`
          : `${current.visibility} m`,
      sub: current.visibility >= 10000 ? "Clear" : current.visibility >= 5000 ? "Good" : "Limited",
    },
    {
      icon: <IoSunnyOutline className="text-xl" />,
      label: "UV Index",
      value: `${Math.round(current.uv_index)}`,
      sub: getUVLabel(current.uv_index),
      subClass: getUVColor(current.uv_index),
    },
    {
      icon: <IoUmbrellaOutline className="text-xl" />,
      label: "Precipitation",
      value: `${current.precipitation} mm`,
      sub: current.precipitation === 0 ? "None" : "Today",
    },
  ];

  return (
    <section className="px-6 md:px-10 pb-10">
      <h3 className="text-xs font-poppins uppercase tracking-widest text-brand-dark/40 dark:text-white/30 mb-5">
        Conditions
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {details.map((d) => (
          <div
            key={d.label}
            className="flex flex-col gap-2 p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-brand-border dark:border-white/10"
          >
            <span className="text-brand-dark/40 dark:text-white/30">
              {d.icon}
            </span>
            <div>
              <p className="text-xs font-poppins text-brand-dark/40 dark:text-white/30 uppercase tracking-wider">
                {d.label}
              </p>
              <p className="text-xl font-newsreader text-brand-dark dark:text-white mt-0.5">
                {d.value}
              </p>
              <p
                className={`text-xs font-poppins mt-0.5 ${d.subClass ?? "text-brand-dark/50 dark:text-white/40"}`}
              >
                {d.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Sunrise / Sunset */}
      {(sunrise || sunset) && (
        <div className="mt-3 flex gap-3">
          {sunrise && (
            <div className="flex-1 flex items-center gap-3 p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-brand-border dark:border-white/10">
              <span className="text-2xl">🌅</span>
              <div>
                <p className="text-xs font-poppins text-brand-dark/40 dark:text-white/30 uppercase tracking-wider">
                  Sunrise
                </p>
                <p className="text-lg font-newsreader text-brand-dark dark:text-white">
                  {formatTime(sunrise)}
                </p>
              </div>
            </div>
          )}
          {sunset && (
            <div className="flex-1 flex items-center gap-3 p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-brand-border dark:border-white/10">
              <span className="text-2xl">🌇</span>
              <div>
                <p className="text-xs font-poppins text-brand-dark/40 dark:text-white/30 uppercase tracking-wider">
                  Sunset
                </p>
                <p className="text-lg font-newsreader text-brand-dark dark:text-white">
                  {formatTime(sunset)}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-10 h-px bg-brand-border dark:bg-white/10" />
    </section>
  );
};

export default WeatherDetails;
