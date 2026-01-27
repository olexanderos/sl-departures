'use client';

import React from 'react';

interface WeatherIconProps {
  icon: string;
  description: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Map OpenWeatherMap icon codes to emoji or Unicode weather symbols
 */
function getWeatherEmoji(icon: string): string {
  // Icon format: XXd or XXn (d = day, n = night)
  const code = icon.slice(0, 2);

  const iconMap: Record<string, string> = {
    '01': '☀️', // clear sky
    '02': '🌤️', // few clouds
    '03': '☁️', // scattered clouds
    '04': '☁️', // broken clouds
    '09': '🌧️', // shower rain
    '10': '🌦️', // rain
    '11': '⛈️', // thunderstorm
    '13': '🌨️', // snow
    '50': '🌫️', // mist
  };

  return iconMap[code] || '🌡️';
}

const sizeClasses = {
  sm: 'text-2xl',
  md: 'text-4xl',
  lg: 'text-6xl',
};

/**
 * Display weather icon based on OpenWeatherMap icon code
 */
export const WeatherIcon: React.FC<WeatherIconProps> = ({
  icon,
  description,
  size = 'md',
}) => {
  const emoji = getWeatherEmoji(icon);

  return (
    <span
      className={sizeClasses[size]}
      role="img"
      aria-label={description}
      title={description}
    >
      {emoji}
    </span>
  );
};
