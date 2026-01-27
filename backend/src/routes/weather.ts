import { Hono } from 'hono';
import { OpenWeatherMapService } from '../services/openweathermap.ts';
import type { Env } from '../lib/env.ts';

/**
 * Create weather routes
 */
export function createWeatherRoutes(env: Env): Hono {
  const app = new Hono();
  const weatherService = new OpenWeatherMapService(env);

  /**
   * GET /api/weather/current
   * Returns current weather for the configured location
   */
  app.get('/current', async (c) => {
    try {
      const weather = await weatherService.getCurrentWeather();
      return c.json(weather);
    } catch (error) {
      console.error('[Weather Route] Error fetching current weather:', error);

      const message = error instanceof Error ? error.message : 'Unknown error';

      return c.json(
        {
          error: 'Failed to fetch current weather',
          message,
          statusCode: 500,
        },
        500
      );
    }
  });

  /**
   * GET /api/weather/forecast
   * Returns hourly forecast for the configured location
   */
  app.get('/forecast', async (c) => {
    try {
      const forecast = await weatherService.getHourlyForecast();
      return c.json(forecast);
    } catch (error) {
      console.error('[Weather Route] Error fetching forecast:', error);

      const message = error instanceof Error ? error.message : 'Unknown error';

      return c.json(
        {
          error: 'Failed to fetch forecast',
          message,
          statusCode: 500,
        },
        500
      );
    }
  });

  /**
   * GET /api/weather/cache-stats
   * Returns cache statistics (for debugging/monitoring)
   */
  app.get('/cache-stats', (c) => {
    const stats = weatherService.getCacheStats();
    return c.json({
      cache: stats,
      timestamp: new Date().toISOString(),
    });
  });

  return app;
}
