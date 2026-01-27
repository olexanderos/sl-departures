import type { Env } from '../lib/env.ts';
import { TTLCache, CACHE_KEYS } from '../lib/cache.ts';
import {
  openWeatherCurrentSchema,
  openWeatherForecastSchema,
  type CurrentWeather,
  type HourlyForecast,
  type HourlyForecastItem,
  type OpenWeatherCurrentResponse,
  type OpenWeatherForecastResponse,
} from '../schemas/weather.ts';

const OPENWEATHERMAP_BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * OpenWeatherMap API service with caching
 */
export class OpenWeatherMapService {
  private env: Env;
  private currentWeatherCache: TTLCache<CurrentWeather>;
  private forecastCache: TTLCache<HourlyForecast>;

  constructor(env: Env) {
    this.env = env;
    this.currentWeatherCache = new TTLCache<CurrentWeather>(env.CACHE_TTL_MINUTES);
    this.forecastCache = new TTLCache<HourlyForecast>(env.CACHE_TTL_MINUTES);
  }

  /**
   * Get current weather data
   */
  async getCurrentWeather(): Promise<CurrentWeather> {
    // Check cache first
    const cached = this.currentWeatherCache.get(CACHE_KEYS.CURRENT_WEATHER);
    if (cached) {
      console.log('[Cache] Returning cached current weather');
      return cached;
    }

    console.log('[API] Fetching current weather from OpenWeatherMap');

    const url = new URL(`${OPENWEATHERMAP_BASE_URL}/weather`);
    url.searchParams.set('lat', this.env.WEATHER_LAT.toString());
    url.searchParams.set('lon', this.env.WEATHER_LON.toString());
    url.searchParams.set('appid', this.env.OPENWEATHERMAP_API_KEY);
    url.searchParams.set('units', 'metric');

    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenWeatherMap API error: ${response.status} - ${errorText}`);
    }

    const rawData = await response.json();
    const validatedData = openWeatherCurrentSchema.parse(rawData);
    const transformed = this.transformCurrentWeather(validatedData);

    // Cache the result
    this.currentWeatherCache.set(CACHE_KEYS.CURRENT_WEATHER, transformed);

    return transformed;
  }

  /**
   * Get hourly forecast data
   */
  async getHourlyForecast(): Promise<HourlyForecast> {
    // Check cache first
    const cached = this.forecastCache.get(CACHE_KEYS.HOURLY_FORECAST);
    if (cached) {
      console.log('[Cache] Returning cached hourly forecast');
      return cached;
    }

    console.log('[API] Fetching hourly forecast from OpenWeatherMap');

    const url = new URL(`${OPENWEATHERMAP_BASE_URL}/forecast`);
    url.searchParams.set('lat', this.env.WEATHER_LAT.toString());
    url.searchParams.set('lon', this.env.WEATHER_LON.toString());
    url.searchParams.set('appid', this.env.OPENWEATHERMAP_API_KEY);
    url.searchParams.set('units', 'metric');

    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenWeatherMap API error: ${response.status} - ${errorText}`);
    }

    const rawData = await response.json();
    const validatedData = openWeatherForecastSchema.parse(rawData);
    const transformed = this.transformForecast(validatedData);

    // Cache the result
    this.forecastCache.set(CACHE_KEYS.HOURLY_FORECAST, transformed);

    return transformed;
  }

  /**
   * Transform OpenWeatherMap current weather response to our domain type
   */
  private transformCurrentWeather(data: OpenWeatherCurrentResponse): CurrentWeather {
    const weather = data.weather[0];

    return {
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      description: this.capitalizeFirst(weather?.description || 'Unknown'),
      icon: weather?.icon || '01d',
      windSpeed: Math.round(data.wind.speed * 10) / 10,
      pressure: data.main.pressure,
      clouds: data.clouds.all,
      sunrise: this.formatTime(data.sys.sunrise, data.timezone),
      sunset: this.formatTime(data.sys.sunset, data.timezone),
      location: data.name,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Transform OpenWeatherMap forecast response to our domain type
   */
  private transformForecast(data: OpenWeatherForecastResponse): HourlyForecast {
    // Take the next 24 hours (8 entries at 3-hour intervals)
    const hours: HourlyForecastItem[] = data.list.slice(0, 8).map((item) => {
      const weather = item.weather[0];

      return {
        time: this.formatTime(item.dt, data.city.timezone),
        temperature: Math.round(item.main.temp),
        feelsLike: Math.round(item.main.feels_like),
        description: this.capitalizeFirst(weather?.description || 'Unknown'),
        icon: weather?.icon || '01d',
        precipitation: Math.round(item.pop * 100),
        humidity: item.main.humidity,
        windSpeed: Math.round(item.wind.speed * 10) / 10,
      };
    });

    return {
      location: data.city.name,
      hours,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Format Unix timestamp to HH:MM format
   */
  private formatTime(unixTimestamp: number, timezoneOffset: number): string {
    const date = new Date((unixTimestamp + timezoneOffset) * 1000);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  /**
   * Capitalize the first letter of a string
   */
  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return {
      currentWeather: this.currentWeatherCache.stats(),
      forecast: this.forecastCache.stats(),
    };
  }

  /**
   * Clear all caches
   */
  clearCache(): void {
    this.currentWeatherCache.clear();
    this.forecastCache.clear();
  }
}
