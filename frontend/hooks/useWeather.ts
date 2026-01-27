'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { WEATHER_ENDPOINTS, WEATHER_REFRESH_INTERVAL } from '@/lib/constants';
import type { CurrentWeather, HourlyForecast } from '@/lib/types';

/**
 * Fetch current weather data from the weather API
 */
async function fetchCurrentWeather(): Promise<CurrentWeather> {
  const response = await axios.get<CurrentWeather>(WEATHER_ENDPOINTS.CURRENT);
  return response.data;
}

/**
 * Fetch hourly forecast data from the weather API
 */
async function fetchHourlyForecast(): Promise<HourlyForecast> {
  const response = await axios.get<HourlyForecast>(WEATHER_ENDPOINTS.FORECAST);
  return response.data;
}

/**
 * Hook for fetching current weather data with auto-refresh
 */
export function useCurrentWeather() {
  return useQuery({
    queryKey: ['weather', 'current'],
    queryFn: fetchCurrentWeather,
    refetchInterval: WEATHER_REFRESH_INTERVAL,
    staleTime: WEATHER_REFRESH_INTERVAL - 60000, // Consider stale 1 minute before refresh
    gcTime: WEATHER_REFRESH_INTERVAL * 2, // Keep in cache for 30 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });
}

/**
 * Hook for fetching hourly forecast data with auto-refresh
 */
export function useHourlyForecast() {
  return useQuery({
    queryKey: ['weather', 'forecast'],
    queryFn: fetchHourlyForecast,
    refetchInterval: WEATHER_REFRESH_INTERVAL,
    staleTime: WEATHER_REFRESH_INTERVAL - 60000,
    gcTime: WEATHER_REFRESH_INTERVAL * 2,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });
}

/**
 * Combined hook for both current weather and forecast
 */
export function useWeather() {
  const currentWeather = useCurrentWeather();
  const forecast = useHourlyForecast();

  return {
    current: currentWeather,
    forecast,
    isLoading: currentWeather.isLoading || forecast.isLoading,
    isError: currentWeather.isError || forecast.isError,
    error: currentWeather.error || forecast.error,
  };
}
