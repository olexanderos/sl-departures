'use client';

import React from 'react';

import type { HourlyForecast, HourlyForecastItem } from '@/lib/types';
import { WeatherIcon } from './WeatherIcon';

interface HourlyForecastProps {
  forecast: HourlyForecast;
}

/**
 * Display hourly forecast in a horizontal scrollable row
 */
export const HourlyForecastDisplay: React.FC<HourlyForecastProps> = ({ forecast }) => {
  return (
    <article
      className="
        rounded-2xl p-4
        bg-gradient-to-br from-slate-800/80 to-slate-900/80
        backdrop-blur-sm
        border border-slate-700/50
        shadow-lg
      "
      aria-label="Hourly weather forecast"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-slate-300 text-sm font-medium">
          Hourly Forecast
        </h3>
        <span className="text-slate-500 text-xs">
          Next 24 hours
        </span>
      </div>

      {/* Scrollable forecast items */}
      <div
        className="
          flex gap-4 overflow-x-auto
          scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent
          pb-2 -mb-2
        "
        role="list"
      >
        {forecast.hours.map((hour, index) => (
          <ForecastHourItem
            key={`${hour.time}-${index}`}
            hour={hour}
            isFirst={index === 0}
          />
        ))}
      </div>
    </article>
  );
};

interface ForecastHourItemProps {
  hour: HourlyForecastItem;
  isFirst: boolean;
}

const ForecastHourItem: React.FC<ForecastHourItemProps> = ({ hour, isFirst }) => {
  return (
    <div
      className={`
        flex flex-col items-center gap-2
        min-w-[4.5rem] py-2 px-3
        rounded-xl
        transition-colors
        ${isFirst
          ? 'bg-sky-600/20 border border-sky-500/30'
          : 'bg-slate-800/50 hover:bg-slate-700/50'
        }
      `}
      role="listitem"
    >
      {/* Time */}
      <span className={`text-xs font-medium ${isFirst ? 'text-sky-300' : 'text-slate-400'}`}>
        {isFirst ? 'Now' : hour.time}
      </span>

      {/* Icon */}
      <WeatherIcon
        icon={hour.icon}
        description={hour.description}
        size="sm"
      />

      {/* Temperature */}
      <span className="text-white font-semibold">
        {hour.temperature}°
      </span>

      {/* Precipitation probability */}
      {hour.precipitation > 0 && (
        <span className="text-sky-400 text-xs">
          💧 {hour.precipitation}%
        </span>
      )}
    </div>
  );
};
