'use client';

import React from 'react';

import type { CurrentWeather } from '@/lib/types';
import { WeatherIcon } from './WeatherIcon';

interface WeatherCardProps {
  weather: CurrentWeather;
}

/**
 * Display current weather information in a compact card
 */
export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <article
      className="
        rounded-2xl p-4
        bg-gradient-to-br from-slate-800/80 to-slate-900/80
        backdrop-blur-sm
        border border-slate-700/50
        shadow-lg
      "
      aria-label={`Current weather: ${weather.description}, ${weather.temperature}°C`}
    >
      {/* Header with location */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-slate-400 text-sm font-medium">
          {weather.location}
        </span>
        <span className="text-slate-500 text-xs">
          {weather.sunrise} - {weather.sunset}
        </span>
      </div>

      {/* Main weather display */}
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="flex-shrink-0">
          <WeatherIcon
            icon={weather.icon}
            description={weather.description}
            size="lg"
          />
        </div>

        {/* Temperature */}
        <div className="flex-grow">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bold text-white">
              {weather.temperature}
            </span>
            <span className="text-2xl text-slate-400">°C</span>
          </div>
          <p className="text-slate-300 text-sm mt-1">
            {weather.description}
          </p>
        </div>
      </div>

      {/* Details row */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-700/50">
        <WeatherDetail
          label="Feels like"
          value={`${weather.feelsLike}°`}
        />
        <WeatherDetail
          label="Wind"
          value={`${weather.windSpeed} m/s`}
        />
        <WeatherDetail
          label="Humidity"
          value={`${weather.humidity}%`}
        />
      </div>
    </article>
  );
};

interface WeatherDetailProps {
  label: string;
  value: string;
}

const WeatherDetail: React.FC<WeatherDetailProps> = ({ label, value }) => (
  <div className="text-center">
    <p className="text-slate-500 text-xs">{label}</p>
    <p className="text-slate-200 text-sm font-medium">{value}</p>
  </div>
);
