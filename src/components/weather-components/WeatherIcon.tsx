import { getWeatherInfo } from "../../utils/weatherUtils";

interface WeatherIconProps {
  code: number;
  isDay?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  showLabel?: boolean;
  className?: string;
}

const SIZE_MAP = {
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-6xl",
  xl: "text-8xl",
};

const WeatherIcon = ({
  code,
  isDay = true,
  size = "md",
  showLabel = false,
  className = "",
}: WeatherIconProps) => {
  const info = getWeatherInfo(code, isDay);

  return (
    <span className={`inline-flex flex-col items-center gap-1 ${className}`}>
      <span
        className={SIZE_MAP[size]}
        role="img"
        aria-label={info.label}
        style={{ lineHeight: 1 }}
      >
        {info.emoji}
      </span>
      {showLabel && (
        <span className="text-sm font-poppins text-brand-dark dark:text-gray-300 tracking-wide">
          {info.label}
        </span>
      )}
    </span>
  );
};

export default WeatherIcon;
