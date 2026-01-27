'use client';

import React from 'react';

import { useWeather } from '@/hooks/useWeather';
import { WeatherCard } from './WeatherCard';
import { HourlyForecastDisplay } from './HourlyForecast';

/**
 * Combined weather section with current weather and hourly forecast
 * Handles loading and error states internally
 */
export const WeatherSection: React.FC = () => {
  const { current, forecast, isLoading, isError } = useWeather();

  // Loading state
  if (isLoading && !current.data && !forecast.data) {
    return (
      <div className="space-y-4">
        <WeatherSkeleton />
        <ForecastSkeleton />
      </div>
    );
  }

  // Error state (only show if we have no data at all)
  if (isError && !current.data && !forecast.data) {
    return (
      <div
        className="
          rounded-2xl p-6
          bg-gradient-to-br from-slate-800/80 to-slate-900/80
          backdrop-blur-sm
          border border-slate-700/50
          text-center
        "
      >
        <span className="text-4xl mb-3 block">🌡️</span>
        <p className="text-slate-400 text-sm">
          Weather data unavailable
        </p>
        <p className="text-slate-500 text-xs mt-1">
          {current.error?.message || 'Unable to fetch weather'}
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-4" aria-label="Weather information">
      {/* Current Weather */}
      {current.data && (
        <WeatherCard weather={current.data} />
      )}

      {/* Hourly Forecast */}
      {forecast.data && (
        <HourlyForecastDisplay forecast={forecast.data} />
      )}
    </section>
  );
};

/**
 * Skeleton loader for weather card
 */
const WeatherSkeleton: React.FC = () => (
  <div
    className="
      rounded-2xl p-4
      bg-gradient-to-br from-slate-800/80 to-slate-900/80
      backdrop-blur-sm
      border border-slate-700/50
      animate-pulse
    "
  >
    <div className="flex items-center justify-between mb-3">
      <div className="h-4 w-20 bg-slate-700 rounded" />
      <div className="h-3 w-16 bg-slate-700 rounded" />
    </div>
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 bg-slate-700 rounded-full" />
      <div className="flex-grow">
        <div className="h-12 w-24 bg-slate-700 rounded mb-2" />
        <div className="h-4 w-32 bg-slate-700 rounded" />
      </div>
    </div>
    <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-700/50">
      <div className="h-8 w-16 bg-slate-700 rounded" />
      <div className="h-8 w-16 bg-slate-700 rounded" />
      <div className="h-8 w-16 bg-slate-700 rounded" />
    </div>
  </div>
);

/**
 * Skeleton loader for forecast section
 */
const ForecastSkeleton: React.FC = () => (
  <div
    className="
      rounded-2xl p-4
      bg-gradient-to-br from-slate-800/80 to-slate-900/80
      backdrop-blur-sm
      border border-slate-700/50
      animate-pulse
    "
  >
    <div className="flex items-center justify-between mb-3">
      <div className="h-4 w-28 bg-slate-700 rounded" />
      <div className="h-3 w-20 bg-slate-700 rounded" />
    </div>
    <div className="flex gap-4 overflow-hidden">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex flex-col items-center gap-2 min-w-[4.5rem] py-2 px-3">
          <div className="h-3 w-8 bg-slate-700 rounded" />
          <div className="w-8 h-8 bg-slate-700 rounded-full" />
          <div className="h-4 w-6 bg-slate-700 rounded" />
        </div>
      ))}
    </div>
  </div>
);
