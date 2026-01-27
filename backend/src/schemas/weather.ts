import { z } from 'zod';

/**
 * OpenWeatherMap API response schemas (raw API format)
 */

// Current weather API response from OpenWeatherMap
export const openWeatherCurrentSchema = z.object({
  coord: z.object({
    lon: z.number(),
    lat: z.number(),
  }),
  weather: z.array(
    z.object({
      id: z.number(),
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    })
  ),
  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
    pressure: z.number(),
    humidity: z.number(),
  }),
  wind: z.object({
    speed: z.number(),
    deg: z.number().optional(),
  }),
  clouds: z.object({
    all: z.number(),
  }),
  dt: z.number(),
  sys: z.object({
    country: z.string().optional(),
    sunrise: z.number(),
    sunset: z.number(),
  }),
  timezone: z.number(),
  name: z.string(),
});

export type OpenWeatherCurrentResponse = z.infer<typeof openWeatherCurrentSchema>;

// Forecast API response from OpenWeatherMap
export const openWeatherForecastSchema = z.object({
  list: z.array(
    z.object({
      dt: z.number(),
      main: z.object({
        temp: z.number(),
        feels_like: z.number(),
        temp_min: z.number(),
        temp_max: z.number(),
        pressure: z.number(),
        humidity: z.number(),
      }),
      weather: z.array(
        z.object({
          id: z.number(),
          main: z.string(),
          description: z.string(),
          icon: z.string(),
        })
      ),
      clouds: z.object({
        all: z.number(),
      }),
      wind: z.object({
        speed: z.number(),
        deg: z.number().optional(),
      }),
      pop: z.number(), // Probability of precipitation
      dt_txt: z.string(),
    })
  ),
  city: z.object({
    name: z.string(),
    country: z.string(),
    timezone: z.number(),
    sunrise: z.number(),
    sunset: z.number(),
  }),
});

export type OpenWeatherForecastResponse = z.infer<typeof openWeatherForecastSchema>;

/**
 * Application domain schemas (clean API format)
 */

// Current weather response schema for our API
export const currentWeatherSchema = z.object({
  temperature: z.number(),
  feelsLike: z.number(),
  humidity: z.number(),
  description: z.string(),
  icon: z.string(),
  windSpeed: z.number(),
  pressure: z.number(),
  clouds: z.number(),
  sunrise: z.string(),
  sunset: z.string(),
  location: z.string(),
  timestamp: z.string(),
});

export type CurrentWeather = z.infer<typeof currentWeatherSchema>;

// Hourly forecast item schema
export const hourlyForecastItemSchema = z.object({
  time: z.string(),
  temperature: z.number(),
  feelsLike: z.number(),
  description: z.string(),
  icon: z.string(),
  precipitation: z.number(),
  humidity: z.number(),
  windSpeed: z.number(),
});

export type HourlyForecastItem = z.infer<typeof hourlyForecastItemSchema>;

// Hourly forecast response schema for our API
export const hourlyForecastSchema = z.object({
  location: z.string(),
  hours: z.array(hourlyForecastItemSchema),
  timestamp: z.string(),
});

export type HourlyForecast = z.infer<typeof hourlyForecastSchema>;

// API error response schema
export const apiErrorSchema = z.object({
  error: z.string(),
  message: z.string(),
  statusCode: z.number(),
});

export type ApiError = z.infer<typeof apiErrorSchema>;

// Health check response schema
export const healthCheckSchema = z.object({
  status: z.literal('ok'),
  timestamp: z.string(),
  version: z.string(),
});

export type HealthCheck = z.infer<typeof healthCheckSchema>;
