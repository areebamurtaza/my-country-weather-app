// components/Country/WeatherCard.tsx
import React from 'react';

interface WeatherCardProps {
  temp: number | null;
  windSpeed: number | null;
  isDay: number | null;
  weatherCode: number | null;
  capital: string;
}

const parseWeatherCode = (code: number | null): string => {
  if (code === null) return "Unknown Conditions";
  if (code === 0) return "Clear Sky";
  if ([1, 2, 3].includes(code)) return "Partly Cloudy";
  if ([45, 48].includes(code)) return "Foggy Weather";
  if ([51, 53, 55, 56, 57].includes(code)) return "Drizzling";
  if ([61, 63, 65, 66, 67].includes(code)) return "Heavy Rain";
  if ([71, 73, 75, 77].includes(code)) return "Snowfall";
  if ([80, 81, 82].includes(code)) return "Passing Showers";
  if ([85, 86].includes(code)) return "Heavy Snow Showers";
  if (code >= 95) return "Thunderstorm conditions";
  return "Overcast";
};

export const WeatherCard: React.FC<WeatherCardProps> = ({ temp, windSpeed, isDay, weatherCode, capital }) => {
  if (temp === null) {
    return (
      <div className="bg-gray-50/50 p-6 rounded-xl border border-dashed border-gray-200 h-full flex flex-col justify-center items-center text-center">
        <p className="text-xs font-semibold text-gray-400 mb-1">CAPITAL WEATHER</p>
        <p className="text-xs text-gray-400">Weather data unavailable for this coordinate.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50/60 to-indigo-100/50 p-5 rounded-xl border border-indigo-100 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-sm text-indigo-900 uppercase tracking-wider">Local Weather</h3>
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${isDay === 1 ? 'bg-amber-100/70 text-amber-800' : 'bg-slate-800 text-slate-100'}`}>
            {isDay === 1 ? "☀️ Day" : "🌙 Night"}
          </span>
        </div>
        <p className="text-xs text-indigo-600 font-semibold tracking-wide uppercase truncate">{capital}</p>
        <p className="text-4xl font-black text-gray-800 mt-2">{temp}°C</p>
        <p className="text-xs font-bold text-indigo-800 mt-1">{parseWeatherCode(weatherCode)}</p>
      </div>
      
      <div className="border-t border-indigo-200/40 mt-5 pt-3 flex justify-between text-xs text-indigo-950">
        <span className="flex items-center gap-1 font-medium">
          💨 Wind: <strong>{windSpeed} km/h</strong>
        </span>
      </div>
    </div>
  );
};