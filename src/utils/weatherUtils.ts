// Reference: https://open-meteo.com/en/docs#weathervariables

export interface WeatherInfo {
  label: string;
  emoji: string;
}

const WMO_MAP: Record<number, { day: WeatherInfo; night: WeatherInfo }> = {
  0: {
    day: { label: "Clear Sky", emoji: "☀️" },
    night: { label: "Clear Sky", emoji: "🌙" },
  },
  1: {
    day: { label: "Mainly Clear", emoji: "🌤️" },
    night: { label: "Mainly Clear", emoji: "🌙" },
  },
  2: {
    day: { label: "Partly Cloudy", emoji: "⛅" },
    night: { label: "Partly Cloudy", emoji: "🌑" },
  },
  3: {
    day: { label: "Overcast", emoji: "☁️" },
    night: { label: "Overcast", emoji: "☁️" },
  },
  45: {
    day: { label: "Foggy", emoji: "🌫️" },
    night: { label: "Foggy", emoji: "🌫️" },
  },
  48: {
    day: { label: "Icy Fog", emoji: "🌫️" },
    night: { label: "Icy Fog", emoji: "🌫️" },
  },
  51: {
    day: { label: "Light Drizzle", emoji: "🌦️" },
    night: { label: "Light Drizzle", emoji: "🌧️" },
  },
  53: {
    day: { label: "Drizzle", emoji: "🌦️" },
    night: { label: "Drizzle", emoji: "🌧️" },
  },
  55: {
    day: { label: "Heavy Drizzle", emoji: "🌧️" },
    night: { label: "Heavy Drizzle", emoji: "🌧️" },
  },
  61: {
    day: { label: "Light Rain", emoji: "🌦️" },
    night: { label: "Light Rain", emoji: "🌧️" },
  },
  63: {
    day: { label: "Rain", emoji: "🌧️" },
    night: { label: "Rain", emoji: "🌧️" },
  },
  65: {
    day: { label: "Heavy Rain", emoji: "🌧️" },
    night: { label: "Heavy Rain", emoji: "🌧️" },
  },
  71: {
    day: { label: "Light Snow", emoji: "🌨️" },
    night: { label: "Light Snow", emoji: "🌨️" },
  },
  73: {
    day: { label: "Snow", emoji: "❄️" },
    night: { label: "Snow", emoji: "❄️" },
  },
  75: {
    day: { label: "Heavy Snow", emoji: "❄️" },
    night: { label: "Heavy Snow", emoji: "❄️" },
  },
  77: {
    day: { label: "Snow Grains", emoji: "🌨️" },
    night: { label: "Snow Grains", emoji: "🌨️" },
  },
  80: {
    day: { label: "Light Showers", emoji: "🌦️" },
    night: { label: "Light Showers", emoji: "🌧️" },
  },
  81: {
    day: { label: "Showers", emoji: "🌧️" },
    night: { label: "Showers", emoji: "🌧️" },
  },
  82: {
    day: { label: "Heavy Showers", emoji: "⛈️" },
    night: { label: "Heavy Showers", emoji: "⛈️" },
  },
  85: {
    day: { label: "Snow Showers", emoji: "🌨️" },
    night: { label: "Snow Showers", emoji: "🌨️" },
  },
  86: {
    day: { label: "Heavy Snow Showers", emoji: "❄️" },
    night: { label: "Heavy Snow Showers", emoji: "❄️" },
  },
  95: {
    day: { label: "Thunderstorm", emoji: "⛈️" },
    night: { label: "Thunderstorm", emoji: "⛈️" },
  },
  96: {
    day: { label: "Thunderstorm w/ Hail", emoji: "⛈️" },
    night: { label: "Thunderstorm w/ Hail", emoji: "⛈️" },
  },
  99: {
    day: { label: "Thunderstorm w/ Heavy Hail", emoji: "⛈️" },
    night: { label: "Thunderstorm w/ Heavy Hail", emoji: "⛈️" },
  },
};

const FALLBACK: WeatherInfo = { label: "Unknown", emoji: "🌡️" };

export function getWeatherInfo(code: number, isDay: boolean): WeatherInfo {
  const entry = WMO_MAP[code];
  if (!entry) return FALLBACK;
  return isDay ? entry.day : entry.night;
}
